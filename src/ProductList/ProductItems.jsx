import React from "react";

function ProductItems() {
  return (
    <div>
      <div class="flex items-center mb-2 justify-between ">
        <span class="text-slate-400 flex-1 ml-3">عنوان محصول</span>
        <div class="flex items-center gap-x-2">
          <span class="text-slate-300">{new Date().toLocaleDateString("fa-IR")}</span>
          <span class="text-slate-400 text-sm border border-slate-400 px-2 py-0.5 rounded-2xl">
            دسته بندی انتخابی
          </span>
          <span class="flex items-center justify-center bg-slate-500 text-slate-300 text-slate-300 border-2 border-slate-300 w-7 h-7 rounded-full p-2">
            3
          </span>
          <button class="delete-product border-2 border-red-400  text-red-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white">
            🗑حذف
          </button>
          <button class="edit-product border-2 border-yellow-400  text-yellow-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white">
            ویرایش ✏
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
