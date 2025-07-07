import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
      <h1 className="text-xl font-bold flex items-center space-x-2">
        <img src="/logo.png" alt="Client Dashboard" className="h-10 w-10" />
        <span>Client Dashboard</span>
      </h1>

      <div className="flex flex-wrap gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm hidden sm:inline">
              Welcome, {user.email}
            </span>
            <Link
              to="/dashboard"
              className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            >
              Dashboard
            </Link>
            <Link
              to="/clients"
              className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            >
              Client Manager
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
