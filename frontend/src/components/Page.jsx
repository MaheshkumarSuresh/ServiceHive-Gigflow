export default function Page({ title, subtitle, children }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-3xl font-bold text-gray-900">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
