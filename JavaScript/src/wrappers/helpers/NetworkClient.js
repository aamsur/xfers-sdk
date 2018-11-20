import ApiHelper from './ApiHelper'
import joinUrl from 'proper-url-join'

const LOCAL_DOMAIN = 'http://localhost:3000';
const SG_SANDBOX_DOMAIN = 'https://sandbox.xfers.io';
const ID_SANDBOX_DOMAIN = 'https://sandbox-id.xfers.com/';

const SG_PROD_DOMAIN = 'https://www.xfers.io';
const ID_PROD_DOMAIN = 'https://id.xfers.com/';

const V3_API_NAMESPACE = '/api/v3';

function getBaseURL({ country, test: isSandbox }) {

  let baseDomain;
  const isNotProduction = process.env.NODE_ENV !== 'production'

  if (country == "id") {
    baseDomain = isNotProduction ? LOCAL_DOMAIN :
                 isSandbox ? ID_SANDBOX_DOMAIN : ID_PROD_DOMAIN;
  } else {
    // Default back to Singapore environment
    baseDomain = isNotProduction ? LOCAL_DOMAIN :
                 isSandbox ? SG_SANDBOX_DOMAIN : SG_PROD_DOMAIN;
  }

  return joinUrl(baseDomain, V3_API_NAMESPACE, { trailingSlash: true });
}

export default class Xfers {
  constructor(accessToken, options = {}) {
    if (!accessToken)
      throw new Error('Please provide a valid access token.');

    if ((!options.hasOwnProperty('country')) ||
        (options.country !== "sg" && options.country !== "id"))
      throw new Error('Please specify country in the options: { country: "sg" } or {country: "id" }');

    this.api = new ApiHelper({
      accessToken,
      baseURL: getBaseURL(options),
    });
  }

  /**
    * Retrieve user information for both Indo and Singapore.
    * Eg:
    * available_balance
    * gauth_enabled
    * kyc_verified
    * account_locked
    * multi_bank_account_detected
    * bank_accounts
    * etc....
    */
  getUserDetails() {
    return this.api.send('GET', 'user');
  }

  /**
    * Update user inforamtion for both Indo and Singapore.
    * @see {@link https://docs.xfers.io/#update-account-info | API Call}
    * @param {String} first_name - First name of the Xfers account holder
    * @param {String} last_name - Last name of the Xfers account holder
    * @param {String} email - Email registered with Xfers
    * @param {String} place_of_birth - Date of birth for account holder in ISO8601 format
    * @param {String} country_of_birth - Country of birth for account holder
    * @param {String} address_line_1 - Address line 1 of the user
    * @param {String} address_line_2 - Address line 1 of the user
    * @param {String} city - City of the address
    * @param {String} state - State of the address. In Indo KTP, it's called Provinsi.
    * @param {String} district - District of the address. In Indo KTP, it's called Kecamatan.
    * @param {String} country - Country of the address
    * @param {String} postal_code - Postal Code of the address
    * @param {String} nationality - Nationality
    * @param {String} identity_no	-	Account holder's national identity number or, KTP number of Indonesian.	s841212318g
    * @param {String} id_front_url - URL or base64 data storing the front image of user identity card
    * @param {String} id_back_url - URL or base64 data storing the back image of user identity card
    * @param {String} selfie_2id_url - URL or base64 data storing the selfie of user holding their id card or a second form of id like driving license or passport
    * @param {String} proof_of_address_url - URL or base64 data storing the image/pdf of proof of address document of user like bank statement or telco bill
    * @param {String} gender - Gender eg: ['male', 'female']
    * @param {String} blood_type - Account holder’s blood type, without rhesus. eg: ['A', 'B', 'AB', 'O']
    * @param {String} annual_income -	Annual income of user in the local currency (SGD/IDR)	60000
    * @param {Object} meta_data	- Additional data like Jumio info dump.
    *
    * Indonesia
    *
    * @param {String} mother_maiden_name - [REQUIRED] Name of Mother of the user.
    * @param {String} rt - Account holder’s RT according to his/her KTP. Leading zero is optional. eg: '001'
    * @param {String} rw - Account holder’s RW according to his/her KTP. Leading zero is optional. eg: '005'
    * @param {String} administrative_village - Account holder’s administrative_village address. In KTP, it is called Kelurahan or Desa.
    * @param {String} religion	-	Account holder’s religion according to his/her KTP. eg: ['Islam', 'Katholik', 'Kristen Protestan', 'Hindu', 'Budha', 'Kong Hu Cu', 'Aliran Kepercayaan']
    * @param {String} identity_no	-	Account holder’s marital status according to his/her KTP.	eg: ['Belum Kawin’, 'Kawin’, 'Janda’, 'Duda’]
    * @param {String} identity_no	-	Account holder’s occupation according to his/her KTP. eg: ['Pelajar/Mahasiswa']
    */
  updateUser(params) {
    return this.api.send('PUT', 'user', params);
  }

