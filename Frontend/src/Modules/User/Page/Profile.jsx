import useUserStore from "../store/userStore";
import UserCard from "../components/UserCard";

const Profile = () => {
  const { user } =
    useUserStore();

  return (
    <div className="max-w-xl">
      <UserCard user={user} />
    </div>
  );
};

export default Profile;