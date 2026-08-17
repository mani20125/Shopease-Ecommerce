import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { registerUser, checkEmailExists } from "../services/userService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const emailExists = await checkEmailExists(formData.email);

      if (emailExists) {
        setError("Email is already registered.");
        return;
      }

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user",
      });

      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
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

          <h2 className="text-4xl font-bold text-[#1F2340] mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Join ShopEase and start your shopping journey.
          </p>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-4 focus-within:ring-2 focus-within:ring-[#7C8CF8] transition">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

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
                <Lock size={18} className="text-gray-400" />

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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="flex items-center border rounded-xl px-4 focus-within:ring-2 focus-within:ring-[#7C8CF8] transition">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  required
                  className="accent-[#7C8CF8]"
                />

                I agree to the{" "}
                <span className="text-[#7C8CF8] cursor-pointer hover:underline">
                  Terms & Conditions
                </span>
              </label>
            </div>


            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1F2340] hover:bg-[#15192f] text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#7C8CF8] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;