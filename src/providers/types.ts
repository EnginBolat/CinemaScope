import {DotNotation, TranslationKeys} from '@core/i18n/types';

export type TranslationKey = DotNotation<TranslationKeys>;

export interface LocalizationContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  translate: (key: TranslationKey, ...args:any[]) => string;
}

export interface LocalizationProviderProps {
  children: React.JSX.Element;
}