import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.7, y: "-10%" },
  visible: { opacity: 1, scale: 1, y: "0" },
  exit: { opacity: 0, scale: 0.7, y: "-10%" }
};

const ConfirmDelete = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl border border-purple-200 max-w-sm w-[80%]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-[1.2rem] font-bold text-purple-900/80 mb-2">{title}</h2>
            <p className="text-[0.9rem] text-purple-900/70 my-5">{message}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onConfirm}
                className="bg-red-50 cursor-pointer hover:bg-rose-100 hover:shadow-md text-red-400 border border-red-400 px-4 py-2 rounded-xl transition"
              >
                {confirmText}
              </button>
              <button
                onClick={onClose}
                className="bg-white cursor-pointer hover:shadow-md border border-purple-900 text-purple-900 hover:bg-purple-100 px-4 py-2 rounded-xl transition"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDelete;
