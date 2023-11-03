function educationReducer(
  state = {
    educationData: [],
    educationError: "",
    educationLoading: false,
    addEducationStatus: false,
    addEducationStatusFail: false,
  },
  action
) {
  switch (action.type) {
    case "set-data":
      return {
        ...state,
        educationData: action.payload,
      };
    case "loading":
      return {
        ...state,
        educationLoading: action.payload,
      };
    case "error":
      return {
        ...state,
        educationError: action.payload,
      };
    case "responseStatus":
      return {
        ...state,
        addEducationStatus: action.payload,
      };
    case "responseStatusFail":
      return {
        ...state,
        addEducationStatusFail: action.payload,
      };
    default:
      return state;
  }
}

export default educationReducer;
