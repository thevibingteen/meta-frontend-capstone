import { ReactNode, useRef, useEffect, useState, useCallback } from 'react';
import styles from './SidePanel.module.css';
import { getClassNameFromArray } from '../../../utils/component';
import closeIcon from '../../../assets/icons/close.svg';

type SidePanelProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    id?: string;
};

const SidePanel = ({ isOpen, onClose, children, id }: SidePanelProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    const dialogTransitionDuration = useRef<number>(400);

    const classes = [styles.dialog];
    if (isClosing) {
        classes.push(styles.closing);
    }

    const handleClose = useCallback(
        (event?: Event | React.SyntheticEvent) => {
            event?.preventDefault();

            const dialog = dialogRef.current;

            setIsClosing(true);

            const timer = setTimeout(() => {
                dialog?.close();
                setIsClosing(false);

                onClose();
            }, dialogTransitionDuration.current);

            return () => clearTimeout(timer);
        },
        [onClose]
    );

    const handleBackdropClick = useCallback(
        (event: MouseEvent) => {
            const dialog = dialogRef.current;
            if (dialog && event.target === dialog) {
                handleClose(event);
            }
        },
        [handleClose]
    );

    // Handle the initial render
    useEffect(() => {
        const dialog = dialogRef.current;

        const handleNativeClose = (event: Event) => handleClose(event);
        dialog?.addEventListener('cancel', handleNativeClose);
        dialog?.addEventListener('click', handleBackdropClick);

        if (dialog) {
            dialogTransitionDuration.current = parseFloat(
                getComputedStyle(dialog).getPropertyValue('--dialog-transition-duration')
            );
        }

        return () => {
            dialog?.removeEventListener('cancel', handleNativeClose);
            dialog?.removeEventListener('click', handleBackdropClick);
        };
    }, [handleClose, handleBackdropClick]);

    // Handle opening and closing the dialog
    useEffect(() => {
        const dialog = dialogRef.current;

        if (isClosing) {
            return;
        }

        if (isOpen && dialog && !dialog.open) {
            dialog.showModal();
            return;
        }
    }, [isClosing, isOpen]);

    return (
        <dialog ref={dialogRef} id={id} data-testid={id} className={getClassNameFromArray(classes)}>
            <header className={styles.header}>
                <h2 className={styles.title}>Side Panel</h2>

                <button className={styles.closeButton} onClick={handleClose} data-testid="close-button">
                    <img src={closeIcon} width="24" height="24" alt="Close icon" />
                </button>
            </header>

            <div className={styles.content}>{children}</div>

            <footer className={styles.footer}></footer>
        </dialog>
    );
};

export default SidePanel;
