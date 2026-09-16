import PhoneIncoming from '../assets/icons/phone-incoming.svg?react';
import MapPin from '../assets/icons/map-pin.svg?react';
import MailCheck from '../assets/icons/mail-check.svg?react';

const FooterContact = () => {
    return (
    <address className="not-italic text-center sm:text-left text-sm space-y-2 text-primary">
        <h2 className="text-base font-semibold mb-4">Ubícanos en:</h2>
        <p className="flex items-center justify-center sm:justify-start gap-2">
        <PhoneIncoming className="text-[#F16139] w-4 h-4" /> 315 675 6556 - 312 403 6429
        </p>
        <p className="flex items-center justify-center sm:justify-start gap-2">
        <MapPin className="text-[#F16139] w-4 h-4" /> Cra 31 #48-29, Barrancabermeja, Santander
        </p>
        <p className="flex items-center justify-center sm:justify-start gap-2">
        <MailCheck className="text-[#F16139] w-4 h-4" />corpasoapaso@hotmail.com
        </p>
        <p className="flex items-center justify-center sm:justify-start">
        <MailCheck className="text-[#F16139] w-4 h-4 mb-2" />contacto@corporacionpasoapaso.com
        </p>
    </address>
    );
};

export default FooterContact;
