import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
  },
});




export const { notificationChange } = notificationSlice.actions;

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(notificationChange(notification));
        setTimeout(() => {
            dispatch(notificationChange(""));
          }, time * 1000);
    }
}

export default notificationSlice.reducer;