  /**
    * Retrieve all available bank types for both Indo and Singapore. Eg: DBS, POSB (SG), BCA, BNI (ID)
    */
  getAvailableBanks() {
    return this.api.send('GET', 'banks');
  }

  /**
    * Retrieve all bank accounts added by users for both Indo and Singapore
    */
  getUserBanks() {
    return this.api.send('GET', 'user/bank_account');
  }

  /**
    * Validate bank account information for both Indo and Singapore
    * @param {String} bank - [REQUIRED] Bank abbreviation. Eg: DBS, POSB (SG), BCA, BNI (ID)
    * @param {String} account_holder_name - [REQUIRED] Name of the bank account holder.
    * @param {String} account_no - [REQUIRED] Bank account number without the slashes/dashes.
    * @param {Object: {fileData, fileName}} bank_account_proof - This field is for uploading bank statement, only required for some Singapore Merchants.
    */
  validateBankAccount(params) {
    return this.api.send('POST', 'user/bank_account/validate_bank', params);
  }

  /**
    * Add a bank account for both Indo and Singapore
    * @param {String} bank - [REQUIRED] Bank abbreviation. Eg: DBS, POSB (SG), BCA, BNI (ID)
    * @param {String} account_holder_name - [REQUIRED] Name of the bank account holder.
    * @param {String} account_no - [REQUIRED] Bank account number without the slashes/dashes.
    * @param {Object: {fileData, fileName}} bank_account_proof - This field is for uploading bank statement, only required for some Singapore Merchants.
    */
  addBankAccount(params) {
    return this.api.send('POST', 'user/bank_account', params);
  }

  /**
    * Delete a bank account for both Indo and Singapore
    * @param {String} bankId - [REQUIRED] Id of the bank to be deleted.
    */
  deleteBankAccount(bankId) {
    return this.api.send('DELETE', 'user/bank_account/' + bankId);
  }

  getWithdrawalFeesBreakdown(amount) {
    return this.api.send('GET', 'user/bank_account/withdrawal_fees?amount=' + amount );
  }

  getWithdrawalLimits() {
    return this.api.send('GET', 'user/bank_account/withdrawal_limits');
  }

  /**
    * Create a withdrawal request for both Indo and Singapore
    * @param {String} bankId - [REQUIRED] Id of the bank to be deleted.
    * @param {String} amount - [REQUIRED] Amount to withdraw
    * @param {Boolean} express - If true, withdrawal will be expedited in express processing, and is default to 'false'.
    */
  createWithdrawalRequest(params) {
    return this.api.send('POST', 'user/bank_account/'+ params.bankId +'/withdraw', params);
  }

  /**
    * Create a charge to user from xfers wallet for Singapore only.
    * @see {@link https://docs.xfers.io/#creating-a-charge | API Call}
    * @param {String} amount - [REQUIRED] The charge amount imposed on user.
    * @param {String} currency - [REQUIRED] The currency applied onto the charge amount.
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
    // TODO: RemittanceWallet Transfer instuctions in xf_bank.rb
    return this.api.send('POST', 'charges', params);
  }

  /**
    * Retrieve the top-up instructions based on user_api_token for both Indo and Singapore
    * Singapore is based on wallets: [RemittanceWallet, DigitalGoodsWallet]
    * No params needed for Singapore
    *
    * Indonesia
    * @param {String} bank - [REQUIRED] Bank the user choose to transfer funds to, takes in bank abbreviation (BCA, UOB, MANDIRI)
    * @param {Boolean} disable_va - If true, does not return a Virtual Account for this intent
    */
  getTopUpInstructions(params) {
    // TODO: RemittanceWallet Transfer instuctions in xf_bank.rb
    return this.api.send('GET', 'user/transfer_info', params);
  }


  // The following are for DigitalGoodsWallet 0 Binance
  createTopUpRequest(params) {
    return this.api.send('POST', 'user/topup_request', params);
  }

  getTopUpLimit() {
    return this.api.send('GET', 'user/topup_limits');
  }
 }
