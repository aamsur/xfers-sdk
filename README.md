# Project overview

Xfers SDK provides the functions of User Registration, KYC Verification, Payment, Top-up, Withdrawal, Manage-bank, and Transaction Overview with UI flow for your business. What you need to do is simply call our SDK to trigger the relevant business flow required. The business logic and UI will be handled and managed by Xfers.

## Sign up for an Xfers Merchant account

An Xfers Merchant Account is required in order to integrate the Xfers SDK.

For Singapore Merchants - Sign up for an Xfers Merchant account through [our webpage](https://www.xfers.io/account_registration) and make sure to get an `api_key`.

For Indonesia Merchants - Sign up for an Xfers Merchant account by submitting a request to https://bit.ly/XfersSupport.

## Integrate Xfers Wallet SDK for different platforms

### Prerequisites
Complete backend setup for Xfers Registration Flow, Your backend needs to be able to perform the following through Xfers API:
- Retrieve user's phone number and pass it to Xfers to start registration
- Retrieve OTP inputted by user and send to Xfers to validate

#### SDK - Android
Please refer to our Android SDK Getting Started Guide here by going to [Android folder](./Android).

#### SDK - Web
Please refer to our Web SDK Getting Started Guide here by going to [JavaScript folder](./JavaScript).

## Contributing to our SDK
Please refer to our [SDK development notes here](https://github.com/Xfers/xfers-sdk/wiki)
