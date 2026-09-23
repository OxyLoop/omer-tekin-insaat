"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/lib/sanity/env";

/**
 * Sanity Studio, kimliği (giriş ekranı, izinler vb.) tamamen kendi içinde
 * yönetir — burada özel bir parola/oturum mantığı YOKTUR. Kullanıcı
 * sanity.io hesabıyla giriş yapar; yalnızca ilgili Sanity projesine üye
 * olarak eklenmiş kişiler içerik görebilir/düzenleyebilir.
 */
export default function StudioClient() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#151619] px-6 text-center text-[#f5f5f3]">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#9a9a9a] uppercase">
          Yönetim Paneli
        </p>
        <h1 className="max-w-lg text-2xl font-semibold tracking-tight">
          İçerik yönetim sistemi henüz yapılandırılmadı.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-[#9a9a9a]">
          Yönetim panelinin çalışması için Sanity proje kimliğinin ortam
          değişkenlerine eklenmesi gerekir. Ayrıntılı adımlar için proje
          deposundaki README.md dosyasındaki &quot;Yönetim Paneli
          Kurulumu&quot; bölümüne bakın.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
