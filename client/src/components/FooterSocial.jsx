import Facebook from '../assets/icons/facebook.svg?react';

const FooterSocial = () => {
    return (
    <div className="text-center sm:text-left text-sm">
        <h2 className="text-base font-semibold mb-2 text-[#3E4095]">Síguenos</h2>
        <div className="flex justify-center sm:justify-start text-xl">
        <a
            href="https://www.facebook.com/share/15tYgfGiN4/?mibextid=qi2Omg"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mx-4 text-[#3E4095] hover:scale-110 transition-transform"
            aria-label="Facebook"
        >
            <Facebook />
        </a>
        </div>
    </div>
    );
};

export default FooterSocial;
