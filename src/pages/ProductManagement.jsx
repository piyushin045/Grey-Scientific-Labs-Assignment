import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductFormModal from "../components/ProductFormModal";
import ProductTable from "../components/ProductTable";
import ProductCardGrid from "../components/ProductCardGrid";
import Pagination from "../components/Pagination";
import ProductData from "../assets/Product.json";

const ITEMS_PER_PAGE = 6;

const ProductManagement = () => {
  // CORRECT: lazy initialization (NO warning)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : ProductData;
  });

  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  /* ---------- SAVE TO LOCAL STORAGE ---------- */
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  /* ---------- Debounce ---------- */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  /* ---------- Filter ---------- */
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  /* ---------- Pagination ---------- */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  /* ---------- RENDER ---------- */
  const handleDeleteProduct = (id) => {
  setProducts((prev) => prev.filter((product) => product.id !== id));
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Header onAdd={() => setShowForm(true)} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "list" ? (
        <ProductTable
          products={paginatedProducts}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
          onDelete={handleDeleteProduct}
        />
      ) : (
        <ProductCardGrid
          products={paginatedProducts}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
          onDelete={handleDeleteProduct}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showForm && (
        <ProductFormModal
          setProducts={setProducts}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          close={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;
