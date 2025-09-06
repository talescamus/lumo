'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User as UserIcon, Download, Bell } from 'lucide-react';
import { Button } from '../../ui/button';
import Navbar from '../../ui/navbar';
import { LanguageSwitcher } from '../../shared/Language/LanguageSwitcher';
import { HeaderIconDropdown } from './headericondropdown';
import { useTranslations } from 'next-intl';

interface User {
  id: string;
  email: string;
}

interface Props {
  user: User | null;
}

export default function Header({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('header');

  return (
    <nav className="w-full fixed top-0 left-0 z-[1000] bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        {/* Navbar central (desktop) */}
        <div className="hidden md:flex flex-1 justify-center">
          <Navbar />
        </div>

        {/* Ações à direita (desktop) */}
        <div className="relative z-[110] hidden md:flex items-center gap-4 text-white">
          {user?.id && (
            <HeaderIconDropdown
              icon={<UserIcon size={20} />}
              label={t('profile')}
              items={[
                { label: t('myProfile'), href: '/profile' },
                { label: t('logout'), onClick: () => console.log('Logout') }
              ]}
            />
          )}

          <HeaderIconDropdown
            icon={<Download size={20} />}
            label={t('download')}
            items={[{ label: t('downloadApp'), href: '/download' }]}
          />

          <HeaderIconDropdown
            icon={<Bell size={20} />}
            label={t('notifications')}
            items={[{ label: t('noNotifications') }]}
          />

          <div className="relative z-[9999]">
            <LanguageSwitcher />
          </div>

          {/* Botão Cadastrar-se (sempre visível no desktop) */}
          <Link
            href="/signup"
            className="hidden md:inline-flex items-center rounded-xl border border-white/20 px-4 h-9 text-sm font-semibold text-white hover:bg-white/10"
          >
            {t('signUp', { defaultMessage: 'Cadastrar-se' })}
          </Link>

          {user?.id ? (
            <>
              <span
                className="text-sm text-gray-300 truncate max-w-[160px]"
                title={user.email}
              >
                {user.email}
              </span>
              <Button size="sm" variant="default" asChild>
                <Link href="/dashboard">{t('dashboard')}</Link>
              </Button>
            </>
          ) : (
            <Button size="sm" variant="default" asChild>
              <Link href="/login">{t('signIn')}</Link>
            </Button>
          )}
        </div>

        {/* Menu toggle (mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-transparent relative z-[1000]">
          <Navbar />

          {/* Botão Cadastrar-se (mobile) */}
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl px-4 h-10 text-sm font-semibold text-[#0B0F15]"
            style={{ backgroundImage: 'linear-gradient(to right, #2DC9FF, #CAFF33)' }}
          >
            {t('signUp', { defaultMessage: 'Cadastrar-se' })}
          </Link>

          {user?.id ? (
            <>
              <span
                className="text-sm text-gray-300 truncate max-w-[90%]"
                title={user.email}
              >
                {user.email}
              </span>
              <Button variant="default" asChild>
                <Link href="/dashboard">{t('dashboard')}</Link>
              </Button>
            </>
          ) : (
            <Button variant="default" asChild>
              <Link href="/login">{t('signIn')}</Link>
            </Button>
          )}

          <div className="relative z-[9999]">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
