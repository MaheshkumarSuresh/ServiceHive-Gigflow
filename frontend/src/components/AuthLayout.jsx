export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-1">{title}</h1>
        <p className="text-sm text-gray-500 text-center mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
