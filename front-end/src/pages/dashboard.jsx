const Dashboard = () => {
  const name = localStorage.getItem("name") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm">Dashboard</p>
            <h1 className="text-3xl font-semibold">Welcome, {name}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white/80 hover:bg-white/20"
          >
            Logout
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Secure Access", desc: "JWT-based sessions and protected routes." },
            { title: "Fast Login", desc: "Optimized authentication flow." },
            { title: "Modern UI", desc: "Clean design with Tailwind CSS." }
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="mt-2 text-white/70 text-sm">
            You are authenticated and your session is active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
