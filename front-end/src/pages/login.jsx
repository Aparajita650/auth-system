import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Login failed");

			localStorage.setItem("token", data.token);
			localStorage.setItem("name", data.name || "");
			navigate("/");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-white">
			<div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
						<span className="h-2 w-2 rounded-full bg-emerald-400" />
						Secure access · JWT protected
					</div>
					<h1 className="text-4xl font-semibold leading-tight">
						Welcome back to your secure workspace
					</h1>
					<p className="text-white/70">
						Sign in to manage your profile, stay connected, and access your
						dashboard instantly.
					</p>
					<div className="flex items-center gap-4 text-sm text-white/60">
						<div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
							24/7 availability
						</div>
						<div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
							Fast authentication
						</div>
					</div>
				</div>

				<div className="relative">
					<div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-400/30 to-indigo-400/30 blur-2xl" />
					<div className="relative w-full rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
						<h2 className="text-2xl font-semibold">Sign in</h2>
						<p className="mt-1 text-white/70">Use your email and password.</p>

						<form onSubmit={handleSubmit} className="mt-6 space-y-4">
							<div>
								<label className="text-sm text-white/70">Email</label>
								<input
									type="email"
									className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-0 focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/30"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div>
								<label className="text-sm text-white/70">Password</label>
								<input
									type="password"
									className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-0 focus:border-emerald-300/60 focus:ring-2 focus:ring-emerald-300/30"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							{error && (
								<div className="rounded-xl border border-red-400/40 bg-red-500/10 text-red-100 text-sm px-3 py-2">
									{error}
								</div>
							)}

							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-xl bg-emerald-400/90 text-slate-900 py-3 font-semibold hover:bg-emerald-300 disabled:opacity-70"
							>
								{loading ? "Signing in..." : "Sign in"}
							</button>
						</form>

						<p className="text-sm text-white/70 mt-4">
							Don&apos;t have an account?{" "}
							<Link className="text-emerald-200 font-medium" to="/signup">
								Create one
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
