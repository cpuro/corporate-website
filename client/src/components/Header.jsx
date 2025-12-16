// Header.jsx
import fondoHeader from '../assets/images/header-background.webp';

import PhoneIncoming from '../assets/icons/phone-incoming.svg?react';
import MailCheck from '../assets/icons/mail-check.svg?react';
import MapPin from '../assets/icons/map-pin.svg?react';

import HeaderItem from './HeaderItem';

export default function Header({ isVisible }) {
    return (
    <header
        className={`fixed top-0 left-0 w-full z-50 bg-white bg-no-repeat bg-cover bg-bottom
        transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-[36px]'}
        max-h-[36px] overflow-hidden sm:max-h-full`}
        style={{ backgroundImage: `url(${fondoHeader})` }}
        role="banner"
    >
        <address
        className="px-4 sm:px-6 md:px-10 lg:px-40 my-2
            font-poppins text-[10px] sm:text-[12px]
            text-white flex flex-wrap justify-center md:justify-between
            items-center gap-2 text-center not-italic relative z-[60]"
        >
        <HeaderItem icon={PhoneIncoming}>
            <a href="tel:3156756556" className="hover:underline">
            315 675 6556
            </a>
            {' - '}
            <a href="tel:3124036429" className="hover:underline">
            312 403 6429
            </a>
        </HeaderItem>

        <HeaderItem icon={MailCheck}>
            <a href="mailto:corpasoapaso@hotmail.com" className="hover:underline">
            corpasoapaso@hotmail.com
            </a>
        </HeaderItem>

        <HeaderItem icon={MailCheck}>
            <a
            href="mailto:contacto@corporacionpasoapaso.com"
            className="hover:underline"
            >
            contacto@corporacionpasoapaso.com
            </a>
        </HeaderItem>

        <HeaderItem icon={MapPin}>
            Cra 31 #48-29, Barrancabermeja, Santander
        </HeaderItem>
        </address>
    </header>
    );
    }
