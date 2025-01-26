import React, { useEffect, useState } from "react";
import { changeRole, deleteUser, getAllUsers } from "../api/user";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleChangeRole = async ({ userId, role }) => {
    try {
      const data = await changeRole({ userId, role });
      toast.success(data.message);

      // Update the user's role in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {

        const data = await deleteUser(userId)
        // Call an API function to delete the user (not implemented here)
        toast.success("User deleted successfully!");

        // Remove the user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete the user.");
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl py-12 px-5 mx-auto w-full">
      <h1 className="font-semibold text-3xl mb-5">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.profileImg || "/default-avatar.png"}
                            alt="user"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.fullName}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      className="select select-success"
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRole({
                          userId: user._id,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
