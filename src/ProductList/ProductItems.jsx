import { useState } from "react";
import { HiInformationCircle, HiPencil, HiTrash } from "react-icons/hi";
import Modal from "../Modal/Modal";
import ProductInfo from "./ProductInfo";

function ProductItems({ filteredProducts }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowInfo = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
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
              {product.category}
            </span>
            <span className="flex items-center justify-center bg-slate-500 text-slate-300 text-slate-300 border-2 border-slate-300 w-7 h-7 rounded-full p-2">
              {product.quantity}
            </span>
            <button className="flex items-center justify-center gap-x-2 border-2 border-red-400  text-red-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white">
              <HiTrash /> حذف
            </button>
            <button className="flex items-center justify-center gap-x-2 border-2 border-yellow-400  text-yellow-400 px-2 py-0.5 rounded-2xl hover:text-red-400 transition-colors duration-200 ease-in hover:bg-white">
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
    </div>
  );
}

export default ProductItems;
