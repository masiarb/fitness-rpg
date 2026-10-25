"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

async function logout() {
  await fetch("/api/logout", {
    method: "POST",
  });

  window.location.reload();
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const response = await fetch(
        "/api/me"
      );

      const data =
        await response.json();

      if (data.authenticated) {
        setUser(data);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="p-8">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto text-center p-8">

        <h1 className="text-6xl font-bold text-green-400 mb-6">
          Fitness RPG
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Turn your fitness journey into a game.
          Earn XP, level up, complete quests,
          and build healthy habits.
        </p>

        {user ? (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Welcome {user.name}! 👋
            </h2>

            <p>
              Current Level: {user.level}
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link
                href="/dashboard"
                className="inline-block bg-green-600 hover:bg-green-700 px-6 py-3 rounded"
              >
                Go to Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded"
              >
                  Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded"
            >
              Register
            </Link>

            <Link
              href="/login"
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}