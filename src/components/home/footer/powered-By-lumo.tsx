'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../../../components/ui/separator';
import { ArrowUpRight } from 'lucide-react';

export function PoweredByLumo() {
  return (
    <>
      <Separator className="footer-border" />
      <div
        className="flex flex-col justify-center items-center gap-2 text-muted-foreground text-sm leading-[14px] py-[24px]"
      >
        <div className="flex justify-center items-center gap-2">
          <span className="text-sm leading-[14px]">Powered by</span>
          <Image
            src="/assets/icons/logo/ztrecrypto-io-logo.svg"
            alt="ZtreCrypto.io logo"
            width={230}
            height={50}
            className="h-[20px] w-auto object-contain"
          />
        </div>

        <div className="flex justify-center items-center gap-3 flex-wrap md:flex-nowrap">
          <FooterLink href="https://lumo.io">Explore Lumo.io</FooterLink>
          <FooterLink href="https://www.lumo.io/legal/terms">Termos de Uso</FooterLink>
          <FooterLink href="https://www.lumo.io/legal/privacy">Política de Privacidade</FooterLink>
        </div>
      </div>
    </>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-1 text-sm leading-[14px] hover:text-primary transition-colors duration-300"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
