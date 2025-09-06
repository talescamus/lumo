'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-all duration-200 relative',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',

        // 🟢 Estilo ativo (Chart selecionado)
        chartTab: `text-[#caff33] border border-[#2dcaff]
          bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(45,_202,_255,_0.1),_rgba(125,_222,_255,_0.03)_74%)]
          shadow-[0_0_8px_1px_rgba(45,202,255,0.15)] px-4 py-1.5`,

        // ⚫ Inativo
        tabInactive: 'text-muted-foreground hover:text-white hover:bg-zinc-900 px-4 py-1.5',
      },
      size: {
        default: 'h-11 px-5 py-[10px]',
        sm: 'h-9 px-3 py-1.5 text-sm',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
