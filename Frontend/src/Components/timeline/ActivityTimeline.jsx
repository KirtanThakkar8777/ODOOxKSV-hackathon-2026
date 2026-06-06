const ActivityTimeline = ({
  activities = [],
}) => {
  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex gap-4"
        >
          <div
            className="
            h-3
            w-3
            mt-2
            rounded-full
            bg-blue-600
            "
          />

          <div>
            <p className="font-medium">
              {activity.title}
            </p>

            <p className="text-sm text-slate-500">
              {activity.description}
            </p>

            <span className="text-xs text-slate-400">
              {activity.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;