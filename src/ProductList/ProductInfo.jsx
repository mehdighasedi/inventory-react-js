
function ProductInfo({ product }) {
  console.log(product);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-bold">نام محصول : </p>
        <span>{product.title}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">تاریخ ایجاد محصول : </p>
        <span>{new Date(product.createdAt).toLocaleDateString("Fa-IR")}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">دسته بندی محصول : </p>
        <span>{product.category}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">تعداد محصول : </p>
        <span>{product.quantity}</span>
      </div>
    </div>
  );
}

export default ProductInfo;
