import 'server-only';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types/dictionary';

// กำหนดว่าภาษาไหน ให้ไปโหลดไฟล์ไหน
const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  th: () => import('@/dictionaries/th.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  const dictLoader = dictionaries[locale];
  if (!dictLoader) {
    throw new Error(`Dictionary for locale "${locale}" not found`);
  }
  return dictLoader();
};
