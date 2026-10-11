import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 8, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: 0.22, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MaskedLines({ lines, as: Tag = "h1", className = "", lineClassName = "", baseDelay = 0 }) {
  const items = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag className={className}>
      {items.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.35, delay: baseDelay + i * 0.04, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Stagger({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "100px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.025, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
