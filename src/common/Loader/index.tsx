import Logo from '/icons/new_icon.svg'; // <- update path to your logo

const Loader = ({
  title = 'TrueTeam Solutions',
  description = 'Please wait a moment.',
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="mb-6 flex flex-col items-center">
        <img src={Logo} alt="Logo" className="h-20 w-20 object-contain mb-2" />
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Loader */}
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#318134] border-t-transparent"></div>
    </div>
  );
};

export default Loader;
