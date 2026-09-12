import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-500 py-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white text-4xl font-bold tracking-tight">
          <Link to="/">LodgeMate.com</Link>
        </span>

        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex bg-white items-center px-3 font-bold text-blue-400 hover:bg-blue-700 hover:text-white"
          >
            Sign In
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Header;
