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

  // const options = [
  //   {
  //     id: 1,
  //     title: "دسته بندی اول",
  //     desc: "first desc",
  //   },
  //   {
  //     id: 2,
  //     title: "دسته بندی دوم",
  //     desc: "second desc",
  //   },
  //   {
  //     id: 3,
  //     title: "دسته بندی سوم",
  //     desc: "third desc",
  //   },
  //   {
  //     id: 4,
  //     title: "دسته بندی چهارم",
  //     desc: "fourth desc",
  //   },
  // ];

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
      <h2 className="text-secondary-400 font-bold text-xl mb-3 px-3 border-r-2">
        اضافه کردن محصول جدید
      </h2>
      <form
        className="bg-secondary-700 p-4 rounded-xl w-screen-sm flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <TextField
            required
            name="productTitle"
            label="عنوان محصول"
            register={register}
            AddationalCls="block text-lg mb-1 font-bold text-slate-300 text-right"
            validationSchema={{
              required: "عنوان محصول ضروری است",
            }}
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
            AddationalCls="block text-lg mb-1 font-bold text-slate-300 text-right"
            validationSchema={{
              required: "تعداد محصول ضروری است",
            }}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            required
            name="productDesc"
            label="توضیحات محصول"
            register={register}
            AddationalCls="block text-lg mb-1 font-bold text-slate-300 text-right"
            validationSchema={{
              required: "توضیحات محصول ضروری است",
            }}
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
            additonalLabelCls="block text-lg mb-1 font-bold text-slate-300 text-right"
          />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button onClick={() => reset()} className="flex-1 btn btn--secondary">
            لفو
          </button>
          <button className="btn btn--primary flex-1 ">اضافه کردن محصول جدید</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewProduct;
