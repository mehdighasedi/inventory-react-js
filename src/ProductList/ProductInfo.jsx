function ProductInfo({ product }) {
  return (
    <div className="space-y-4 p-4 rounded-xl shadow-md bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <p className="font-bold text-secondary-700 dark:text-secondary-300">نام محصول :</p>
        <span>{product.title}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold text-secondary-700 dark:text-secondary-300">تاریخ ایجاد محصول :</p>
        <span>{new Date(product.createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold text-secondary-700 dark:text-secondary-300">دسته بندی محصول :</p>
        <span>{product.category.title}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold text-secondary-700 dark:text-secondary-300">تعداد محصول :</p>
        <span>{product.quantity}</span>
      </div>
    </div>
  );
}

export default ProductInfo;
