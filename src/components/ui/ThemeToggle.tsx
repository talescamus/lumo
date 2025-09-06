'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (theme ?? resolvedTheme) === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center w-16 h-8 bg-white/10 rounded-full p-1 cursor-pointer border border-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Alternar tema claro/escuro"
      title={isDark ? 'Tema claro' : 'Tema escuro'}
    >
      {/* O fundo do toggle */}
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-black"
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        animate={{ x: isDark ? 32 : 0 }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </button>
  );
}
