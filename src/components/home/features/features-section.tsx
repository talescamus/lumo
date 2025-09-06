'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { Zap, ShieldCheck, Repeat, Bot, Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  brand?: string; // nome da marca para aparecer no heading/cta
};

export default function FeaturesSection({ brand = 'Lumo' }: Props) {
  const t = useTranslations('features');
  const reduce = useReducedMotion();

  const features = useMemo(
    () => [
      { icon: Zap,         title: t('feature1.title'), description: t('feature1.description') },
      { icon: ShieldCheck, title: t('feature2.title'), description: t('feature2.description') },
      { icon: Repeat,      title: t('feature3.title'), description: t('feature3.description') },
      { icon: Bot,         title: t('feature4.title'), description: t('feature4.description') },
      { icon: Bell,        title: t('feature5.title'), description: t('feature5.description') },
    ],
    [t]
  );

  return (
    <section
      id="features"
      className="py-20 text-white scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* selo */}
        <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-emerald-500/10 text-emerald-400/90 text-xs font-medium border border-emerald-400/20">
          {t('verified')}
        </div>

        {/* eyebrow */}
        <p className="text-sm uppercase tracking-wide text-primary font-semibold mb-2">
          {t('title')}
        </p>

        {/* heading */}
        <h2 id="features-title" className="text-4xl font-bold tracking-tight mb-3">
          {t('heading', { brand })}
        </h2>

        <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* descrição */}
        <p className="text-base text-white/70 max-w-2xl mx-auto mb-12">
          {t('description')}
        </p>

        {/* grade em pirâmide invertida */}
        <div className="grid gap-8">
          {/* linha de 3 */}
          <div className="grid gap-8 md:grid-cols-3">
            {features.slice(0, 3).map(({ icon: Icon, title, description }, idx) => (
              <motion.div
                key={`top-${idx}`}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: reduce ? 0 : idx * 0.06 }}
              >
                <FeatureCard Icon={Icon} title={title} description={description} />
              </motion.div>
            ))}
          </div>

          {/* linha de 2 */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {features.slice(3).map(({ icon: Icon, title, description }, idx) => (
              <motion.div
                key={`bottom-${idx}`}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: reduce ? 0 : idx * 0.08 }}
              >
                <FeatureCard Icon={Icon} title={title} description={description} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA textinho */}
        <p className="mt-14 text-white/60 text-sm">
          {t('cta', { brand })}
        </p>

        <div className="mt-16 border-t border-white/10 w-full max-w-5xl mx-auto" />
      </div>
    </section>
  );
}

/* ---------- Card Reutilizável ---------- */
function FeatureCard({
  Icon,
  title,
  description,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div
      tabIndex={0}
      aria-label={title}
      className="
        group relative flex flex-col items-center text-center p-6 rounded-2xl
        border border-white/10 bg-white/[0.04] shadow-sm
        outline-none focus-visible:ring-2 focus-visible:ring-white/60
        transition-transform duration-300 will-change-transform
        hover:-translate-y-0.5
      "
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      }}
    >
      {/* halo sutil no hover */}
      <div
        aria-hidden
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          WebkitMaskImage: 'radial-gradient(160px 80px at 50% 10%, black, transparent)',
          maskImage: 'radial-gradient(160px 80px at 50% 10%, black, transparent)',
          background:
            'radial-gradient(24rem 10rem at 50% -10%, rgba(45,201,255,0.2), rgba(202,255,51,0.15) 40%, transparent 70%)',
        }}
      />

      <div className="mb-4 rounded-full border border-white/10 bg-white/5 p-4">
        <Icon className="h-7 w-7 text-primary" /> {/* usa token de tema */}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>

      <div className="mt-5 h-px w-10 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}
