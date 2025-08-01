import React from "react";

const ConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 transition-all duration-300 ease-in-out bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white transition-all duration-300 ease-in-out p-6 rounded-2xl border border-purple-200 max-w-sm w-[80%]">
        <h2 className="text-[1.2rem] font-bold text-purple-900/80 mb-2">{title}</h2>
        <p className="text-[0.9rem] text-purple-900/70 my-5">{message}</p>
        <div className="flex items-center justify-center gap-3 transition-all duration-300 ease-in-out">
          <button
            onClick={onConfirm}
            className="bg-red-50 transition-all duration-300 cursor-pointer hover:bg-rose-100 hover:shadow-md text-red-400 border border-red-400 px-4 py-2 rounded-xl"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="bg-white transition-all duration-300 cursor-pointer hover:shadow-md border border-purple-900 text-purple-900 hover:bg-purple-100 px-4 py-2 rounded-xl"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
