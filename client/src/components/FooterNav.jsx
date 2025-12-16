import { Link } from "react-router-dom";

const FooterNav = ({ links }) => {
    return (
    <div className="sm:text-left text-sm">
        <h2 className="text-base ml-20 mb-4 font-semibold text-[#3E4095]">Navegación</h2>
        <ul className="ml-20 space-y-2">
        {links.map((link) => (
            <li key={link.to}>
            <Link
                to={link.to}
                className="hover:text-[#F16139] transition-colors text-[#3E4095]"
            >
                {link.label}
            </Link>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default FooterNav;
