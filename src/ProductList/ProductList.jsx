import Sort from "./Sort";
import ProductItems from "./ProductItems";
import { useCategory } from "../Context/CategoryContext";
import { useProducts } from "../Context/ProductContext";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

function ProductList() {
  const { products, dispatch } = useProducts();
  const { category } = useCategory();

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleDeleteProduct = (id) => {
    dispatch({ type: "REMOVE_PRODUCTS", payload: id });
    toast.success("محصول با موفقیت حذف شد");
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch({ type: "UPDATE_PRODUCTS", payload: updatedProduct });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (selectedCategory !== "all") {
      const selectedCat = category.find((c) => String(c.id) === String(selectedCategory));
      const selectedCatTitle = selectedCat?.title?.trim();

      if (selectedCatTitle) {
        result = result.filter((p) => p.category?.trim() === selectedCatTitle);
      }
    }

    switch (sortOption) {
      case "latest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "quantity":
        result.sort((a, b) => Number(b.quantity) - Number(a.quantity));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, sortOption, selectedCategory, category]);

  return (
    <div>
      <h3 className="mb-2 p-2 text-secondary-0 border-r-2">فیلترها</h3>

      <div className="flex items-center justify-between py-2 px-4">
        <label htmlFor="search-input" className="text-secondary-0">
          جستجو
        </label>
        <input
          id="search-input"
          type="text"
          className="textField__input w-1/2"
          placeholder="جستجو..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Sort
        category={category}
        sortOption={sortOption}
        selectedCategory={selectedCategory}
        onSortChange={setSortOption}
        onCategoryChange={setSelectedCategory}
      />

      <div className="border-b mb-8 pb-4 text-secondary-400 font-bold">لیست محصولات</div>

      <ProductItems
        filteredProducts={filteredProducts}
        onDelete={handleDeleteProduct}
        onUpdate={handleUpdateProduct}
        category={category}
      />
    </div>
  );
}

export default ProductList;
