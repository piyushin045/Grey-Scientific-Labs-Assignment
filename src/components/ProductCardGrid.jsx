import { Edit2, Trash2 } from "lucide-react";

const ProductCardGrid = ({ products, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {products.map((p) => (
      <div
        key={p.id}
        className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-2"
      >
        <h3 className="text-xl font-bold">{p.name}</h3>
        <p className="text-blue-600 font-bold">₹{p.price}</p>
        <p className="text-gray-600">{p.category}</p>

        <div className="flex gap-3 mt-3">
          {/* EDIT */}
          <button
            onClick={() => onEdit(p)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={18} />
          </button>

          {/* DELETE */}
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this product?")) {
                onDelete(p.id);
              }
            }}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ProductCardGrid;
