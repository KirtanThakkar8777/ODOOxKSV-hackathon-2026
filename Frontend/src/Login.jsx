import {
  Lock,
  Cloud,
  Fingerprint,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#020f2a] relative overflow-hidden flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px]" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6">
        <h1 className="text-white font-bold tracking-wider text-lg">
          VAULT
        </h1>
      </div>

      {/* Lock Icon */}
     

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        {/* Badge */}
        <div className="flex justify-center">
          <div className="px-6 py-2 rounded-lg border border-white/10 bg-white/5">
            <span className="text-white font-bold tracking-[3px]">
              VAULT
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-8">
          <h2 className="text-4xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-slate-400 mt-3 text-sm">
            Enter your credentials to access your secure
            workspace.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Password
              </label>

              <button
                type="button"
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500"
            />

            <span className="text-sm text-slate-400">
              Remember this device for 30 days
            </span>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-500 uppercase">
            Or Continue With
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="h-12 border border-white/10 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-white/5 transition">
            <Cloud size={18} />
            Enterprise SSO
          </button>

          <button className="h-12 border border-white/10 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-white/5 transition">
            <Fingerprint size={18} />
            Biometric
          </button>
        </div>

        {/* Signup */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>

      {/* Footer */}
      
    </div>
  );
}