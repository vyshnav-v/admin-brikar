// educationAction.js

export function educationAction(payload) {
  return {
    type: "education",
    payload: payload,
  };
}

export function setEducationData(data) {
  return {
    type: "set-data",
    payload: data,
  };
}

export function setEducationLoading(isLoading) {
  return {
    type: "loading",
    payload: isLoading,
  };
}

export function setEducationError(error) {
  return {
    type: "error",
    payload: error,
  };
}

export function setAddEducationSuccess(responseStatus) {
  return {
    type: "responseStatus",
    payload: responseStatus,
  };
}

export function setAddEducationFail(responseStatus) {
  return {
    type: "responseStatusFail",
    payload: responseStatus,
  };
}
