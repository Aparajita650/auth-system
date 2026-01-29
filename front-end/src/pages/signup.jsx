import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/api/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Signup failed");

			navigate("/login");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white">
			<div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
				<div className="order-2 lg:order-1">
					<div className="relative">
						<div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-400/30 to-emerald-400/30 blur-2xl" />
						<div className="relative w-full rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
							<h2 className="text-2xl font-semibold">Create account</h2>
							<p className="mt-1 text-white/70">Join in less than a minute.</p>

							<form onSubmit={handleSubmit} className="mt-6 space-y-4">
								<div>
									<label className="text-sm text-white/70">Name</label>
									<input
										type="text"
										className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-0 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-300/30"
										placeholder="Your name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<div>
									<label className="text-sm text-white/70">Email</label>
									<input
										type="email"
										className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-0 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-300/30"
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
										className="mt-1 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none ring-0 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-300/30"
										placeholder="Minimum 6 characters"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength={6}
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
									className="w-full rounded-xl bg-indigo-300/90 text-slate-950 py-3 font-semibold hover:bg-indigo-200 disabled:opacity-70"
								>
									{loading ? "Creating..." : "Create account"}
								</button>
							</form>

							<p className="text-sm text-white/70 mt-4">
								Already have an account?{" "}
								<Link className="text-indigo-200 font-medium" to="/login">
									Sign in
								</Link>
							</p>
						</div>
					</div>
				</div>

				<div className="order-1 lg:order-2 space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
						<span className="h-2 w-2 rounded-full bg-indigo-400" />
						Simple signup · Instant access
					</div>
					<h1 className="text-4xl font-semibold leading-tight">
						Create your account and start in seconds
					</h1>
					<p className="text-white/70">
						Get a modern, secure login experience with a personalized dashboard
						and fast performance.
					</p>
					<div className="grid grid-cols-2 gap-4 text-sm text-white/70">
						<div className="rounded-xl border border-white/10 bg-white/5 p-4">
							Seamless onboarding
						</div>
						<div className="rounded-xl border border-white/10 bg-white/5 p-4">
							Secure by default
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
