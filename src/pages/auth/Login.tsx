import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import { Building2, GraduationCap, Info, ExternalLink } from 'lucide-react';
import Footer from '../../components/layout/Footer';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [role, setRole] = useState<UserRole>('FACULTY');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password, role);
      navigate(`/${role.toLowerCase()}/dashboard`);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen relative ">

      {/* Info Bar */}

      <div className="bg-[#002147] text-white py-3 px-6 flex items-center justify-between">
        {/* Left: Logo & Institute Name */}
        <div className="flex items-center space-x-4">
          <img src="/manit_sm.png" alt="MANIT Logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-semibold">MANIT BHOPAL</h1>
            <p className="text-xs md:text-sm">Maulana Azad National Institute of Technology</p>
          </div>
        </div>



        {/* Right: Home Icon */}
        <div className="flex items-center space-x-6">
          <a
            href="https://www.manit.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center text-yellow-400 hover:text-blue-200 transition-colors duration-200"
          >
            <span>MANIT</span>
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>

      {/* Center: Tagline */}
      <div className="flex justify-center items-center  bg-[#1F3C5D] md:block text-yellow-400 font-semibold text-sm tracking-wide  py-4  md:text-center">
        Analyze, Automate & Generate
      </div>


      <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-no-repeat bg-center ">

        <div className="container mx-auto px-4 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="w-full max-w-md">


            {/* Login Card */}
            <div className=" bg-white rounded-2xl shadow-3xl p-6 md:p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-6 transform hover:rotate-3 transition-transform duration-300">
                  <img
                    src="/manit_sm.png"
                    alt="MANIT Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/*<h2 className="text-3xl font-bold text-black mb-2 tracking-tight">MANIT Bhopal</h2> */}
                <p className="text-black text-xl font-bold  ">Attendance Management System</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-100 p-4 rounded-lg text-sm text-center animate-shake">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-4 py-3.5 bg-white border border-white rounded-xl text-black placeholder-black/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-blue-200/25"
                  >
                    <option value="FACULTY" style={{ color: "black" }}>Faculty Member</option>
                    <option value="HOD" style={{ color: "black" }}>HOD</option>
                    <option value="DIRECTOR" style={{ color: "black" }}>Director</option>
                  </select>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3.5 bg-white border border-white rounded-xl text-black placeholder-black/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-blue-200/25"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3.5 bg-white border border-white rounded-xl text-black placeholder-black/60 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-blue-200/25"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-[#002147] hover:bg-[#003166] text-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#1F3C5D] transition-all duration-300 disabled:opacity-50 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="text-center mt-4">
                <a
                  href="https://userid.manit.ac.in/"
                  className="text-black hover:text-gray-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="mt-8 p-5 bg-blue-100 rounded-xl border border-white/10 hover:bg-blue-200/25 transition-colors duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <Info size={18} className="text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">Demo Credentials</span>
                </div>
                <div className="space-y-2 text-sm text-blue-400/80">
                  <div className="hover:text-blue-200/25 transition-colors duration-200">Director: director@manit.ac.in</div>
                  <div className="hover:text-blue-200/25 transition-colors duration-200">HOD: hodcse@manit.ac.in</div>
                  <div className="hover:text-blue-200/25 transition-colors duration-200">Faculty: faculty@manit.ac.in</div>
                  <div className="text-xs text-blue-400/60 mt-3 pt-2 border-t border-white/10">
                    Password for all accounts: password123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}