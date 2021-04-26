const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const boardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "board/setBoard":
      return { ...state, data: payload };
    case "board/setLoading":
      return { ...state, loading: payload };
    case "board/setError":
      return { ...state, error: payload };
    default:
      return state;
  }
};
