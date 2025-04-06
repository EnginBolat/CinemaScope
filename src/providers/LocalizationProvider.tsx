import { en, tr, TranslationKey } from '@core/index';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';

import { LocalizationContextProps, LocalizationProviderProps } from './types';

const translations = { en, tr };

export const LocalizationContext = createContext<LocalizationContextProps>({
  locale: 'en',
  setLocale: () => {},
  translate: key => key,
});

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const initialLocale: keyof typeof translations = (I18n.locale.split('-')[0] as keyof typeof translations) || 'en';
  const [locale, setLocaleLang] = useState<keyof typeof translations>(initialLocale);

  useEffect(() => {
    const isRTL = ['ar', 'he', 'fa'].includes(locale.split('-')[0]);
    I18nManager.forceRTL(isRTL);
    I18n.translations = translations;
    I18n.locale = locale;
  }, [locale]);

  const setLocale = (newLocale: string) => {
    if (translations[newLocale]) {
      I18n.locale = newLocale;
      setLocaleLang(newLocale as 'tr' | 'en');
    } else console.warn(`Dil bulunamadı: ${newLocale}`);
  };

  const translate = (key: TranslationKey, ...args: any[]): string => {
    let translation = I18n.t(key);

    if (translation.includes('missing')) return key;
    return translation.replace(/{(\d+)}/g, (_, index) => {
      const value = args[index];

      return typeof value === 'string' ? I18n.t(value) : `{${index}}`;
    });
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>{children}</LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
export default LocalizationProvider;
