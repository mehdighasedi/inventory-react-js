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
    <div>
      {filteredProducts.map((product) => (
        <div key={product.id} className="flex items-center mb-2 justify-between ">
          <span className="text-slate-400 flex-1 ml-3">{product.title}</span>
          <div className="flex items-center gap-x-2">
            <span className="text-slate-300">
              {new Date(product.createdAt).toLocaleDateString("fa-IR")}
            </span>
            <span className="text-slate-400 text-sm border border-slate-400 px-2 py-0.5 rounded-2xl">
              {product.category.title}
            </span>
            <span className="flex items-center justify-center bg-slate-500 text-slate-300 text-slate-300 border-2 border-slate-300 w-7 h-7 rounded-full p-2">
              {product.quantity}
            </span>
            <button
              onClick={() => onDelete(product.id)}
              className="flex items-center justify-center gap-x-2 border-2 border-red-400  text-red-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white"
            >
              <HiTrash /> حذف
            </button>
            <button
              onClick={() => handleEditProducts(product)}
              className="flex items-center justify-center gap-x-2 border-2 border-yellow-400  text-yellow-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white"
            >
              <HiPencil />
              ویرایش
            </button>
            <button
              onClick={() => handleShowInfo(product)}
              className="gap-x-2 border-2 border-yellow-400  text-yellow-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white flex items-center justify-center"
            >
              <HiInformationCircle />
              اطلاعات
            </button>

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
        </div>
      ))}

      {editingProduct && (
        <Modal
          title={`ویرایش ${editingProduct.title}`}
          isOpenModal={openEditModal}
          setIsOpenModal={setOpenEditModal}
        >
          <form
            className="bg-secondary-700 p-4 rounded-xl w-screen-sm flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleSaveEdit)}
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
                value=""
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
              <button onClick={() => setOpenEditModal(false)} className="flex-1 btn btn--secondary">
                لفو
              </button>
              <button className="btn btn--primary flex-1 ">ویراش کردن محصول </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ProductItems;
