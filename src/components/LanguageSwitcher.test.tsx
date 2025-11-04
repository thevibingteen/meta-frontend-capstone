import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TranslationProvider } from '../translations/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

const mockedTranslations = { test: 'Test NL' };
const mockSetLocale = jest.fn();

jest.mock('../translations/TranslationContext', () => ({
    ...jest.requireActual('../translations/TranslationContext'),
    useTranslations: () => ({
        locale: 'en',
        setLocale: mockSetLocale,
    }),
}));

describe('LanguageSwitcher', () => {
    beforeEach(() => {
        mockSetLocale.mockClear();
    });

    it('should render the component with English flag and text', () => {
        render(
            <TranslationProvider translations={mockedTranslations}>
                <LanguageSwitcher />
            </TranslationProvider>
        );

        const button = screen.getByRole('button');
        const flag = screen.getByAltText('English');
        const text = screen.getByText('EN');

        expect(button).toBeInTheDocument();
        expect(flag).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('should toggle to Dutch locale on click', () => {
        render(
            <TranslationProvider translations={mockedTranslations}>
                <LanguageSwitcher />
            </TranslationProvider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockSetLocale).toHaveBeenCalledWith('nl');
    });
});
