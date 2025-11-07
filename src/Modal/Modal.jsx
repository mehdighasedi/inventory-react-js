function Modal({ isOpenModal, setIsOpenModal, title, children }) {
  if (!isOpenModal) return null; 

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setIsOpenModal(false);
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        id="modal"
        className="relative max-w-2xl w-full mx-4 bg-slate-300/90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 border-r-2 px-3">{title}</h1>
          <button
            onClick={() => setIsOpenModal(false)}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
