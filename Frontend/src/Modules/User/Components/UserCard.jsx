const UserCard = ({ user }) => {
  return (
    <div
      className="
      bg-white
      p-5
      rounded-xl
      shadow-sm
      border
      border-slate-200
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
          h-12
          w-12
          rounded-full
          bg-blue-600
          "
        />

        <div>
          <h3 className="font-semibold">
            {user?.name}
          </h3>

          <p className="text-slate-500">
            {user?.email}
          </p>

          <span
            className="
            text-xs
            bg-blue-100
            text-blue-700
            px-2
            py-1
            rounded-full
            "
          >
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;