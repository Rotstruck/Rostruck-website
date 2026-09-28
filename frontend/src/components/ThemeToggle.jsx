import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-testid="theme-toggle-btn"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/25 bg-purple-500/5 text-foreground transition-colors duration-300 hover:border-purple-400/60 hover:bg-purple-500/15 ${className}`}
    >
      <Sun
        className={`h-[18px] w-[18px] transition-all duration-500 ${
          theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        } absolute`}
        aria-hidden="true"
      />
      <Moon
        className={`h-[18px] w-[18px] transition-all duration-500 ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        } absolute`}
        aria-hidden="true"
      />
    </button>
  );
}
