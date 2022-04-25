export const APPLICATION_FORMDATA = "APPLICATION_FORMDATA";

export const business = (data) => (dispatch) => dispatch({
  type: APPLICATION_FORMDATA,
  payload: data,
});
