const ActivityCard = ({
  activity,
}) => {
  return (
    <div
      className="
      bg-white
      p-4
      rounded-xl
      border
      border-slate-200
      "
    >
      <h4 className="font-semibold">
        {activity.action}
      </h4>

      <p className="text-slate-500 mt-2">
        {activity.description}
      </p>

      <span
        className="
        text-xs
        text-slate-400
        "
      >
        {activity.createdAt}
      </span>
    </div>
  );
};

export default ActivityCard;