import { NavLink } from 'react-router-dom';
import NavigationMenu from '../links';
import styles from './MobileNavigation.module.css';

const MobileNavigation: React.FC = () => {
    return (
        <nav>
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
                                <img
                                    className={styles.icon}
                                    src={item.icon}
                                    alt={`${item.label} icon`}
                                    width="24"
                                    height="24"
                                />
                                {item.label}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default MobileNavigation;
