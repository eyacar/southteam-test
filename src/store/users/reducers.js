import isNumber from "lodash/isNumber";

export const addAmount = (state, action) => {
  if (isNumber(action.payload)) {
    state.userAmount = action.payload;
  }
};

export const filterByGender = (state, action) => {
  state.filterData = state.data.filter(
    ({ gender }) => gender === action.payload
  );
};
