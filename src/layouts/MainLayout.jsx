export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFF6DA] dark:bg-gray-700">
      {children}
      <FooterEnd />
    </div>
  );
};