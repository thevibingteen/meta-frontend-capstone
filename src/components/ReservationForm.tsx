import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ReservationForm.module.css';
import Button from './base/button/Button';
import { useTranslations } from '../translations/TranslationContext';
import { ButtonVariant } from './base/button/Button.types';

type ReservationFormValues = {
    date: string;
    time: string;
    diners: string;
    name: string;
    email: string;
    phone: string;
};

const ReservationForm: React.FC = () => {
    const { translations } = useTranslations();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const validationSchema = Yup.object().shape({
        date: Yup.string().required(translations.dateRequired),
        time: Yup.string().required(translations.timeRequired),
        diners: Yup.number()
            .typeError(translations.invalidNumberOfPeople)
            .min(1, translations.invalidNumberOfPeople)
            .required(translations.numberOfPeopleRequired),
        name: Yup.string().required(translations.nameRequired),
        email: Yup.string().email(translations.invalidEmail).required(translations.emailRequired),
        phone: Yup.string().required(translations.phoneRequired),
    });

    const handleSubmit = (_: ReservationFormValues, { resetForm }: { resetForm: () => void }) => {
        setSuccessMessage(translations.reservationSuccess);

        setTimeout(() => {
            setSuccessMessage(null);
            resetForm();
        }, 2000);
    };

    return (
        <Formik<ReservationFormValues>
            initialValues={{
                date: '',
                time: '',
                diners: '',
                name: '',
                email: '',
                phone: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <h2>{translations.reserveATable}</h2>
                    {successMessage && <p className={styles.success}>{successMessage}</p>}

                    <div className={styles.fieldGroup}>
                        <label htmlFor="date">{translations.date}</label>
                        <Field type="date" name="date" id="date" placeholder={translations.datePlaceholder} />
                        <ErrorMessage name="date" component="p" className={styles.error} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="time">{translations.time}</label>
                        <Field as="select" name="time" id="time">
                            <option value="">{translations.selectATime}</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                        </Field>
                        <ErrorMessage name="time" component="p" className={styles.error} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="diners">{translations.numberOfPeople}</label>
                        <Field
                            type="number"
                            name="diners"
                            id="diners"
                            min="1"
                            placeholder={translations.dinersPlaceholder}
                        />
                        <ErrorMessage name="diners" component="p" className={styles.error} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="name">{translations.name}</label>
                        <Field type="text" name="name" id="name" placeholder={translations.namePlaceholder} />
                        <ErrorMessage name="name" component="p" className={styles.error} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="email">{translations.email}</label>
                        <Field type="email" name="email" id="email" placeholder={translations.emailPlaceholder} />
                        <ErrorMessage name="email" component="p" className={styles.error} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="phone">{translations.phone}</label>
                        <Field type="tel" name="phone" id="phone" placeholder={translations.phonePlaceholder} />
                        <ErrorMessage name="phone" component="p" className={styles.error} />
                    </div>

                    <Button
                        type="submit"
                        variant={ButtonVariant.Secondary}
                        label={translations.reserveATable}
                        onClick={() => {}}
                        disabled={isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default ReservationForm;
