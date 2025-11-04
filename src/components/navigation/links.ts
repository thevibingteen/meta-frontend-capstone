import homeIcon from '../../assets/icons/home.svg';
import aboutIcon from '../../assets/icons/about.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import contactIcon from '../../assets/icons/contact.svg';

export type NavigationItem = {
    label: string;
    href: string;
    icon: string;
};

export type NavigationLinks = NavigationItem[];

const NavigationMenu: NavigationLinks = [
    {
        label: 'Home',
        href: '/',
        icon: homeIcon,
    },
    {
        label: 'Reserve',
        href: '/reserve',
        icon: calendarIcon,
    },
    {
        label: 'About',
        href: '/about',
        icon: aboutIcon,
    },
    {
        label: 'Contact',
        href: '/contact',
        icon: contactIcon,
    },
];

export default NavigationMenu;
