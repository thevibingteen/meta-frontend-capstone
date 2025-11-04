import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import { ButtonVariant } from './Button.types';

describe('Button Component', () => {
    it('should render the button with the provided label', () => {
        render(<Button label="Click Me" onClick={() => {}} />);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('should call onClick when the button is clicked', () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick} />);

        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should apply primary styles by default', () => {
        render(<Button label="Click Me" onClick={() => {}} />);

        const button = screen.getByRole('button', { name: /click me/i });

        expect(button).toHaveClass('button');
        expect(button).not.toHaveClass('buttonSecondary');
    });

    it('should apply secondary styles when variant is set to secondary', () => {
        render(<Button label="Click Me" onClick={() => {}} variant={ButtonVariant.Secondary} />);

        const button = screen.getByRole('button', { name: /click me/i });

        expect(button).toHaveClass('buttonSecondary');
    });

    it('should apply disabled state when disabled is set to true and not fire onClick handler', () => {
        const handleClick = jest.fn();
        render(<Button label="Click Me" onClick={handleClick} disabled />);

        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);

        expect(button).toBeDisabled();
        expect(handleClick).not.toHaveBeenCalled();
    });
});
