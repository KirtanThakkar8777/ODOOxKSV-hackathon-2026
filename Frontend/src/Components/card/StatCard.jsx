import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  growth,
  icon,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-5
      shadow-sm
      border
      border-slate-200
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3
            className="
            text-3xl
            font-bold
            mt-2
            "
          >
            {value}
          </h3>

          <div
            className="
            flex
            items-center
            gap-1
            mt-3
            text-green-600
            "
          >
            <TrendingUp size={16} />

            <span className="text-sm">
              {growth}
            </span>
          </div>
        </div>

        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-blue-50
          flex
          items-center
          justify-center
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;