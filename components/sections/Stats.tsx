import Reveal from "@/components/motion/Reveal";
import { homeStats } from "@/data/stats";

export default function Stats() {
  return (
    <section className="border-y border-line bg-charcoal-dark">
      <div className="container-site">
        <div className="grid grid-cols-2 divide-x divide-y divide-line border border-line sm:grid-cols-4 sm:divide-y-0">
          {homeStats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08} className="px-6 py-10 text-center sm:py-14">
              <p className="text-3xl font-semibold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-xs tracking-[0.15em] text-muted uppercase sm:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
