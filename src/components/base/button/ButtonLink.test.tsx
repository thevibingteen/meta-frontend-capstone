import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import { ButtonVariant } from './Button.types';
import styles from './Button.module.css';

describe('ButtonLink Component', () => {
    it('should render the link with the correct label', () => {
        render(
            <MemoryRouter>
                <ButtonLink label="Go Home" href="/" />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go home/i });
        expect(link).toBeInTheDocument();
    });

    it('should render the link with the correct href', () => {
        render(
            <MemoryRouter>
                <ButtonLink label="Go Home" href="/home" />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go home/i });
        expect(link).toHaveAttribute('href', '/home');
    });

    it('should apply primary styles by default', () => {
        render(
            <MemoryRouter>
                <ButtonLink label="Go Home" href="/" />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go home/i });
        expect(link).toHaveClass(styles.button);
        expect(link).not.toHaveClass(styles.buttonSecondary);
    });

    it('should apply secondary styles when variant is set to secondary', () => {
        render(
            <MemoryRouter>
                <ButtonLink label="Go Home" href="/" variant={ButtonVariant.Secondary} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go home/i });
        expect(link).toHaveClass(styles.buttonSecondary);
    });

    it('should apply target and rel attributes when provided', () => {
        render(
            <MemoryRouter>
                <ButtonLink label="Go Home" href="/" target="_blank" />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go home/i });
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
