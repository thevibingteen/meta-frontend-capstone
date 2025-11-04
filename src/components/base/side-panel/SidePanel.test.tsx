import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SidePanel from './SidePanel';
import { ReactElement } from 'react';

jest.useFakeTimers();

describe('SidePanel Component', () => {
    const onCloseMock = jest.fn();
    const testId = 'test-side-panel';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    function getSidePanel(isOpen: boolean, onClose: () => void): ReactElement {
        return (
            <SidePanel isOpen={isOpen} onClose={onClose} id={testId}>
                <div>Test Content</div>
            </SidePanel>
        );
    }

    async function clickCloseButton(): Promise<void> {
        const button = screen.getByTestId('close-button');
        await userEvent.click(button);
    }

    async function clickEscapeKey(dialog: HTMLDialogElement): Promise<void> {
        // Manually dispatch the `cancel` event, because JSDom doesn't do this for the escape key
        act(() => {
            const cancelEvent = new Event('cancel', { bubbles: true, cancelable: true });
            dialog.dispatchEvent(cancelEvent);
        });
    }

    it('should render children correctly', () => {
        render(getSidePanel(true, onCloseMock));
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply the closing class when closing', async () => {
        render(getSidePanel(true, onCloseMock));

        act(() => {
            clickCloseButton();
            jest.runAllTimers();
        });

        await waitFor(() => {
            const dialog = screen.getByTestId<HTMLDialogElement>(testId);
            expect(dialog).toHaveClass('closing');
        });

        await waitFor(() => {
            expect(onCloseMock).toHaveBeenCalledTimes(1);
        });
    });

    it('should call onClose when the cancel event is triggered', async () => {
        render(getSidePanel(true, onCloseMock));

        const dialog = screen.getByTestId<HTMLDialogElement>(testId);

        clickEscapeKey(dialog);

        await waitFor(() => {
            expect(onCloseMock).toHaveBeenCalledTimes(1);
        });
    });

    it('should open the dialog when isOpen is true', async () => {
        render(getSidePanel(true, onCloseMock));

        const dialog = screen.getByTestId<HTMLDialogElement>(testId);
        await waitFor(() => {
            // This is a workaround for `dialog.showModal`, because JSDom doesn't support it
            expect(dialog.showModal).toHaveBeenCalledTimes(1);
        });
    });

    it('should close the dialog when isOpen is false', async () => {
        const sidePanel = getSidePanel(true, onCloseMock);
        const rerenderedSidePanel = getSidePanel(false, onCloseMock);
        const { rerender } = render(sidePanel);

        rerender(rerenderedSidePanel);

        await waitFor(() => {
            const dialog = screen.getByTestId<HTMLDialogElement>(testId);
            expect(dialog.open).toBe(false);
        });
    });

    it('shoudl close the dialog when the backdrop is clicked', async () => {
        render(getSidePanel(true, onCloseMock));

        const dialog = screen.getByTestId<HTMLDialogElement>(testId);
        await waitFor(() => {
            userEvent.click(dialog);
        });

        await waitFor(() => {
            expect(onCloseMock).toHaveBeenCalledTimes(1);
        });
    });
});
