import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../redux/slices/UserReducer";

type Status = "Active" | "Inactive";

type Props = {};

export default function Update({}: Props) {
  const { id } = useParams<{ id: string }>(); 
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingUser = users.find((user) => user.id === Number(id)); 
  const [updateFirstName, SetFirstName] = useState(
    existingUser?.firstName || ""
  );
  const [updateLastName, SetLastName] = useState(existingUser?.lastName || "");
  const [updateStatus, SetStatus] = useState<Status>(
    existingUser?.status || "Active"
  );

  useEffect(() => {
    if (!existingUser) {
      navigate("/"); 
    }
  }, [existingUser, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: Number(id),
        firstName: updateFirstName,
        lastName: updateLastName,
        status: updateStatus,
      })
    );
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-white rounded shadow-lg flex flex-col p-4 gap-4 border">
        <h1 className="text-xl">Update User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-sm">
              First name:
            </label>
            <input
              type="text"
              name="firstname"
              className="border p-2 rounded"
              placeholder="Enter first name"
              value={updateFirstName}
              onChange={(e) => SetFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-sm">
              Last name:
            </label>
            <input
              type="text"
              name="lastname"
              className="border p-2 rounded"
              placeholder="Enter last name"
              value={updateLastName}
              onChange={(e) => SetLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>
              <input
                type="radio"
                value="Active"
                checked={updateStatus === "Active"}
                onChange={(e) => SetStatus(e.target.value as Status)}
                className="mr-2"
              />
              Active
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Inactive"
                checked={updateStatus === "Inactive"}
                onChange={(e) => SetStatus(e.target.value as Status)}
                className="mr-2"
              />
              Inactive
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
