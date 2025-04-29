import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  interests?: string[];
  eventsAttended?: string[];
  eventsCreated?: string[];
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProfile, updateProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer; 