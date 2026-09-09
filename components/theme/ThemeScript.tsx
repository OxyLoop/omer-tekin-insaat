const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

/**
 * Sayfa boyanmadan (paint) önce doğru [data-theme] özniteliğini <html>
 * etiketine uygular; böylece yanlış temayla kısa süreli bir "flash" (FOUC)
 * yaşanmaz. Script etiketleri HTML ayrıştırılırken senkron çalıştığından,
 * <body>'nin ilk çocuğu olarak render edilmesi, altındaki içerik boyanmadan
 * önce çalışmasını garantiler.
 */
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
