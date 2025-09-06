'use client';

import React from 'react';
import clsx from 'clsx';

interface TabButtonProps {
  label: string;
  isActive?: boolean;
}

export const TabButton = ({ label, isActive }: TabButtonProps) => {
  return (
    <button
      className={clsx(
        'relative px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200',
        'bg-black/30 backdrop-blur-sm', // fundo transparente estilo vidro
        'border-cyan-500/30 text-neutral-300',
        isActive && [
          'text-lime-400 border-cyan-400',
          'shadow-[0_0_8px_1px_rgba(0,255,255,0.3)]',
        ]
      )}
    >
      {label}

      {/* Efeito brilhante inferior (borda animada) */}
      {isActive && (
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-cyan-400 rounded-full animate-pulse"
        />
      )}
    </button>
  );
};
