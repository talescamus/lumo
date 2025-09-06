// src/components/ui/switch.tsx
'use client';

import * as React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { cn } from '../../lib/utils';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, id, className }) => {
  return (
    <HeadlessSwitch
      id={id}
      checked={checked}
      onChange={onCheckedChange}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50',
        checked ? 'bg-primary' : 'bg-gray-300',
        className
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </HeadlessSwitch>
  );
};
