import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Deep Navy with ML Visualization */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#0B1437] items-center justify-center overflow-hidden">
        {/* Abstract ML Data Visualization */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Animated Data Nodes */}
          <div className="relative w-[600px] h-[600px]">
            {/* Central Hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 rounded-full bg-blue-500/20 border-2 border-blue-400/50 backdrop-blur-sm flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/40 border border-blue-400/70"></div>
            </motion.div>

            {/* Data Points - Animated Nodes */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              const radius = 200;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-full bg-blue-600/30 border border-blue-400/60 backdrop-blur-sm"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500/70"></div>
                  </div>
                </motion.div>
              );
            })}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const radius = 200;
                const x = Math.cos((angle * Math.PI) / 180) * radius + 300;
                const y = Math.sin((angle * Math.PI) / 180) * radius + 300;

                return (
                  <motion.line
                    key={i}
                    x1="300"
                    y1="300"
                    x2={x}
                    y2={y}
                    stroke="rgba(96, 165, 250, 0.3)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </svg>

            {/* Floating Data Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-blue-400/60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Branding */}
          <div className="absolute bottom-12 left-12">
            <h1 className="text-4xl font-bold text-white mb-2">Typing Coach ML</h1>
            <p className="text-blue-300 text-lg">Powered by Machine Learning Intelligence</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 bg-white px-8 sm:px-12 lg:px-20">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#0B1437]">Typing Coach ML</h1>
            <p className="text-gray-600 mt-2">Admin Portal</p>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
            <p className="text-gray-600">Enter your credentials to access the dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input with Floating Label */}
            <div className="relative">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 transition-all pointer-events-none
                    peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2
                    peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                >
                  Admin Email
                </label>
              </div>
            </div>

            {/* Password Input with Floating Label */}
            <div className="relative">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 transition-all pointer-events-none
                    peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2
                    peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Secure Login Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Secure Login
            </button>
          </form>

          {/* Admin Access Notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Admin access is provisioned by the system. Contact IT for support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
