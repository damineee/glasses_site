import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  const { user, signOut } = useAuth();

  // Numele salvat în metadata sau fallback la email
  const username = user?.user_metadata?.username || user?.email;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800">
          Salut, <span className="text-blue-600">{username}</span>!
        </h1>
        <p className="text-gray-500 text-sm mt-2">Te-ai conectat cu succes.</p>

        <button
          onClick={signOut}
          className="mt-6 w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-4 rounded-xl border border-red-200 transition-colors cursor-pointer"
        >
          Aconectare (Sign out)
        </button>
      </div>
    </div>
  );
}
