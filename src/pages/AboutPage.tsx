import { Helmet } from 'react-helmet-async';
import { useTranslations } from '../translations/TranslationContext';

const NotFoundPage = () => {
    const { translations } = useTranslations();
    return (
        <>
            <Helmet>
                <title>{translations.aboutPageMetaTitle}</title>
                <meta name="description" content={translations.aboutPageMetaDescription} />

                <meta property="og:title" content={translations.aboutPageMetaTitle} />
                <meta property="og:description" content={translations.aboutPageMetaDescription} />
                <meta property="og:image" content="/logo.png" />
            </Helmet>

            <div>
                <h1>{translations.aboutPageTitle}</h1>
                <h2>{translations.aboutPageSubTitle}</h2>
                <p>{translations.aboutPageParagraph}</p>
                <p>{translations.aboutPageParagraph2}</p>
            </div>
        </>
    );
};

export default NotFoundPage;
