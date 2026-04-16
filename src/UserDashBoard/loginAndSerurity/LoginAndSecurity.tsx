import { useDeleteUserMutation, useGetProfileQuery } from "@/Redux/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginAndSecurity = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetProfileQuery();
  const [deleteAccount] = useDeleteUserMutation();

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (!confirmDelete) return;

    try {
      await deleteAccount(user?._id!).unwrap();

      toast.success("Account deleted successfully");

      navigate("/auth/login-page");
    } catch (error: any) {
      console.error(error);

      toast.error(error?.data?.message || "Delete failed");
    }
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-7 pb-10 bg-white">
      <h1 className="text-xl sm:text-2xl mb-6">Login & Security</h1>

      <div className="border rounded-lg divide-y">
        {/* Name */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p>Name</p>
            <p>{user?.name || "Not available"}</p>
          </div>
          <Link to="/handle-change-name">
            <button>Edit</button>
          </Link>
        </div>

        {/* Email */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p>Email</p>
            <p>{user?.email || "Not available"}</p>
          </div>
          <Link to="/handle-email-change">
            <button>Edit</button>
          </Link>
        </div>

        {/* Phone */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p>Phone</p>
            <p>{user?.phone || "Not added"}</p>
          </div>
          <Link to="/handle-phone-number">
            <button>{user?.phoneNumber ? "Edit" : "Add"}</button>
          </Link>
        </div>

        {/* Delete */}
        <div className="p-4 flex justify-between items-center">
          <p>Delete Account</p>
          <button onClick={handleDeleteAccount}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSecurity;
