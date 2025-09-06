import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DetailModal({ isOpen, onRequestClose, title, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="max-w-2xl mx-auto mt-24 bg-white p-6 rounded shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
      <button
        onClick={onRequestClose}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </Modal>
  );
}

export default DetailModal;
