import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

// Mock the NavigationMenu
jest.mock('../../navigation/links', () => [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]);

describe('Footer', () => {
    it('should render the footer with logo, navigation, and contact information', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        // Logo
        const logo = screen.getByAltText('Little Lemon Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/logo-vertical.png');

        // Navigation links
        const navSection = screen.getByRole('navigation');
        const navLinks = within(navSection).getAllByRole('link');
        expect(navLinks).toHaveLength(3);
        expect(navLinks[0]).toHaveTextContent('Home');
        expect(navLinks[0]).toHaveAttribute('href', '/');
        expect(navLinks[1]).toHaveTextContent('About');
        expect(navLinks[1]).toHaveAttribute('href', '/about');
        expect(navLinks[2]).toHaveTextContent('Contact');
        expect(navLinks[2]).toHaveAttribute('href', '/contact');

        // Contact information
        const contactAddress = screen.getByText('1234 Lemon St.');
        expect(contactAddress).toBeInTheDocument();

        const phoneLink = screen.getByRole('link', { name: /123-456-7890/i });
        expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890');

        const emailLink = screen.getByRole('link', { name: /someone@little-lemon-capstone-project.io/i });
        expect(emailLink).toHaveAttribute('href', 'mailto:someone@little-lemon-capstone-project.io');

        // Dynamic year
        const year = new Date().getFullYear();
        expect(screen.getByText(`© ${year} Little Lemon`)).toBeInTheDocument();
    });

    it('should render the navigation links correctly', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const navSection = screen.getByRole('navigation');
        const navLinks = within(navSection).getAllByRole('link');
        expect(navLinks).toHaveLength(3);

        navLinks.forEach((link, index) => {
            expect(link).toBeInTheDocument();
            expect(link).toHaveTextContent(['Home', 'About', 'Contact'][index]);
        });
    });
});
