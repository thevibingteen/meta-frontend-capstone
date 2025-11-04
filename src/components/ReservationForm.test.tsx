import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationForm from './ReservationForm';
import { TranslationProvider } from '../translations/TranslationContext';
import enTranslations from '../translations/locales/en.json';

jest.useFakeTimers();

const renderReservationForm = () =>
    render(
        <TranslationProvider translations={enTranslations}>
            <ReservationForm />
        </TranslationProvider>
    );

describe('ReservationForm', () => {
    it('should render the form with all fields and a submit button', () => {
        renderReservationForm();

        expect(screen.getByLabelText(enTranslations.date)).toBeInTheDocument();
        expect(screen.getByLabelText(enTranslations.time)).toBeInTheDocument();
        expect(screen.getByLabelText(enTranslations.numberOfPeople)).toBeInTheDocument();
        expect(screen.getByLabelText(enTranslations.name)).toBeInTheDocument();
        expect(screen.getByLabelText(enTranslations.email)).toBeInTheDocument();
        expect(screen.getByLabelText(enTranslations.phone)).toBeInTheDocument();
        expect(
            screen.getByRole('button', {
                name: enTranslations.reserveATable,
            })
        ).toBeInTheDocument();
    });

    it('should display error messages when required fields are left empty', async () => {
        renderReservationForm();

        fireEvent.click(screen.getByRole('button', { name: enTranslations.reserveATable }));

        await waitFor(() => {
            expect(screen.getByText(enTranslations.dateRequired)).toBeInTheDocument();
            expect(screen.getByText(enTranslations.timeRequired)).toBeInTheDocument();
            expect(screen.getByText(enTranslations.numberOfPeopleRequired)).toBeInTheDocument();
            expect(screen.getByText(enTranslations.nameRequired)).toBeInTheDocument();
            expect(screen.getByText(enTranslations.emailRequired)).toBeInTheDocument();
            expect(screen.getByText(enTranslations.phoneRequired)).toBeInTheDocument();
        });
    });

    it('should submit the form when all fields are filled', async () => {
        renderReservationForm();

        fireEvent.change(screen.getByLabelText(enTranslations.date), {
            target: { value: '2025-01-15' },
        });
        fireEvent.change(screen.getByLabelText(enTranslations.time), {
            target: { value: '18:00' },
        });
        fireEvent.change(screen.getByLabelText(enTranslations.numberOfPeople), {
            target: { value: 2 },
        });
        fireEvent.change(screen.getByLabelText(enTranslations.name), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText(enTranslations.email), {
            target: { value: 'johndoe@example.com' },
        });
        fireEvent.change(screen.getByLabelText(enTranslations.phone), {
            target: { value: '1234567890' },
        });

        fireEvent.click(screen.getByRole('button', { name: enTranslations.reserveATable }));

        await waitFor(() => {
            expect(screen.getByText(enTranslations.reservationSuccess)).toBeInTheDocument();
        });
    });

    it('should not display success message when validation fails', async () => {
        renderReservationForm();

        await act(async () => {
            fireEvent.change(screen.getByLabelText(enTranslations.date), {
                target: { value: '' },
            });

            fireEvent.click(screen.getByRole('button', { name: enTranslations.reserveATable }));
        });

        await waitFor(() => {
            expect(screen.queryByText(enTranslations.reservationSuccess)).not.toBeInTheDocument();
        });

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            expect(screen.queryByText(enTranslations.reservationSuccess)).not.toBeInTheDocument();
            expect(screen.getByLabelText(enTranslations.date)).toHaveValue('');
        });
    });
});
