const Footer = () => {
  return (
    <div className="bg-blue-500 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white text-1xl font-bold tracking-tight">LodgeMate.com</span>
        <span className="text-white text-1xl font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer hover:text-blue-300">Privacy Policy</p>
          <p className="cursor-pointer hover:text-blue-300">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
