// HeaderItem.jsx
export default function HeaderItem({ icon: Icon, children }) {
  return (
    <span className="flex items-center gap-1 whitespace-nowrap">
      <Icon className="w-4 h-4" aria-hidden="true" />
      {children}
    </span>
  );
}
