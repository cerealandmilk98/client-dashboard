import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const clientsRef = collection(db, "clients");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    await addDoc(clientsRef, {
      name,
      email,
      owner: auth.currentUser.uid,
    });
    setName("");
    setEmail("");
    fetchClients(); // call after adding
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "clients", id));
    fetchClients(); // call after deletion
  };

  useEffect(() => {
    const fetchClients = async () => {
      const snapshot = await getDocs(clientsRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(data);
    };

    fetchClients(); // call on mount
  }, [clientsRef]); // it's safe to include clientsRef, but [] alone is also fine

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Client Manager</h1>

      <form onSubmit={handleAdd} className="mb-6 space-x-2">
        <input
          type="text"
          placeholder="Name"
          className="p-2 rounded bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </button>
      </form>

      <ul className="space-y-2">
        {clients.map((client) => (
          <li
            key={client.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded"
          >
            <div>
              <p className="font-semibold">{client.name}</p>
              <p className="text-sm text-gray-400">{client.email}</p>
            </div>
            <button
              onClick={() => handleDelete(client.id)}
              className="text-red-400 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
