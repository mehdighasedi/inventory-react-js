import React, { useState } from "react";
import TextField from "../ui/TextField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCategory } from "../Context/CategoryContext";
import Modal from "../Modal/Modal";
import Table from "./CategoryTable";
import { useProducts } from "../Context/ProductContext";

function AddNewCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setIsOpenModal] = useState(false);
  const { category, dispatch } = useCategory();
  const { dispatch: productDispatch } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { categoryTitle: title, categoryDesc: description } = data;

    const newCategory = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    if (newCategory) toast.success("دسته بندی با موفقیت ایجاد شد");
    dispatch({ type: "ADD_CATEGORY", payload: newCategory });
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_CATEGORY", payload: id });
  };

  const handleEdit = (updatedCategory) => {
    dispatch({ type: "UPDATE_CATEGORY", payload: updatedCategory });

    productDispatch({ type: "UPDATE_PRODUCT_CATEGORY", payload: updatedCategory });
  };

  return (
    <div>
      <div className="mb-6">
        {isOpen && (
          <div>
            <h2 className="text-secondary-300 font-bold text-xl mb-3 border-r-2 px-3">
              اضافه کردن دسته بندی جدید
            </h2>
            <form
              className="bg-secondary-700 p-4 rounded-xl w-screen-sm flex flex-col gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <TextField
                  required
                  name="categoryTitle"
                  label="عنوان دسته بندی"
                  register={register}
                  AddationalCls="block text-lg mb-1 font-bold text-slate-300 text-right"
                  validationSchema={{
                    required: "عنوان دسته بندی ضروری است",
                  }}
                  errors={errors}
                />
              </div>
              <div>
                <TextField
                  required
                  name="categoryDesc"
                  label="توضیحات دسته بندی"
                  register={register}
                  AddationalCls="block text-lg mb-1 font-bold text-slate-300 text-right"
                  validationSchema={{
                    required: "توضیحات دسته بندی ضروری است",
                  }}
                  errors={errors}
                />
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <button onClick={() => setIsOpen(false)} className="btn btn--secondary flex-1">
                  لغو
                </button>
                <button type="submit" className="btn btn--primary flex-1">
                  اضافه کردن
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div>
        {!isOpen && (
          <button onClick={() => setIsOpen((is) => !is)} className="btn btn--secondary mb-6 ml-4">
            دسته بندی جدید
          </button>
        )}
        {!isOpen && (
          <button onClick={() => setIsOpenModal(true)} className="btn btn--secondary mb-6">
            مدیریت دسته بندی ها
          </button>
        )}
        <Modal title="مدیریت دسته بندی ها" isOpenModal={openModal} setIsOpenModal={setIsOpenModal}>
          <Table
            categories={category}
            key={category.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Modal>
      </div>
    </div>
  );
}

export default AddNewCategory;
