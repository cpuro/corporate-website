import TitlePrincipal from '../components/TitlePrincipal';
import { useInView } from 'react-intersection-observer';
import FileText from '../assets/icons/file-text.svg?react';
import TaxDocumentItem from './TaxDocumentItem';

const ListTaxRegimen = ({ title, items = [] }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const titleId = 'listado-documentos-tributarios';

  return (
    <section
      className="py-4 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden w-full"
      aria-labelledby={titleId}
    >
      <div className="relative z-10 max-w-7xl mx-auto bg-white border-4 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl border-[#3E4095]">
        <TitlePrincipal
          id={titleId}
          title={title}
          Icon={FileText}
        />

        <ul
          ref={ref}
          className="space-y-6 max-w-4xl mx-auto px-2 sm:px-4"
        >
          {items.length > 0 ? (
            items.map((item) => (
              <TaxDocumentItem
                key={item.id}
                item={item}
                inView={inView}
              />
            ))
          ) : (
            <li className="text-sm text-gray-500">
              No hay documentos disponibles.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default ListTaxRegimen;
