import React from "react";

function Modal() {
  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden"
    >
      {/* <!-- Modal Container --> */}
      <div
        id="modal"
        className="relative max-w-md w-full mx-4 bg-slate-300/90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product Title</h1>
        </div>
        {/* <!-- محتوای Modal --> */}
        <input
          type="text"
          id="edit-input"
          name="edit-input"
          placeholder="New Title"
          className="rounded-2xl w-full bg-transparent mb-8 text-slate-800"
        />

        <div className="flex items-start justify-start text-right gap-3">
          <button className="flex-1 transition-all duration-200 ease-linear bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Confirm
          </button>
          <button
            id="cancel-modal"
            className="bg-gray-300 flex-1 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
