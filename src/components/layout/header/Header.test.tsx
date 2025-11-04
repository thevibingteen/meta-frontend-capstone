import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
    let setMobileMenuOpenMock: jest.Mock;

    beforeEach(() => {
        setMobileMenuOpenMock = jest.fn();
    });

    const renderHeader = (isMobileMenuOpen: boolean) =>
        render(
            <BrowserRouter>
                <Header isMobileMenuOpen={isMobileMenuOpen} setMobileMenuOpen={setMobileMenuOpenMock} />
            </BrowserRouter>
        );

    it('should render the logo with correct alt text', () => {
        renderHeader(false);

        const logo = screen.getByAltText('Little Lemon Logo');
        expect(logo).toBeInTheDocument();
        expect(logo.closest('a')).toHaveAttribute('href', '/');
    });

    it('should render the DesktopNavigation component', () => {
        renderHeader(false);

        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument();
    });

    it('should render the CTA buttons', () => {
        renderHeader(false);

        const reserveButton = screen.getByText('Reserve a Table');
        const languageSwitcher = screen.getByTestId('language-switcher');

        expect(reserveButton).toBeInTheDocument();
        expect(reserveButton.closest('a')).toHaveAttribute('href', '/reserve');
        expect(languageSwitcher).toBeInTheDocument();
    });

    it('should render the hamburger menu button', () => {
        renderHeader(false);

        const hamburgerButton = screen.getByTestId('mobile-menu-button');
        expect(hamburgerButton).toBeInTheDocument();
    });

    it('should call setMobileMenuOpen when the hamburger menu button is clicked', () => {
        renderHeader(false);

        const hamburgerButton = screen.getByTestId('mobile-menu-button');
        fireEvent.click(hamburgerButton);

        expect(setMobileMenuOpenMock).toHaveBeenCalledTimes(1);
        expect(setMobileMenuOpenMock).toHaveBeenCalledWith(true);
    });

    it('should add the open class to the hamburger menu when isMobileMenuOpen is true', () => {
        renderHeader(true);

        const hamburgerButton = screen.getByTestId('mobile-menu-button');
        expect(hamburgerButton).toHaveClass('open');
    });
});
