import { useState } from "react";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";

function CategoryTable({ categories, onDelete, onEdit }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  if (!categories?.length)
    return <p className="text-center text-secondary-300">هیچ دسته‌بندی‌ای وجود ندارد.</p>;

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
    setNewTitle(cat.title);
    setNewDesc(cat.description);
  };

  const handleConfirmEdit = () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      toast.error("تمامی فیلد ها باید وارد شوند");
      return;
    }
    onEdit({
      ...editingCategory,
      title: newTitle,
      description: newDesc,
    });
    toast.success("ویرایش دسته بندی با موفقیت انجام شد");
    setEditingCategory(null);
  };

  return (
    <>
      <table className="w-full text-right border-collapse rounded-xl overflow-hidden">
        <thead className="bg-secondary-600 text-secondary-0">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">عنوان</th>
            <th className="p-3">توضیحات</th>
            <th className="p-3">تاریخ ایجاد</th>
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody className="bg-secondary-700 text-secondary-200">
          {categories.map((cat, index) => (
            <tr key={cat.id} className="border-b border-secondary-500">
              <td className="p-3 ">{index + 1}</td>
              <td className="p-3">{cat.title}</td>
              <td className="p-3">{cat.description}</td>
              <td className="p-3">{new Date(cat.createdAt).toLocaleDateString("fa-IR")}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEditClick(cat)}
                  className="btn btn--primary text-sm px-3 py-1"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => onDelete(cat.id)}
                  className="btn btn--danger text-sm px-3 py-1"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCategory && (
        <Modal
          isOpenModal={!!editingCategory}
          setIsOpenModal={() => setEditingCategory(null)}
          title="ویرایش دسته بندی"
        >
          <div className="flex flex-col gap-4">
            <label className="text-secondary-0 font-bold text-right">عنوان جدید</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="textField__input"
              placeholder="عنوان دسته بندی"
            />

            <label className="text-secondary-0 font-bold text-right">توضیحات جدید</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="textField__input"
              placeholder="توضیحات دسته بندی"
            />

            <div className="flex justify-between gap-3 mt-4">
              <button onClick={handleConfirmEdit} className="btn btn--primary flex-1">
                ذخیره
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="btn btn--secondary flex-1"
              >
                لغو
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default CategoryTable;
