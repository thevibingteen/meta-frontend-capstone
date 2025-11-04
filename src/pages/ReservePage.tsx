import { Helmet } from 'react-helmet-async';
import ReservationForm from '../components/ReservationForm';
import { useTranslations } from '../translations/TranslationContext';

const ReservePage = () => {
    const { translations } = useTranslations();

    return (
        <>
            <Helmet>
                <title>{translations.reservePageMetaTitle}</title>
                <meta name="description" content={translations.reservePageMetaDescription} />

                <meta property="og:title" content={translations.reservePageMetaTitle} />
                <meta property="og:description" content={translations.reservePageMetaDescription} />
                <meta property="og:image" content="/logo.png" />
                <meta property="og:url" content="https://little-lemon-capstone-project.io/reserve" />
            </Helmet>
            <div className="container">
                <h1>{translations.reserveATable}</h1>
                <p>{translations.reservePageIntroduction}</p>

                <ReservationForm />
            </div>
        </>
    );
};

export default ReservePage;
