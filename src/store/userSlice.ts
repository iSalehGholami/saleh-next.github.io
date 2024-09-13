import { ClaimTypes } from '@/types/claimTypes';
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface UserState {
  user: {
    emailAddress: string | null;
    phoneNumber: string | null;
  };
}

const initialState: UserState = {
  user: {
    emailAddress: null,
    phoneNumber: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('access_token', action.payload);
      state.user = jwtDecode(action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('access_token');
      state.user = initialState.user;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
