"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/contact";

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp üzerinden iletişime geçin"
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pr-3.5 pl-3.5 text-charcoal shadow-lg shadow-black/30 transition-all duration-300 hover:pr-5 sm:right-8 sm:bottom-8"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" fill="currentColor" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[100px] group-hover:opacity-100">
        WhatsApp
      </span>
    </a>
  );
}
