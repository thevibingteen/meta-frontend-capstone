import { Link } from 'react-router-dom';
import styles from './Button.module.css';
import { ButtonVariant } from './Button.types';
import { getClassNameFromArray } from '../../../utils/component';

type ButtonLinkProps = {
    label: string;
    href: string;
    target?: React.HTMLAttributeAnchorTarget;
    variant?: ButtonVariant;
    className?: string;
};

const ButtonLink = ({ label, href, target, variant = ButtonVariant.Primary, className }: ButtonLinkProps) => {
    const classes = [styles.button, variant === ButtonVariant.Primary ? '' : styles.buttonSecondary, className];
    const classNames = getClassNameFromArray(classes);

    return (
        <Link
            to={href}
            target={target}
            className={classNames}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
            {label}
        </Link>
    );
};

export default ButtonLink;
