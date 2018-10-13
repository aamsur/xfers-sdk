import isUrl from 'is-url'
import axios from 'axios'
import joinUrl from 'proper-url-join'
import queryString from 'query-string'

export default class ApiHelper {
  constructor({baseURL, accessToken}) {
    if (!isUrl(baseURL)) throw new Error('The base URL provided is not valid');

    this.baseURL = baseURL;
    this.accessToken = accessToken;
  }

  send(method, url, data = {}) {
    let callURL = joinUrl(this.baseURL, url, { trailingSlash: true });
    const accessToken = this.accessToken;
    let body = '';

    if (method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = queryString.stringify(data);
    } else if (Object.keys(data).length && data.constructor === Object) {
      callURL = joinUrl(callURL, { trailingSlash: true, query: data });
    }

    return new Promise((resolve, reject) => {
      axios({ url: callURL, method, data: body, headers: {
        'X-XFERS-USER-API-KEY': '2XWnEcCMufhqxpK6LsEiQVoE1UBPNG3fELCzNvUPhf4',
      }})
      .then((res) => {
        if (res.status >= 400) { // check for 4XX & 5XX
          reject({ status: res.status, message: res.statusText });
        }
        if (res.status >= 200 && res.status <= 202) {
          resolve({ data: res.data, statusText: res.statusText });
        }
        return {}
      });
    });
  }
}

// export const getOptions = (options = {}, apiToken) => {
//   let defaultOpts = {
//     ...options,
//     cache: 'default',
//     headers: {
//       'X-CSRF-Token': document.querySelector("meta[name='csrf-token']") && (document.querySelector("meta[name='csrf-token']").getAttribute("content") || ''),
//       'X-Requested-With': 'XMLHttpRequest',
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     credentials: 'same-origin',
//   }
//
//   if (apiToken) { defaultOpts.headers['X-XFERS-USER-API-KEY'] = apiToken };
//   return defaultOpts;
// }
//
// function checkStatus(res) {
//   if (res.status >= 200 && res.status < 500) {
//     return res
//   } else {
//     throw new Error(res.statusText)
//   }
// }
//
// //FIXME: Will cause error if render nothing: true
// function parseJSON(res) {
//   return res.json()
// }
//
// export const fetchWithErrorHandling = ({
//   endPointUrl,
//   fetchOptions,
//   onSuccess,
//   onError,
//   onBreakingError,
// }) => {
//   if (!onSuccess) { onSuccess = (res) => console.log("Success:", res) }
//   if (!onError) { onError = (res) => console.log("Error: ", res) }
//   if (!onBreakingError) { onBreakingError = (res) => console.log("Breaking Error: ", res)}
//   return (
//     fetch(endPointUrl, fetchOptions)
//       .then(checkStatus)
//       .then(parseJSON)
//       .then((res) => {
//         if (res.error) { onError(res) }
//         else { onSuccess(res) }
//       })
//       .catch(onBreakingError)
//   );
// }
