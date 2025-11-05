import { useForm } from "react-hook-form";
import TextField from "../ui/TextField";
import Sort from "./Sort";
import ProductItems from "./ProductItems";

function ProductList() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <h2 className="text-secondary-400 font-bold text-xl mb-2">لیست محصولات</h2>

      <div className="flex items-center justify-between py-2 px-4">
        <label htmlFor="search-input" className="text-slate-500 font-bold">
          جستجو
        </label>
        <TextField register={register} label="" name="search" />
      </div>

      <Sort />
      <div className="border-b mb-8"></div>
      <ProductItems />
    </div>
  );
}

export default ProductList;
