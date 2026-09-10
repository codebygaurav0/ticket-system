import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ticket-system-s9eh.onrender.com";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );
  const [message, setMessage] = useState("");
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, registerData);
      setMessage(res.data.message);
      setRegisterData({ name: "", email: "", password: "" });
      setPage("login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("");
      setPage("dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("login");
  };

  if (page === "dashboard") {
    return <Dashboard logout={logout} />;
  }

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center px-4 overflow-hidden select-none">
      {/* 3D Atmospheric Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>

      {/* Floating 3D Support Elements */}
      <div className="absolute top-16 right-20 text-cyan-500/20 text-8xl animate-[spin_30s_linear_infinite] pointer-events-none drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        🎫
      </div>
      <div className="absolute bottom-16 left-20 text-blue-500/20 text-9xl animate-[spin_25s_linear_infinite_reverse] pointer-events-none drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
        ⚡
      </div>

      {/* 3D Glassmorphic Support Card */}
      <div className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.1)] p-8 z-10">
        
        {/* Holographic Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Support Terminal v3D
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-wide uppercase drop-shadow-md">
            Ticket <span className="text-cyan-400">System</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Next-gen customer support desk
          </p>
        </div>

        {page === "login" ? (
          <>
            <h2 className="text-lg font-bold text-slate-200 mb-5 tracking-wide">
              Secure Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all uppercase tracking-wider text-sm"
              >
                Access Portal
              </button>
            </form>

            {message && (
              <p className="bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold p-3 rounded-xl mt-4 text-center">
                {message}
              </p>
            )}

            <button
              onClick={() => { setPage("register"); setMessage(""); }}
              className="w-full mt-6 text-slate-400 hover:text-cyan-400 text-sm transition-colors"
            >
              New account? <span className="underline font-semibold">Register here</span>
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-200 mb-5 tracking-wide">
              Create Account
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all uppercase tracking-wider text-sm"
              >
                Register
              </button>
            </form>

            {message && (
              <p className="bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-semibold p-3 rounded-xl mt-4 text-center">
                {message}
              </p>
            )}

            <button
              onClick={() => { setPage("login"); setMessage(""); }}
              className="w-full mt-6 text-slate-400 hover:text-cyan-400 text-sm transition-colors"
            >
              Already have an account? <span className="underline font-semibold">Login</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard({ logout }) {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.tickets);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to fetch tickets");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const createTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/tickets`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setTitle("");
      setDescription("");
      fetchTickets();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to create ticket");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${API_URL}/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      fetchTickets();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update status");
    }
  };

  // Compute 3D stats
  const totalTickets = tickets.length;
  const openCount = tickets.filter(t => t.status === "open").length;
  const inProgressCount = tickets.filter(t => t.status === "in_progress").length;
  const closedCount = tickets.filter(t => t.status === "closed").length;

  const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = parsedUser.name || "Operator";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* 3D Glass Navbar */}
      <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
            <h1 className="text-xl font-black tracking-wider uppercase text-white">
              Ticket <span className="text-cyan-400">System</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              OPERATOR: <span className="text-cyan-300 font-bold">{userName}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-600/80 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Support Dashboard
          </h2>
          <p className="text-slate-400 mt-1 text-sm font-medium">
            Raise, track, and manage all support requests in real-time
          </p>
        </div>

        {/* 4 3D Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Tickets</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                📋
              </div>
            </div>
            <div className="text-3xl font-black text-white">{totalTickets}</div>
            <div className="mt-2 text-xs text-slate-500 font-medium">All recorded cases</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Open</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                📬
              </div>
            </div>
            <div className="text-3xl font-black text-blue-400">{openCount}</div>
            <div className="mt-2 text-xs text-blue-500/80 font-medium">Awaiting response</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">In Progress</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                ⚡
              </div>
            </div>
            <div className="text-3xl font-black text-amber-400">{inProgressCount}</div>
            <div className="mt-2 text-xs text-amber-500/80 font-medium">Being investigated</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Closed</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                ✅
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-400">{closedCount}</div>
            <div className="mt-2 text-xs text-emerald-500/80 font-medium">Successfully resolved</div>
          </div>

        </div>

        {/* Create Ticket 3D Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 md:p-8 mb-8">
          <h3 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Raise New Support Ticket
          </h3>

          <form onSubmit={createTicket} className="space-y-4">
            <input
              type="text"
              placeholder="Ticket Title (e.g., Database Connection Timeout)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              required
            />

            <textarea
              placeholder="Provide detailed description of your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3.5 min-h-[130px] outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all uppercase tracking-wider text-sm"
            >
              Raise Ticket
            </button>
          </form>
        </div>

        {message && (
          <div className="bg-slate-900 border border-cyan-500/40 text-cyan-300 px-5 py-4 rounded-xl mb-6 text-sm font-mono shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            {message}
          </div>
        )}

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 shadow-sm font-medium">
              No support tickets found. Raise your first ticket above!
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">
                      {ticket.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed pt-1">
                      {ticket.description}
                    </p>
                  </div>

                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 ${
                      ticket.status === "open"
                        ? "bg-blue-950 text-blue-400 border border-blue-800"
                        : ticket.status === "in_progress"
                        ? "bg-amber-950 text-amber-400 border border-amber-800"
                        : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      ticket.status === "open"
                        ? "bg-blue-400"
                        : ticket.status === "in_progress"
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}></span>
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>

                {ticket.status !== "closed" && (
                  <div className="mt-5 pt-4 border-t border-slate-800 flex gap-3">
                    {ticket.status === "open" && (
                      <button
                        onClick={() => updateStatus(ticket._id, "in_progress")}
                        className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-[0_4px_12px_rgba(245,158,11,0.3)] active:scale-95"
                      >
                        Start Progress
                      </button>
                    )}

                    {ticket.status === "in_progress" && (
                      <button
                        onClick={() => updateStatus(ticket._id, "closed")}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] active:scale-95"
                      >
                        Close Ticket
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;