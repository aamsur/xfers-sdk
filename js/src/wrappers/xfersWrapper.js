import ApiHelper from './apiHelper'
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

  updateUser(params) {
    return this.api.send('POST', params);
  }

  getAvailableBanks() {
    return this.api.send('GET', 'banks');
  }

  getUserBanks() {
    return this.api.send('GET', 'banks');
  }

  getTopUpInformation() {
    return this.api.send('GET', 'user/transfer_info');
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
