import React, { createContext, useContext, useState } from 'react';
import enTranslations from './locales/en.json';

type Translations = Record<string, string>;

interface TranslationContextType {
    translations: Translations;
    locale: string;
    setLocale: (newLocale: string) => void;
}

const TranslationContext = createContext<TranslationContextType>({
    translations: enTranslations,
    locale: 'en',
    setLocale: () => {},
});

export const TranslationProvider: React.FC<{ translations: Translations | null; children: React.ReactNode }> = ({
    translations,
    children,
}) => {
    const [locale, setLocale] = useState(localStorage.getItem('preferredLocale') || 'en');

    const changeLocale = (newLocale: string) => {
        localStorage.setItem('preferredLocale', newLocale);
        setLocale(newLocale);
        window.location.reload();
    };

    return (
        <TranslationContext.Provider
            value={{
                translations: translations || enTranslations,
                locale,
                setLocale: changeLocale,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslations = () => useContext(TranslationContext);
