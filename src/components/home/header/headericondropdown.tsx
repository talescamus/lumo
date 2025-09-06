'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface HeaderIconDropdownProps {
  icon: ReactNode;
  label: string;
  items: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
}

export function HeaderIconDropdown({ icon, label, items }: HeaderIconDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label={label}
          className="p-2 rounded-md hover:bg-white/10 text-gray-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {icon}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        side="bottom"
        align="end"
        className="z-50 min-w-[200px] rounded-lg border border-gray-700 bg-black/80 backdrop-blur-md p-1 shadow-xl"
      >
        {items.map((item, index) => (
          <DropdownMenu.Item
            key={index}
            onSelect={(e) => {
              e.preventDefault();
              item.onClick?.();
            }}
            className={cn(
              'flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-white transition-colors',
              item.href && 'text-white'
            )}
          >
            {item.href ? (
              <NextLink href={item.href} className="w-full block">
                {item.label}
              </NextLink>
            ) : (
              item.label
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
