import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: "Active" | "Inactive";
}

const userSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { id, firstName, lastName, status } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.status = status;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
