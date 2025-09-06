'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
// Update the import path below to the correct relative path where Switch is located, for example:
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { useTranslations } from 'next-intl';

export default function NotificationSettingsSection() {
  const t = useTranslations('notifications');

  const channels = [
    {
      id: 'email',
      icon: Mail,
      label: t('email.label'),
      description: t('email.description')
    },
    {
      id: 'whatsapp',
      icon: MessageSquare,
      label: t('whatsapp.label'),
      description: t('whatsapp.description')
    },
    {
      id: 'telegram',
      icon: Bell,
      label: t('telegram.label'),
      description: t('telegram.description')
    }
  ];

  const [enabledChannels, setEnabledChannels] = useState<Record<string, boolean>>({
    email: true,
    whatsapp: false,
    telegram: true
  });

  const toggleChannel = (id: string) => {
    setEnabledChannels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-muted/30 text-foreground">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
          {t('heading')}
        </p>

        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          {t('subtitle')}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((channel) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={channel.id}
              className="bg-background p-6 rounded-xl border border-border shadow-sm hover:shadow-md"
            >
              <div className="mb-4 bg-muted p-4 rounded-full inline-block">
                <channel.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{channel.label}</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">{channel.description}</p>

              <div className="flex items-center justify-center gap-2">
                <Label htmlFor={channel.id}>{t('toggleLabel')}</Label>
                <Switch
                  id={channel.id}
                  checked={enabledChannels[channel.id]}
                  onCheckedChange={() => toggleChannel(channel.id)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-muted-foreground">
          {t('footer')}
        </p>
      </div>
    </section>
  );
}
