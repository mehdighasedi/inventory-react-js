import TextField from "../ui/TextField";
import { useForm } from "react-hook-form";
import RHFSelect from "../ui/RHFSelect";
import toast from "react-hot-toast";
import { useProducts } from "../Context/ProductContext";
import { useCategory } from "../Context/CategoryContext";

function AddNewProduct() {
  const { products, dispatch } = useProducts();
  const { category } = useCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {
      productTitle: title,
      productQuantity: quantity,
      productDesc: description,
      category: selectedCategoryId,
    } = data;
    const selectedCategory = category.find((cat) => String(cat.id) === String(selectedCategoryId));

    const newProducts = {
      id: Date.now(),
      title,
      quantity,
      description,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_PRODUCTS", payload: newProducts });
    if (newProducts) toast.success("محصول با موفقیت ایجاد شد");
  };

  return (
    <div className="mb-6">
      <h2 className="text-secondary-700 dark:text-secondary-200 font-bold text-xl mb-3 px-3 border-r-2 border-r-secondary-0">
        اضافه کردن محصول جدید
      </h2>
      <form
        className="bg-secondary-100 dark:bg-secondary-700 p-4 rounded-xl w-screen-sm flex flex-col gap-y-4 transition-colors duration-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <TextField
            required
            name="productTitle"
            label="عنوان محصول"
            register={register}
            AddationalCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-100 text-right"
            validationSchema={{ required: "عنوان محصول ضروری است" }}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            required
            name="productQuantity"
            label="تعداد محصول"
            type="number"
            register={register}
            AddationalCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-100 text-right"
            validationSchema={{ required: "تعداد محصول ضروری است" }}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            required
            name="productDesc"
            label="توضیحات محصول"
            register={register}
            AddationalCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-100 text-right"
            validationSchema={{ required: "توضیحات محصول ضروری است" }}
            errors={errors}
          />
        </div>
        <div>
          <RHFSelect
            label="دسته بندی"
            register={register}
            required
            name="category"
            options={category}
            additonalLabelCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-100 text-right"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 btn btn--secondary bg-secondary-300 dark:bg-secondary-600 text-secondary-900 dark:text-secondary-100 hover:bg-secondary-400 dark:hover:bg-secondary-500 transition-colors duration-200"
          >
            لغو
          </button>
          <button
            type="submit"
            className="flex-1 btn btn--primary bg-primary-500 dark:bg-primary-700 text-white hover:bg-primary-600 dark:hover:bg-primary-600 transition-colors duration-200"
          >
            اضافه کردن محصول جدید
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewProduct;
