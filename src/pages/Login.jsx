import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, LockKeyhole } from "lucide-react";
import { login } from "../services/userService";
import { loginUser } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      loginUser(user);

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center bg-[#1F2340] text-white p-12">
          <h1 className="text-5xl font-bold mb-6">
            ShopEase
          </h1>

          <p className="text-lg leading-8 text-gray-300">
            Discover premium fashion, electronics and lifestyle products
            with a seamless shopping experience.
          </p>

          <div className="mt-12">
            <div className="w-32 h-1 rounded-full bg-[#7C8CF8]" />
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-14">

          <h2 className="flex items-center gap-3 text-4xl font-bold text-[#1F2340]">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to continue shopping.
          </p>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4 focus-within:ring-2 focus-within:ring-[#7C8CF8] transition">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 focus-within:ring-2 focus-within:ring-[#7C8CF8] transition">
                <LockKeyhole size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="text-[#7C8CF8] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F2340] hover:bg-[#15192f] text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#7C8CF8] font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;