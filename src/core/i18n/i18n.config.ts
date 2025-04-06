import I18n from 'react-native-i18n';
import { I18nManager } from 'react-native';

import { DotNotation, TranslationKeys } from './types';
import { en } from './lang/en';
import { tr } from './lang/tr';

interface Translations {
    [key: string]: any;
}

const translations: Translations = {
    en: en,
    tr: tr,
};

I18n.translations = translations;
I18n.fallbacks = true;
I18n.defaultLocale = 'en';

export type TranslationKey = DotNotation<TranslationKeys>;

export const initLocalization = (): void => {
    const deviceLocale = I18n.locale || I18n.defaultLocale;
    const isRTL = ['ar', 'he', 'fa'].includes(deviceLocale.split('-')[0]);
    I18nManager.forceRTL(isRTL);
    I18n.locale = deviceLocale;
};

export const translate = (key: TranslationKey, ...args: any[]): string => {
    let translation = I18n.t(key);
    if (translation.includes('missing')) { return key; }
    return translation.replace(/{(\d+)}/g, (_, index) => {
        const value = args[index];
        return typeof value === 'string' ? I18n.t(value) : `{${index}}`;
    });
};