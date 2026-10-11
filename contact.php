<?php
// Rotstruck contact form handler. Upload next to index.html (or rotstruck.html).
// EDIT THESE TWO LINES IF NEEDED:
$TO   = 'team@rotstruck.in';        // the hosting mailbox that receives enquiries
$FROM = 'team@rotstruck.in';       // sender address on your domain

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('{"ok":false}'); }
$d = json_decode(file_get_contents('php://input'), true) ?: [];
if (!empty($d['w'])) { echo '{"ok":true}'; exit; }          // honeypot: bots fill this, pretend success

// simple throttle: one submission per IP per 60 seconds
$f = sys_get_temp_dir() . '/rs_' . md5($_SERVER['REMOTE_ADDR']);
if (file_exists($f) && time() - filemtime($f) < 60) { http_response_code(429); exit('{"ok":false,"error":"Too many requests"}'); }

$clean = fn($k, $max = 200) => trim(str_replace(["\r", "\n"], ' ', mb_substr((string)($d[$k] ?? ''), 0, $max)));
$name = $clean('n'); $email = $clean('e'); $msg = trim(mb_substr((string)($d['d'] ?? ''), 0, 4000));
if ($name === '' || $msg === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(422); exit('{"ok":false,"error":"Invalid input"}'); }

$body = "New enquiry from the Rotstruck website\n\n"
  . "Name: $name\nCompany: " . $clean('c') . "\nEmail: $email\nPhone: " . $clean('p')
  . "\nIndustry: " . $clean('i') . "\nService: " . $clean('s') . "\nBudget: " . $clean('b')
  . "\nTimeline: " . $clean('t') . "\n\nProject description:\n$msg\n\n"
  . "Consent given: yes\nReceived: " . gmdate('Y-m-d H:i:s') . " UTC\n";   // consent record
$headers = "From: Rotstruck Website <$FROM>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$ok = mail($TO, 'New website enquiry from ' . $name, $body, $headers);
if ($ok) touch($f); else http_response_code(500);
echo json_encode(['ok' => $ok]);
