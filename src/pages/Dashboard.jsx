import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <img src="/logo.png" alt="Client Dashboard" className="w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {auth.currentUser?.email}
      </h1>
      <p className="text-gray-400 mb-6 text-center">
        This is your client dashboard. Manage your client list, view details,
        and organize your business all in one place.
      </p>

      <div className="flex space-x-4 mb-10">
        <Link
          to="/clients"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
        >
          Manage Clients
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
        >
          Log Out
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-left shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Client Summary</h2>
        <p className="text-gray-300 text-sm">
          You can add, delete, and manage all your clients in the system. This
          is great for freelancers, agencies, and small business owners who want
          to stay organized.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
