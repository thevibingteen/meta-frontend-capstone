import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DesktopNavigation from './DesktopNavigation';
import NavigationMenu from '../links';

describe('DesktopNavigation Component', () => {
    const renderDesktopNavigation = (className?: string) =>
        render(
            <BrowserRouter>
                <DesktopNavigation className={className} />
            </BrowserRouter>
        );

    it('should render the navigation container', () => {
        renderDesktopNavigation();

        const navigation = screen.getByRole('navigation');
        expect(navigation).toBeInTheDocument();
    });

    it('should apply the passed className', () => {
        renderDesktopNavigation('test-class');

        const navigation = screen.getByRole('navigation');
        expect(navigation).toHaveClass('test-class');
    });

    it('should render all navigation items from NavigationMenu', () => {
        renderDesktopNavigation();

        NavigationMenu.forEach((item) => {
            const link = screen.getByText(item.label);
            expect(link).toBeInTheDocument();
            expect(link.closest('a')).toHaveAttribute('href', item.href);
        });
    });

    it('should apply active class when the route matches', () => {
        renderDesktopNavigation();

        const firstItem = NavigationMenu[0];
        const link = screen.getByText(firstItem.label);

        expect(link).toHaveClass('link');

        const navLink = screen.getByText(firstItem.label).closest('a');
        expect(navLink).toHaveClass('active');
    });
});
