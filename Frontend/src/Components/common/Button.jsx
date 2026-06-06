const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800",
    success:
      "bg-green-600 hover:bg-green-700 text-white",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
      px-4
      py-2
      rounded-lg
      transition
      font-medium
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${variants[variant]}
      ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;