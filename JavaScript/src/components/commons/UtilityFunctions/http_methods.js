import 'whatwg-fetch'

export const getOptions = (options = {}, apiToken) => {
  let defaultOpts = {
    ...options,
    cache: 'default',
    headers: {
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']") && (document.querySelector("meta[name='csrf-token']").getAttribute("content") || ''),
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'same-origin',
  }

  if (apiToken) { defaultOpts.headers['X-XFERS-USER-API-KEY'] = apiToken };
  return defaultOpts;
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 500) {
    return res
  } else {
    throw new Error(res.statusText)
  }
}

//FIXME: Will cause error if render nothing: true
function parseJSON(res) {
  return res.json()
}

export const fetchWithErrorHandling = ({
  endPointUrl,
  fetchOptions,
  onSuccess,
  onError,
  onBreakingError,
}) => {
  if (!onSuccess) { onSuccess = (res) => console.log("Success:", res) }
  if (!onError) { onError = (res) => console.log("Error: ", res) }
  if (!onBreakingError) { onBreakingError = (res) => console.log("Breaking Error: ", res)}
  return (
    fetch(endPointUrl, fetchOptions)
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        if (res.error) { onError(res) }
        else { onSuccess(res) }
      })
      .catch(onBreakingError)
  );
}
