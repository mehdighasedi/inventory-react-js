import { useState } from "react";
import { HiInformationCircle, HiPencil, HiTrash } from "react-icons/hi";
import Modal from "../Modal/Modal";
import ProductInfo from "./ProductInfo";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import TextField from "../ui/TextField";
import RHFSelect from "../ui/RHFSelect";

function ProductItems({ filteredProducts, onUpdate, onDelete, category }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { register, handleSubmit, formState: errors, setValue } = useForm();

  const handleShowInfo = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleEditProducts = (product) => {
    setEditingProduct(product);
    setOpenEditModal(true);

    setValue("productTitle", product.title);
    setValue("productQuantity", product.quantity);
    setValue("productDesc", product.description);
    setValue("category", product.category.id);
  };

  const handleSaveEdit = (data) => {
    const selectedCategory = category.find((cat) => cat.id === Number(data.category));

    const updatedProducts = {
      ...editingProduct,
      title: data.productTitle,
      quantity: data.productQuantity,
      category: selectedCategory,
      description: data.productDesc,
    };

    toast.success("ویرایش محصول با موفقیت انجام شد");
    onUpdate(updatedProducts);
    setOpenEditModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="flex flex-col sm:flex-col md:flex-row sm:items-center justify-between bg-secondary-50 dark:bg-secondary-800 rounded-xl p-3 transition-colors duration-300 gap-2 sm:gap-4"
        >
          <span className="text-secondary-900 dark:text-secondary-50 font-medium flex-1">
            {product.title}
          </span>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2 mt-2 sm:mt-0">
            <span className="text-secondary-600 dark:text-secondary-300 text-sm">
              {new Date(product.createdAt).toLocaleDateString("fa-IR")}
            </span>
            <span className="text-secondary-500 dark:text-secondary-400 text-sm border border-secondary-400 dark:border-secondary-500 px-2 py-0.5 rounded-2xl">
              {product.category.title}
            </span>
            <span className="flex items-center justify-center bg-secondary-300 dark:bg-secondary-600 text-secondary-900 dark:text-secondary-50 border-2 border-secondary-400 dark:border-secondary-500 w-7 h-7 rounded-full p-2">
              {product.quantity}
            </span>

            <button
              onClick={() => onDelete(product.id)}
              className="flex items-center gap-1 border-2 border-red-400 text-red-400 px-2 py-0.5 rounded-2xl hover:bg-red-400 hover:text-secondary-50 transition-colors duration-200"
            >
              <HiTrash /> حذف
            </button>

            <button
              onClick={() => handleEditProducts(product)}
              className="flex items-center gap-1 border-2 border-yellow-400 text-yellow-400 px-2 py-0.5 rounded-2xl hover:bg-yellow-400 hover:text-secondary-50 transition-colors duration-200"
            >
              <HiPencil /> ویرایش
            </button>

            <button
              onClick={() => handleShowInfo(product)}
              className="flex items-center gap-1 border-2 border-primary-900 text-primary-900 px-2 py-0.5 rounded-2xl hover:bg-primary-500 hover:text-secondary-50 transition-colors duration-200"
            >
              <HiInformationCircle /> اطلاعات
            </button>
          </div>

          {selectedProduct && (
            <Modal
              isOpenModal={openModal}
              setIsOpenModal={setOpenModal}
              title={`اطلاعات مربوط به ${selectedProduct.title}`}
            >
              <ProductInfo product={selectedProduct} />
            </Modal>
          )}
        </div>
      ))}

      {editingProduct && (
        <Modal
          title={`ویرایش ${editingProduct.title}`}
          isOpenModal={openEditModal}
          setIsOpenModal={setOpenEditModal}
        >
          <form
            className="bg-secondary-100 dark:bg-secondary-700 p-4 rounded-xl w-full sm:w-screen-sm flex flex-col gap-y-4 transition-colors duration-300"
            onSubmit={handleSubmit(handleSaveEdit)}
          >
            <TextField
              required
              name="productTitle"
              label="عنوان محصول"
              register={register}
              AddationalCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-50 text-right"
              validationSchema={{ required: "عنوان محصول ضروری است" }}
              errors={errors}
            />
            <TextField
              required
              name="productQuantity"
              label="تعداد محصول"
              type="number"
              register={register}
              AddationalCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-50 text-right"
              validationSchema={{ required: "تعداد محصول ضروری است" }}
              errors={errors}
            />
            <TextField
              required
              name="productDesc"
              label="توضیحات محصول"
              register={register}
              AddationalCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-50 text-right"
              validationSchema={{ required: "توضیحات محصول ضروری است" }}
              errors={errors}
            />
            <RHFSelect
              label="دسته بندی"
              register={register}
              required
              name="category"
              options={category}
              additonalLabelCls="block text-lg mb-1 font-bold text-secondary-900 dark:text-secondary-50 text-right"
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mt-2">
              <button
                type="button"
                onClick={() => setOpenEditModal(false)}
                className="flex-1 btn btn--secondary"
              >
                لغو
              </button>
              <button type="submit" className="flex-1 btn btn--primary">
                ویرایش محصول
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ProductItems;
