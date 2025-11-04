import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { TranslationProvider, useTranslations } from './TranslationContext';

jest.mock('./locales/en.json', () => ({
    test: 'Test EN',
}));

const TestComponent: React.FC = () => {
    const { translations, locale, setLocale } = useTranslations();

    return (
        <div>
            <p data-testid="locale">{locale}</p>
            <p data-testid="translation">{translations.test}</p>
            <button onClick={() => setLocale('nl')} data-testid="set-locale">
                Change Locale
            </button>
        </div>
    );
};

describe('TranslationContext', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                ...window.location,
                reload: jest.fn(),
            },
        });
    });

    beforeEach(() => {
        localStorage.clear();
    });

    it('should provide default translations and locale', () => {
        render(
            <TranslationProvider translations={null}>
                <TestComponent />
            </TranslationProvider>
        );

        expect(screen.getByTestId('locale')).toHaveTextContent('en');
        expect(screen.getByTestId('translation')).toHaveTextContent('Test EN');
    });

    it('should use provided translations', () => {
        const mockTranslations = { test: 'Test NL' };

        render(
            <TranslationProvider translations={mockTranslations}>
                <TestComponent />
            </TranslationProvider>
        );

        expect(screen.getByTestId('locale')).toHaveTextContent('en');
        expect(screen.getByTestId('translation')).toHaveTextContent('Test NL');
    });

    it('should change locale and update localStorage', () => {
        const mockTranslations = { test: 'Test NL' };

        render(
            <TranslationProvider translations={mockTranslations}>
                <TestComponent />
            </TranslationProvider>
        );

        expect(screen.getByTestId('locale')).toHaveTextContent('en');

        const setLocaleButton = screen.getByTestId('set-locale');

        act(() => {
            setLocaleButton.click();
        });

        expect(localStorage.getItem('preferredLocale')).toBe('nl');
    });

    it('should persist preferred locale from localStorage', () => {
        localStorage.setItem('preferredLocale', 'nl');

        render(
            <TranslationProvider translations={null}>
                <TestComponent />
            </TranslationProvider>
        );

        expect(screen.getByTestId('locale')).toHaveTextContent('nl');
    });
});
