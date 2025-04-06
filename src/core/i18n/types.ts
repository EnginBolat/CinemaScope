import { en } from './lang/en';

export type TranslationKeys = typeof en;

export type DotNotation<T, P extends string = ''> = T extends object
    ? {
        [K in keyof T]: K extends string
        ? DotNotation<T[K], `${P}${P extends '' ? '' : '.'}${K}`>
        : never;
    }[keyof T]
    : P;
    