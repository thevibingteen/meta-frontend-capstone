import NavigationMenu from '../links';
import styles from './DesktopNavigation.module.css';
import { NavLink } from 'react-router-dom';

interface DesktopNavigationProps {
    className?: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ className }) => {
    return (
        <nav className={className}>
            <ul className={styles.list}>
                {NavigationMenu.map((item, index) => {
                    return (
                        <li className={styles.listItem} key={item.label + index}>
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive ? `${styles.active} ${styles.link}` : styles.link;
                                }}
                                to={item.href}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default DesktopNavigation;
