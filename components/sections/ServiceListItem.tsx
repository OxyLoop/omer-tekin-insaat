import { ArrowUpRight } from "lucide-react";
import { Service } from "@/types";

interface ServiceListItemProps {
  service: Service;
  description?: "short" | "long";
}

export default function ServiceListItem({ service, description = "short" }: ServiceListItemProps) {
  return (
    <div
      id={service.slug}
      className="group relative flex flex-col justify-between gap-6 border border-line p-7 transition-colors duration-300 hover:bg-charcoal-dark sm:p-8"
    >
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="text-sm font-semibold tracking-widest text-muted">
            {service.number}
          </span>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-offwhite"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-offwhite sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {description === "long" ? service.longDescription : service.shortDescription}
        </p>
      </div>
      <span className="h-px w-0 bg-line-strong transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
