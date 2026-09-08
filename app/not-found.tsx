import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <span className="text-xs font-semibold tracking-[0.3em] text-muted uppercase">404</span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Aradığınız sayfa bulunamadı.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Sayfa taşınmış veya kaldırılmış olabilir. Ana sayfaya dönerek devam
        edebilirsiniz.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href="/" showArrow>
          Ana Sayfaya Dön
        </Button>
        <Link
          href="/projeler"
          className="inline-flex items-center justify-center border border-line-strong px-7 py-3.5 text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite"
        >
          Projeleri Gör
        </Link>
      </div>
    </div>
  );
}
