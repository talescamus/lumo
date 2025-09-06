'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import CommandPalette from './CommandPalette';


type SubItem = { label: string; href: string; desc?: string };
type NavItem = { id: string; label: string; href?: string; children?: SubItem[] };

const NAV: NavItem[] = [
  {
    id: 'produtos',
    label: 'Produtos',
    children: [
      { label: 'Conta Demo', href: '/demo', desc: 'Treine sem risco, dados em tempo real' },
      { label: 'Lumo Pro', href: '/pro', desc: 'Indicadores, alertas e relatórios' },
      { label: 'Lumo Premium', href: '/premium', desc: 'APIs, backtesting e paper trading' },
      { label: 'Plataforma Web', href: '/app', desc: 'Negocie direto no navegador' },
      { label: 'Mobile (em breve)', href: '/mobile', desc: 'Apps iOS/Android em desenvolvimento' },
    ],
  },
  {
    id: 'sobre',
    label: 'Sobre nós',
    children: [
      { label: 'Empresa', href: '/sobre', desc: 'Nossa missão e visão' },
      { label: 'Segurança', href: '/seguranca', desc: '2FA, criptografia e compliance' },
      { label: 'Preços', href: '/precos', desc: 'Planos Free / Pro / Premium' },
      { label: 'Carreiras', href: '/carreiras', desc: 'Venha construir a Lumo' },
      { label: 'Blog', href: '/blog', desc: 'Novidades e análises' },
    ],
  },
  {
    id: 'ajuda',
    label: 'Ajuda',
    children: [
      { label: 'Central de ajuda', href: '/ajuda', desc: 'FAQ, tutoriais e suporte' },
      { label: 'Status', href: '/status', desc: 'Disponibilidade da plataforma' },
      { label: 'Contato', href: '/contato', desc: 'Fale com a gente' },
      { label: 'Integrações (APIs)', href: '/integracoes', desc: 'Binance/Bybit, chaves e webhooks' },
      { label: 'Compliance', href: '/compliance', desc: 'Termos, privacidade e políticas' },
    ],
  },
];

export default function NavbarTransparent() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnId = useId();

  // atraso para fechar (evita "piscada" ao mover do botão para o dropdown)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };
  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // fechar dropdown ao clicar fora / ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  // fecha menus ao mudar de rota
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // trava scroll do body quando mobile drawer aberto
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const toggleAccordion = (id: string) =>
    setOpenAccordions((p) => ({ ...p, [id]: !p[id] }));

  const navBg =
    'bg-transparent ' +
    (scrolled ? 'backdrop-blur-md bg-black/35 shadow-[0_8px_24px_rgba(0,0,0,0.25)]' : '');

  const isActive = (href?: string) =>
    href ? (href === '/' ? pathname === '/' : pathname?.startsWith(href)) : false;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${navBg}`}
      aria-label="Barra de navegação"
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Página inicial">
          <Image src="/lumo_logo_primary.png" alt="Lumo" width={120} height={32} priority />
        </Link>

        {/* MENU CENTRAL (DESKTOP) + BUSCA (⌘K) */}
        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex"
          aria-label="Navegação principal"
        >
          {NAV.map((item) => {
            const hasChildren = !!item.children?.length;
            const opened = openMenu === item.id;

            return (
              <div
                key={item.id}
                className="relative"
                // manter aberto quando mouse está no botão OU no dropdown
                onPointerEnter={() => hasChildren && (cancelClose(), setOpenMenu(item.id))}
                onPointerLeave={() => hasChildren && scheduleClose()}
              >
                <button
                  className={[
                    'group relative inline-flex items-center gap-1 rounded-md px-1 py-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DC9FF]/60',
                    isActive(item.href) ? 'text-white' : 'text-white/85 hover:text-white',
                  ].join(' ')}
                  aria-haspopup={hasChildren ? 'menu' : undefined}
                  aria-expanded={opened}
                  // toggle por clique (mantém aberto para clicar nos itens)
                  onClick={() => hasChildren && setOpenMenu((m) => (m === item.id ? null : item.id))}
                  onKeyDown={(e) => {
                    if (!hasChildren) return;
                    if (e.key === 'ArrowDown') setOpenMenu(item.id);
                    if (e.key === 'ArrowUp' || e.key === 'Escape') setOpenMenu(null);
                  }}
                >
                  {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
                  {hasChildren && (
                    <svg
                      width="13" height="13" viewBox="0 0 20 20"
                      className={`transition-transform ${opened ? 'rotate-180' : ''} opacity-80`}
                      aria-hidden
                    >
                      <path fill="currentColor" d="M5.5 7.5L10 12l4.5-4.5z" />
                    </svg>
                  )}
                  <span
                    className={[
                      'pointer-events-none absolute left-1/2 top-[calc(100%+6px)] block h-[2px] -translate-x-1/2 rounded-full bg-white/80 transition-all duration-300',
                      isActive(item.href) || opened ? 'w-6' : 'w-0 group-hover:w-6',
                    ].join(' ')}
                  />
                </button>

                {/* DROPDOWN */}
                {hasChildren && (
                  <div
                    role="menu"
                    // IMPORTANTÍSSIMO: o dropdown participa dos eventos do container acima,
                    // então entrar nele NÃO dispara mouseleave do botão.
                    className={[
                      'absolute left-1/2 z-50 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-[#0B0F15]/95 backdrop-blur-md shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-all',
                      opened
                        ? 'pointer-events-auto translate-y-2 opacity-100'
                        : 'pointer-events-none -translate-y-1 opacity-0',
                    ].join(' ')}
                  >
                    <ul className="p-2" onPointerEnter={cancelClose} onPointerLeave={scheduleClose}>
                      {item.children!.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                            onClick={() => setOpenMenu(null)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{sub.label}</span>
                            </div>
                            {sub.desc && <div className="mt-0.5 text-xs text-white/60">{sub.desc}</div>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

        </nav>
      
        {/* MOBILE: Busca + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <CommandPalette />
          <button
            id={menuBtnId}
            className="rounded-xl border border-white/25 px-3 py-2 text-sm text-white"
            onClick={() => setMobileOpen((s) => !s)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* DRAWER MOBILE + ACCORDIONS */}
      <div
        id="mobile-menu"
        role="menu"
        aria-labelledby={menuBtnId}
        className={[
          'mx-3 mb-3 overflow-hidden rounded-2xl border border-white/15 bg-black/70 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden',
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="p-2">
          {NAV.map((item) => {
            const hasChildren = !!item.children?.length;
            const isOpen = !!openAccordions[item.id];

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.id} className="rounded-xl">
                <button
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-white/90 hover:bg-white/10"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 20 20" className={`transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden>
                    <path fill="currentColor" d="M5.5 7.5L10 12l4.5-4.5z" />
                  </svg>
                </button>
                <div
                  className={[
                    'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  ].join(' ')}
                >
                  <ul className="min-h-0 space-y-1 px-2 pb-2">
                    {item.children!.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-4 py-2 text-sm text-white/85 hover:bg-white/10"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Cadastrar
            </Link>
            <Link
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-4 py-2.5 text-center text-sm font-semibold text-[#0B0F15]"
              style={{ backgroundImage: 'linear-gradient(to right, #2DC9FF, #CAFF33)' }}
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
