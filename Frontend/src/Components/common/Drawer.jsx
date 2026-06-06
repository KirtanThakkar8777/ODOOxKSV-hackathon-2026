const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <div
      className={`
      fixed top-0 right-0 h-full w-[450px]
      bg-white shadow-lg z-50
      transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="p-5 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          {title}
        </h2>

        <button onClick={onClose}>×</button>
      </div>

      <div className="p-5 overflow-y-auto h-full">
        {children}
      </div>
    </div>
  );
};

export default Drawer;