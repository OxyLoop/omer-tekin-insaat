"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";
type Listener = () => void;

let listeners: Listener[] = [];

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// Statik export edilen HTML her zaman "dark" ile üretilir (globals.css'teki
// :root varsayılanıyla tutarlı); bu yüzden sunucu/istemci ilk render'ı
// birebir eşleşir ve hydration mismatch oluşmaz. Gerçek tema, ThemeScript'in
// senkron olarak yazdığı <html data-theme> değerinden useSyncExternalStore
// aracılığıyla mount sonrası otomatik olarak okunur.
function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // localStorage erişilemez olabilir (gizli sekme vb.) — tema yine de bu
    // oturum için görsel olarak değişir, sadece kalıcı olmaz.
  }
  listeners.forEach((listener) => listener());
}

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export default function ThemeToggle({ className, iconClassName }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
      className={cn("flex items-center justify-center transition-colors duration-300", className)}
    >
      {theme === "dark" ? (
        <Sun className={iconClassName} aria-hidden="true" />
      ) : (
        <Moon className={iconClassName} aria-hidden="true" />
      )}
    </button>
  );
}
