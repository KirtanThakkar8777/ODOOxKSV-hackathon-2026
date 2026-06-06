const ExecutiveCard = ({
  title,
  amount,
  subtitle,
  color = "blue",
}) => {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    orange: "bg-orange-600",
    red: "bg-red-600",
  };

  return (
    <div
      className={`
      p-5
      rounded-2xl
      text-white
      ${colors[color]}
      `}
    >
      <p className="opacity-80">
        {title}
      </p>

      <h2
        className="
        text-3xl
        font-bold
        mt-3
        "
      >
        {amount}
      </h2>

      <p className="mt-2 opacity-90">
        {subtitle}
      </p>
    </div>
  );
};

export default ExecutiveCard;