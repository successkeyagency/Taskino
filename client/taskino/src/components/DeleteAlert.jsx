const DeleteAlert = ({ title, description, onConfirm, onClose }) => {
  return (
    <section className="max-w-md mx-auto p-5 bg-white rounded-xl shadow-lg border border-red-200">
      <header className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-red-600">{title}</h2>
        <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </header>

      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

      <footer className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-md"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18M9 6v12a3 3 0 0 0 6 0V6" />
            <path d="M10 11v6M14 11v6M5 6l1-3h12l1 3" />
          </svg>
          Delete
        </button>
      </footer>
    </section>
  );
};

export default DeleteAlert;
