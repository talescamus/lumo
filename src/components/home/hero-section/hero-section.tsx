"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroTop() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden">
      {/* BG */}
      <Image
        src="/pessoa-usando-oculos-vr.jpg"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          {t("badge")}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
          {t("title.line1")} <br className="hidden md:block" />
          <span className="text-primary">{t("title.highlight", { brand: "Lumo" })}</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80">
          {t("description")}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold text-background bg-gradient-to-r from-primary to-green-400 shadow-lg shadow-primary/20 hover:opacity-90 transition"
          >
            {t("cta.start")}
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition"
          >
            {t("cta.demo")}
          </Link>
        </div>

        {/* Rating + Extra Info */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/75">
          <span className="inline-flex items-center gap-1">⭐⭐⭐⭐⭐ 4,8/5</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>{t("rating")}</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span>{t("apis")}</span>
        </div>
      </div>

      {/* Floor gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,15,21,0) 0%, rgba(11,15,21,0.35) 40%, #0B0F15 100%)",
        }}
      />
    </section>
  );
}
