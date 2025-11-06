import React, { useState } from "react";
import TextField from "../ui/TextField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCategory } from "../Context/CategoryContext";

function AddNewCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const { category, dispatch } = useCategory();

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

  return (
    <div>
      <div className="mb-6">
        {isOpen && (
          <div>
            <h2 className="text-secondary-300 font-bold text-xl mb-3">اضافه کردن دسته بندی جدید</h2>
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
      {!isOpen && (
        <button onClick={() => setIsOpen((is) => !is)} className="btn btn--secondary mb-6 ml-4">
          دسته بندی جدید
        </button>
      )}
      {!isOpen && <button className="btn btn--secondary mb-6">مدیریت دسته بندی ها</button>}
    </div>
  );
}

export default AddNewCategory;
