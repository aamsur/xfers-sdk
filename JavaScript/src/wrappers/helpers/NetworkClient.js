import ApiHelper from './ApiHelper'
import sha1 from 'js-sha1'
import joinUrl from 'proper-url-join'

const LOCAL_DOMAIN = 'http://localhost:3000';
const SANDBOX_DOMAIN = 'https://sandbox.xfers.io';
const PROD_DOMAIN = 'https://www.xfers.io';
const V3_API_NAMESPACE = '/api/v3';

function getBaseURL( isSandbox ) {
  const isNotProduction = process.env.NODE_ENV !== 'production'
  const baseDomain = isNotProduction ? LOCAL_DOMAIN :
                     isSandbox ? SANDBOX_DOMAIN : PROD_DOMAIN;

  return joinUrl(baseDomain, V3_API_NAMESPACE, { trailingSlash: true });
}

export default class Xfers {
  constructor(accessToken, options = {}) {
    if (!accessToken) throw new Error('Please provide a valid access token.');

    this.api = new ApiHelper({
      accessToken,
      appToken: options.appToken,
      secretToken: options.secretToken,
      baseURL: getBaseURL(options.test),
    });
  }

  loginUser(params) {
    const parsedParams = {
      ...params,
      signature: sha1(params.phone_no + this.api.secretToken)
    }
    return this.api.send('POST', 'authorize/signup_login', parsedParams);
  }

  getUserDetails() {
    return this.api.send('GET', 'user');
  }

  updateUser(params) {
    return this.api.send('POST', params);
  }

  getAvailableBanks() {
    return this.api.send('GET', 'banks');
  }

  getUserBanks() {
    return this.api.send('GET', 'user/bank_account');
  }

  addBankAccount(params) {
    return this.api.send('POST', 'user/bank_account', params);
  }

  getTopUpInformation() {
    return this.api.send('GET', 'user/transfer_info');
  }

  /**
    * Create a charge to user from xfers wallet.
    * @see {@link https://docs.xfers.io/#creating-a-charge | API Call}
    * @param {String} amount - [REQUIRED] The charge amount imposed on user.
    * @param {String} currency - [REQUIRED]The currency applied onto the charge amount.
    * @param {String} order_id - [REQUIRED] Unique ref no provided by you to prevent double charging, this cannot be repeated
    * @param {String} redirect - When this is true, instead of the JSON response, Xfers will automatically redirect the request to our checkout page
    * @param {String} notify_url - URL to receive callback notifications on charge success/failure/expiration
    * @param {String} return_url - URL Xfers will redirect customer to on completion of Xfers checkout
    * @param {String} cancel_url - URL Xfers will redirect customer to on cancellation of Xfers checkout
    * @param {String} description - Description of transaction for display purposes
    * @param {String} items - (For display for receipts) A JSON array of item with attributes ‘description, name, price, quantity’, represented in String
    * @param {Object} meta_data - A set of key/value pairs that you can attach to a charge as additional information.
    * @return {Promise} - Return a Promise that, when fulfilled: If a user_api_token is given and the user has insufficient xfers wallet balance,
    * the response will return the transfer_info object containing information about the bank the user should transfer to.
    */
  createCharge() {
    return this.api.send('POST', 'charges', params);
  }
}

// ********************************** APIs ENDPOINTS ********************************* //

// export const BANK_BASE_URL = `${BASE_URL}/user/bank_account`
//
// export const LOGIN_USER_END_POINT = `${BASE_URL}/xfers_mobile/mobile_login`
// export const FORGET_PASSWORD_END_POINT = `${BASE_URL}/xfers_mobile/mobile_send_reset_password_instructions`
// export const USER_INFO_END_POINT = `${BASE_URL}/user`
// export const PAYOUT_END_POINT = `${BASE_URL}/payouts`
// export const TOPUP_END_POINT = `${BASE_URL}/user/topup_request`
// export const TOPUP_LIMIT_END_POINT = `${BASE_URL}/user/topup_limits`
//
// export const FEE_BREAKDOWN_END_POINT =  `${BANK_BASE_URL}/withdrawal_fees`
// export const WITHDRAWAL_LIMITS_END_POINT =  `${BANK_BASE_URL}/withdrawal_limits`
// export const XFERS_TRANSFER_INFO_END_POINT = `${BASE_URL}/user/transfer_info`
//
// export const UPDATE_PROFILE_ENDPOINT = `${BASE_URL}/user/update_profile`;
//
// export const BANK_LIST_END_POINT = `${BASE_URL}/banks`;
// export const VALID_BANK_ACCOUNT_END_POINT =`${BASE_URL}/user/bank_account/validate_bank`
// export const BANK_ACCOUNT_END_POINT = `${BASE_URL}/user/bank_account`
