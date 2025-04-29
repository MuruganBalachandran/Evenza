import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string[];
  creator: string;
}

interface EventState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      state.error = null;
    },
    setCurrentEvent: (state, action: PayloadAction<Event | null>) => {
      state.currentEvent = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(event => event._id === action.payload._id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setEvents,
  setCurrentEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  setLoading,
  setError,
} = eventSlice.actions;
export default eventSlice.reducer; 