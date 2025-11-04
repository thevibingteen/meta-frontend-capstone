import { Helmet } from 'react-helmet-async';
import { useTranslations } from '../translations/TranslationContext';
import ButtonLink from '../components/base/button/ButtonLink';
import { ButtonVariant } from '../components/base/button/Button.types';

const NotFoundPage = () => {
    const { translations } = useTranslations();
    return (
        <>
            <Helmet>
                <title>{translations.notFoundMetaTitle}</title>
                <meta name="description" content={translations.notFoundMetaDescription} />

                <meta property="og:title" content={translations.notFoundMetaTitle} />
                <meta property="og:description" content={translations.notFoundMetaDescription} />
                <meta property="og:image" content="/logo.png" />
            </Helmet>

            <div>
                <h1>{translations.notFoundTitle}</h1>
                <p>{translations.notFoundParagraph}</p>

                <ButtonLink href="/" label={translations.backToHomepage} variant={ButtonVariant.Secondary} />
            </div>
        </>
    );
};

export default NotFoundPage;
