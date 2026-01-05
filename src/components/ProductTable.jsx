import { Edit2, Trash2 } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Stock</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-3">{p.name}</td>
            <td className="p-3">₹{p.price.toFixed(2)}</td>
            <td className="p-3">{p.category}</td>
            <td className="p-3">{p.stock}</td>
            <td className="p-3">{p.description || "-"}</td>

            {/* ACTIONS */}
            <td className="p-3">
              <div className="flex gap-3">
                {/* EDIT */}
                <button
                  onClick={() => onEdit(p)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      onDelete(p.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
