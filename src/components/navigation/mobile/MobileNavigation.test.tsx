import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import NavigationMenu from '../links';

jest.mock('../links', () => [
    { label: 'Home', href: '/', icon: '/icons/home.svg' },
    { label: 'About', href: '/about', icon: '/icons/about.svg' },
    { label: 'Services', href: '/services', icon: '/icons/services.svg' },
    { label: 'Contact', href: '/contact', icon: '/icons/contact.svg' },
]);

describe('MobileNavigation Component', () => {
    const renderMobileNavigation = () =>
        render(
            <BrowserRouter>
                <MobileNavigation />
            </BrowserRouter>
        );

    it('should render the navigation container', () => {
        renderMobileNavigation();

        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument();
    });

    it('should render all navigation items with labels, links, and icons', () => {
        renderMobileNavigation();

        NavigationMenu.forEach((item) => {
            const link = screen.getByText(item.label);
            expect(link).toBeInTheDocument();
            expect(link.closest('a')).toHaveAttribute('href', item.href);

            const icon = screen.getByAltText(`${item.label} icon`);
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('src', item.icon);
        });
    });

    it('should apply active class to the active NavLink', () => {
        render(
            <BrowserRouter>
                <MobileNavigation />
            </BrowserRouter>
        );

        const firstItem = NavigationMenu[0];
        const link = screen.getByText(firstItem.label);

        expect(link).toHaveClass('link');

        const navLink = screen.getByText(firstItem.label).closest('a');
        expect(navLink).toHaveClass('active');
    });

    it('should use the correct structure for the navigation list', () => {
        renderMobileNavigation();

        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(NavigationMenu.length);
    });
});
