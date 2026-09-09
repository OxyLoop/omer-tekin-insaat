"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const infoBlocks = ["Mühendislik", "Müteahhitlik", "Anahtar Teslim", "Tadilat"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const transition = (delay: number) => ({
    duration: 0.8,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-charcoal-dark sm:min-h-[100vh]">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/hero-project.png"
          alt="Ömer Tekin Mühendislik ve İnşaat tarafından uygulanan, deniz manzaralı modern bir konut projesi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_45%] sm:object-[70%_45%] lg:object-center"
          fallbackLabel="Proje Görseli"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      <div className="container-site relative z-10 flex w-full flex-col gap-14 pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0)}
            className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-stone uppercase"
          >
            <span className="h-px w-8 bg-line-strong" />
            Ömer Tekin Mühendislik &amp; İnşaat
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.12)}
            className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-semibold tracking-tight text-offwhite"
          >
            Sağlam Temeller.
            <br />
            Güvenilir Yapılar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.24)}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg"
          >
            Mühendislikten uygulamaya, projelerinizi güvenli ve nitelikli
            yapılara dönüştürüyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.36)}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/projeler" variant="primary" showArrow>
              Projelerimizi İnceleyin
            </Button>
            <Button href="/iletisim" variant="secondary">
              İletişime Geçin
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition(0.5)}
          className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4"
        >
          {infoBlocks.map((label) => (
            <div key={label} className="bg-charcoal-dark/80 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5">
              <span className="text-sm font-medium tracking-wide text-offwhite">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Kaydır</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
