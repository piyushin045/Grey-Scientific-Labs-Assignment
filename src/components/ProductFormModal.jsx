import { useState } from "react";
import { X } from "lucide-react";

const getInitialFormData = (editingProduct) =>
  editingProduct
    ? {
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        stock: editingProduct.stock.toString(),
        description: editingProduct.description || "",
      }
    : {
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      };

const ProductFormModal = ({
  setProducts,
  editingProduct,
  setEditingProduct,
  close,
}) => {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingProduct)
  );
  const [errors, setErrors] = useState({});

  /* ---------- Validation ---------- */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.category.trim())
      newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    if (!validate()) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock) || 0,
              }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
        },
      ]);
    }

    handleClose();
  };

  /* ---------- Reset ---------- */
  const handleClose = () => {
    setFormData(getInitialFormData(null));
    setErrors({});
    setEditingProduct(null);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={handleClose}>
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-3 py-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className={`w-full px-3 py-2 border rounded ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full px-3 py-2 border rounded ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {editingProduct ? "Update" : "Add"} Product
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
