import React, { useState } from "react";
import { addUser } from "../redux/slices/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function CreateContact({}: Props) {
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [status, SetStatus] = useState<"Active" | "Inactive">("Active");
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addUser({ id: newId, firstName, lastName, status }));
    navigate("/");
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-white rounded shadow-lg flex flex-col p-4 gap-4 border">
        <h1 className="text-xl">Add New User</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm">
              First name:
            </label>
            <input
              type="text"
              name="firstName"
              className="border p-2 rounded"
              placeholder="enter first name"
              onChange={(e) => SetFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm">
              Last name:
            </label>
            <input
              type="text"
              name="lastname"
              className="border p-2 rounded"
              placeholder="enter last name"
              onChange={(e) => SetLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={status === "Active"}
                onChange={() => SetStatus("Active")}
              />
              Active
            </label>
            <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={status === 'Inactive'}
                  onChange={() => SetStatus('Inactive')}
                />
                Inactive
              </label>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
