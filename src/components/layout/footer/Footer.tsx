import React from 'react';
import NavigationMenu from '../../navigation/links';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.footerColumns}>
                    <section>
                        <img src="/logo-vertical.png" alt="Little Lemon Logo" width="200" height="352" />
                    </section>

                    <section>
                        <h2>Navigation</h2>
                        <nav>
                            <ul>
                                {NavigationMenu.map((item, index) => {
                                    return (
                                        <li key={item.label + index}>
                                            <NavLink to={item.href}>{item.label}</NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </section>

                    <section>
                        <h2>Contact</h2>

                        <address>
                            <p>1234 Lemon St.</p>
                            <p>Lemon City, LC 12345</p>
                            <p>
                                <a href="tel:+1234567890">123-456-7890</a>
                            </p>
                            <p>
                                <a href="mailto:someone@little-lemon-capstone-project.io">
                                    someone@little-lemon-capstone-project.io
                                </a>
                            </p>
                        </address>
                    </section>
                </div>

                <small>&copy; {year} Little Lemon</small>
            </div>
        </footer>
    );
};

export default Footer;
