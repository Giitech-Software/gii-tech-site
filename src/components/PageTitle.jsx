export default function PageTitle({ children }) {
  return (
    <h2 className="text-2xl font-semibold pl-14 lg:pl-0 mb-2">
      {children}
    </h2>
  );
}