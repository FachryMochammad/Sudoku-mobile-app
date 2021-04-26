export const setBoard = (payload) => {
  return { type: "board/setBoard", payload };
};

export const setLoading = (payload) => {
  return { type: "board/setLoading", payload };
};

export const setError = (payload) => {
  return { type: "board/setError", payload };
};

export const setBoardAsync = (url) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBoard(data.board));
      })
      .catch((err) => dispatch(setError(err)))
      .finally((_) => dispatch(setLoading(false)));
  };
};
