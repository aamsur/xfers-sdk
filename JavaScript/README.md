# Web SDK Usage Overview

## Prerequisites

### 1. Xfers User Access Token

The Xfers user acccess token is a token that is required to initialize our SDK. The SDK relies on this token to communicate with the Xfers backend. 

**Xfers connect** is backend process in which you can obtain an Xfers user access token. If you have not gone through the process in setting up **Xfers Connect**, please refer to the **Backend Integration** guide over [here](https://github.com/Xfers/xfers-sdk/wiki/Backend-requirements-for-SDK) 

## Download and installation of the Xfers Web SDK

Once the setup for **Xfers User Access Token** is complete, proceed to download Xfers Web SDK either through our **Content Delivery Network (CDN)** or **via a npm install**


### 1. Through CDN & <script> Tag

Add the following lines into the corresponding HTML file's `<head></head>` section:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- The following files can also be downloaded from the js folder in this repository -->
<script src="https://cdn.jsdelivr.net/gh/Xfers/xfers-sdk@d1e3719030740a2676f07508175f87584588950d/JavaScript/dist/vendors~xfers.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Xfers/xfers-sdk@d1e3719030740a2676f07508175f87584588950d/JavaScript/dist/xfers.bundle.js"></script>

```

Note that the Xfers Web SDK requires a mounting point on a HTML DOM. Add the following line into the same HTML file `<body></body>` section:

```html
<!-- The ID of the DOM element is to be used to instantiate Web SDK later -->
<!-- Make sure the following line is executed before the instantiation in the next segment -->
<div id="xfers_elements"></div>
```

Next step, initialize the components by adding the following javascript into the same `<body></body>` section. This is required on all the pages that uses the Xfers SDK 

```html
<script type="text/javascript">
  
  // Paste your own Xfers User Access Token here
  const accessToken = 'insert the xfers user access token here upon retrieving it from your server backend'  
  
  /* Instantiation takes in two parameters:
   * 1st param => mountingElementId: 'xfers_elements'
   * 2nd param => accessToken: e.g. - 'YTB7iKVauTzJ8zyk6cJ4ooTOUGJMG-SYDPxFNFTDs4Z'
   * 3rd param => options: {
   *                    country: 'sg' OR 'id' // To specify the country the SDK is used in
   *                    test: true // To specify a sandbox environment
   *               } 
   */
  const xfers = new Xfers("xfers_elements", accessToken, { country: "sg", test: true });
  
</script>
```

Next step, trigger the SDK flows by executing the following command:

```javascript
const paymentFlowParam = { amount: 3000, currency: 'SGD', orderId: 'AZ03283' }
xfers.startPaymentFlow(paymentFlowParam);
```

## Flows Available & Documentations

### Verification
* startVerificationFlow (Coming Soon)

### Transaction
#### 1. startManageBankFlow
```javascript
// Example:
xfers.startManageBankFlow();
```
Manage Bank Flow allows merchant to provide users a way to add, edit and delete bank accounts.
- All users must have a verified bank accounts in order to user Xfers wallets.

#### 2. startPaymentFlow(paymentParamsObject)
```javascript
@param {String} amount - [REQUIRED] The charge amount imposed on user.
@param {String} currency - [REQUIRED]The currency applied onto the charge amount.
@param {String} orderId - [REQUIRED] Unique ref no provided by you to prevent double charging, this cannot be repeated

// Example:
const paymentParamsObject = {
  amount: '3000',
  currency: 'SGD',
  orderId: 'AZ30183'
}
```
Payment Flow allows merchant to create a charge on users' Xfers Wallets.

- If there is enough balance, the flow will deduct the fund from users' Xfers Wallets automatically and move it to Merchants' Xfers Wallets.
- If there isn't enough balance, the flow will guide users on how to top-up Xfers Wallets.
- It will check if transacting users have a verified bank account added. If not, it will guide the user to go through the process of linking a verified bank account. 
- It will check if transacting users are KYC-verified. If verification is required, it will guide the users to go through Verification process.
---
#### 3. startTopUpFlow
```javascript
// Example:
xfers.startTopUpFlow();
```
Top-up Flow allows merchant to provide users a way to credit funds into the Xfers wallet for future use.
- It will provide users a detailed instructions to top-up to Xfers wallet.
- It will check if transacting users have a verified bank account added. If not, it will guide the user to go through the process of linking a verified bank account. 
- It will check if transacting users are KYC-verified. If verification is required, it will guide the users to go through Verification process.

#### 4. startWithdrawalFlow
```javascript
// Example:
xfers.startWithdrawalFlow();
```
Withdrawal Flow allows merchant to provide users a way to withdrawal funds from the Xfers wallet to their verified bank accounts.
- It will check if transacting users have a verified bank account added. If not, it will guide the user to go through the process of linking a verified bank account. 
- It will check if transacting users are KYC-verified. If verification is required, it will guide the users to go through Verification process.

## Example:
https://cl.ly/81869d7de1b4
