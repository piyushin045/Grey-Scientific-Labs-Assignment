import { Plus } from "lucide-react";

const Header = ({ onAdd }) => (
  <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-lg shadow-sm">
    <h1 className="text-3xl font-bold">Product Management</h1>
    <button
      onClick={onAdd}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      <Plus size={18} /> Add Product
    </button>
  </div>
);

export default Header;
