import React from 'react';
import { useTranslations } from '../translations/TranslationContext';
import styles from './LanguageSwitcher.module.css';
import enFlag from '../assets/icons/en-flag.svg';
import nlFlag from '../assets/icons/nl-flag.svg';

const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useTranslations();

    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'nl' : 'en';
        setLocale(newLocale);
    };

    return (
        <button onClick={toggleLocale} className={styles.languageSwitcher} data-testid="language-switcher">
            <img
                src={locale === 'en' ? enFlag : nlFlag}
                alt={locale === 'en' ? 'English' : 'Dutch'}
                className={styles.flag}
            />
            <span>{locale === 'en' ? 'EN' : 'NL'}</span>
        </button>
    );
};

export default LanguageSwitcher;
