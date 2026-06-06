const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  name,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
        w-full
        border
        border-slate-300
        rounded-lg
        px-3
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        "
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;