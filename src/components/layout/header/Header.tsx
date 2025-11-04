import { Link } from 'react-router-dom';
import { ButtonVariant } from '../../base/button/Button.types';
import ButtonLink from '../../base/button/ButtonLink';
import DesktopNavigation from '../../navigation/desktop/DesktopNavigation';
import styles from './Header.module.css';
import LanguageSwitcher from '../../LanguageSwitcher';

interface HeaderProps {
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setMobileMenuOpen }) => {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="Little Lemon Logo" width="200" height="55" />
                </Link>

                <DesktopNavigation className={styles.desktopNavigation} />

                <div className={styles.ctaButtons}>
                    <ButtonLink href="/reserve" variant={ButtonVariant.Secondary} label="Reserve a Table" />
                    <LanguageSwitcher />
                </div>

                <button
                    className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.open : ''}`}
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    data-testid="mobile-menu-button"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
