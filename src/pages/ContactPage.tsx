import { Helmet } from 'react-helmet-async';
import { useTranslations } from '../translations/TranslationContext';
import ButtonLink from '../components/base/button/ButtonLink';
import { ButtonVariant } from '../components/base/button/Button.types';

const NotFoundPage = () => {
    const { translations } = useTranslations();
    return (
        <>
            <Helmet>
                <title>{translations.contactPageMetaTitle}</title>
                <meta name="description" content={translations.contactPageMetaDescription} />

                <meta property="og:title" content={translations.contactPageMetaTitle} />
                <meta property="og:description" content={translations.contactPageMetaDescription} />
                <meta property="og:image" content="/logo.png" />
            </Helmet>

            <div>
                <h1>{translations.contactPageTitle}</h1>
                <p>{translations.contactPageParagraph}</p>

                <ButtonLink href="tel:+1234567890" label={translations.callUs} variant={ButtonVariant.Secondary} />
            </div>
        </>
    );
};

export default NotFoundPage;
