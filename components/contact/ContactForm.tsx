"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const inputClasses =
  "w-full border border-line-strong bg-transparent px-4 py-3 text-sm text-offwhite placeholder:text-muted focus-visible:border-offwhite focus-visible:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isConfigured = Boolean(FORMSPREE_ENDPOINT);
  const isDev = process.env.NODE_ENV === "development";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      setStatus("error");
      setErrorMessage("Devam etmek için KVKK onayını kabul etmeniz gerekiyor.");
      return;
    }

    if (!isConfigured) {
      setStatus("error");
      setErrorMessage(
        "Form gönderimi henüz yapılandırılmadı. Lütfen NEXT_PUBLIC_FORMSPREE_ENDPOINT değerini ayarlayın.",
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT as string, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setConsent(false);
      } else {
        setStatus("error");
        setErrorMessage(
          "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan bizimle iletişime geçin.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin veya doğrudan bizimle iletişime geçin.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {isDev && !isConfigured && (
        <div className="flex items-start gap-3 border border-line-strong bg-charcoal-dark px-4 py-3 text-sm text-stone">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-stone" aria-hidden="true" />
          <p>
            Geliştirici notu: <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> ortam değişkeni
            tanımlı değil. Form şu anda gerçek bir mesaj gönderemez. Ayarlamak için{" "}
            <code>.env.example</code> dosyasına bakın.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs tracking-[0.15em] text-muted uppercase">
            Ad Soyad *
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs tracking-[0.15em] text-muted uppercase">
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-xs tracking-[0.15em] text-muted uppercase">
            E-posta *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-xs tracking-[0.15em] text-muted uppercase">
            Konu
          </label>
          <input id="subject" name="subject" type="text" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs tracking-[0.15em] text-muted uppercase">
          Mesaj *
        </label>
        <textarea id="message" name="message" required rows={5} className={cn(inputClasses, "resize-none")} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="kvkk"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 border border-line-strong bg-transparent accent-offwhite"
        />
        <span>
          KVKK kapsamında iletişim amacıyla bilgilerimin kullanılmasını kabul ediyorum.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center border border-offwhite bg-offwhite px-7 py-3.5 text-sm font-medium tracking-wide text-charcoal transition-colors duration-300 hover:bg-transparent hover:text-offwhite disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>

      {status === "success" && (
        <div className="flex items-start gap-3 border border-line-strong bg-charcoal-dark px-4 py-3 text-sm text-offwhite">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 border border-line-strong bg-charcoal-dark px-4 py-3 text-sm text-offwhite">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
