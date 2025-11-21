import fondoHeader from '../assets/images/header-background.webp';

import PhoneIncoming from '../assets/icons/phone-incoming.svg?react';
import MailCheck  from '../assets/icons/mail-check.svg?react';
import MapPin  from '../assets/icons/map-pin.svg?react';

export default function Header({ isVisible }) {
return (
    <nav
    className={`fixed top-0 left-0 w-full z-50 bg-white bg-no-repeat bg-cover bg-bottom transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-[36px]'
    } max-h-[36px] overflow-hidden sm:max-h-full`}
    style={{ backgroundImage: `url(${fondoHeader})` }}
    >
    <div className="px-4 sm:px-6 md:px-10 lg:px-40 my-2 font-poppins text-[10px] sm:text-[12px] text-white flex flex-wrap justify-center md:justify-between items-center gap-2 text-center relative z-[60]">
    <span className="flex items-center gap-1  whitespace-nowrap">
       <PhoneIncoming  className="inline-block  w-4 h-4" />
        315 675 6556 - 312 403 6429
    </span>
    <span className="flex items-center gap-1 whitespace-nowrap">
        <MailCheck className="inline-block  w-4 h-4" />
        corpasoapaso@hotmail.com
    </span>
    <span className="flex items-center gap-1  whitespace-nowrap">
        <MailCheck className="inline-block  w-4 h-4" />
        contacto@corporacionpasoapaso.com
    </span>
    <span className="flex items-center gap-1  whitespace-nowrap">
        <MapPin className="inline-block w-4 h-4" />
        Cra 31 #48-29, Barrancabermeja, Santander
    </span>
    </div>
</nav>
);
}
