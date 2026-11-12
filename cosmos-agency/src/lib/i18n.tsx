'use client';

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from 'react';

export type Lang = 'es' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'cosmos-lang';
const DEFAULT_LANG: Lang = 'es';

// Idioma guardado en localStorage, expuesto como "store externo" para React.
// `memoryLang` cubre navegadores donde localStorage no está disponible.
let memoryLang: Lang | null = null;
const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {}
  return memoryLang ?? DEFAULT_LANG;
}

function writeStoredLang(next: Lang) {
  memoryLang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener('storage', notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener('storage', notify);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // En el servidor siempre se renderiza en español; el cliente aplica el idioma guardado.
  const lang = useSyncExternalStore(subscribe, readStoredLang, () => DEFAULT_LANG);

  const setLang = useCallback((next: Lang) => writeStoredLang(next), []);
  const toggleLang = useCallback(() => writeStoredLang(lang === 'es' ? 'en' : 'es'), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
