import { useNavigate } from "react-router-dom";

function LoginRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">

        <h2 className="text-2xl font-bold mb-3">
          🔒 Login Required
        </h2>

        <p className="text-gray-600 mb-6">
          Please login to add products to your cart.
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;