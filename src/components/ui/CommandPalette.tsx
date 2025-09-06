'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, ArrowRight, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// itens exemplo — substitua pelos seus (pode vir de uma API)
const QUICK_LINKS = [
  { id: 'demo', label: 'Abrir Conta Demo', href: '/demo', group: 'Ações' },
  { id: 'app', label: 'Ir para Plataforma Web', href: '/app', group: 'Ações' },
  { id: 'precos', label: 'Ver Planos e Preços', href: '/precos', group: 'Ações' },

  { id: 'docs-api', label: 'Integrações (APIs)', href: '/integracoes', group: 'Documentação' },
  { id: 'ajuda', label: 'Central de Ajuda', href: '/ajuda', group: 'Documentação' },
  { id: 'status', label: 'Status da Plataforma', href: '/status', group: 'Documentação' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // atalho ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = QUICK_LINKS.filter(i =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  const onSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Botão para usar no navbar */}
      <Dialog.Trigger asChild>
        <button
          className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:text-white"
          aria-label="Abrir busca global (⌘K)"
          title="Abrir busca global (⌘K)"
        >
          <Search size={16} className="opacity-80" />
          <span className="hidden sm:inline text-left">Buscar…</span>
          <kbd className="ml-2 hidden rounded-md border border-white/20 px-1.5 py-[1px] text-[10px] text-white/70 sm:inline">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-24 z-[61] w-[92vw] max-w-[680px] -translate-x-1/2 rounded-2xl border border-white/15 bg-[#0B0F15] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <div className="flex items-center gap-2 text-white/80">
              <Search size={16} />
              <span className="text-sm">Busca</span>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-md p-2 text-white/70 hover:bg-white/10" aria-label="Fechar">
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          {/* CMDK */}
          <Command label="Buscar" className="text-white">
            <div className="px-3 py-2">
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Digite para buscar (ex.: demo, preços, integrações)…"
                className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40"
              />
            </div>

            <Command.List className="max-h-[60vh] overflow-auto pb-2">
              {filtered.length === 0 && (
                <Command.Empty className="px-4 py-6 text-center text-sm text-white/60">
                  Nada encontrado.
                </Command.Empty>
              )}

              {/* agrupar por group */}
              {['Ações', 'Documentação'].map((group) => {
                const items = filtered.filter((i) => i.group === group);
                if (!items.length) return null;
                return (
                  <Command.Group key={group} heading={group} className="px-2 py-1">
                    {items.map((i) => (
                      <Command.Item
                        key={i.id}
                        value={i.label}
                        onSelect={() => onSelect(i.href)}
                        className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm aria-selected:bg-white/10"
                      >
                        <span>{i.label}</span>
                        <ArrowRight size={16} className="opacity-0 transition-opacity group-aria-selected:opacity-100" />
                      </Command.Item>
                    ))}
                  </Command.Group>
                );
              })}

              <Command.Separator alwaysRender className="my-2 h-px bg-white/10" />

              {/* “Links rápidos” */}
              <div className="px-3 pb-3">
                <div className="text-xs text-white/50">Links rápidos</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Link href="/blog" className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/5">
                    Blog <ExternalLink size={14} />
                  </Link>
                  <Link href="/contato" className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:bg-white/5">
                    Contato <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
