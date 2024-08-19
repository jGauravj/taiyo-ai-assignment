import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { deleteUser } from "../redux/slices/UserReducer";

type Props = {};

export default function Home({}: Props) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="min-h-full w-full flex flex-col items-center">
      <div className="mt-10">
        <Link to="/create">
          <button className="px-7 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
            Create Contact
          </button>
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center mt-10 text-center">
          <p className="text-lg mb-4">
            No contacts found. Please add a contact.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mt-10 gap-6 px-4 md:px-8 lg:px-32">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 shadow-md rounded-md p-4 w-full max-w-sm md:w-64 flex flex-col items-center"
            >
              <h1 className="text-xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center mt-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    user.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {user.status}
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                <Link to={`/edit/${user.id}`}>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
