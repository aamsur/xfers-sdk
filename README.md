# Project overview 

## Android SDK Usage Overview

### Sign up for an Xfers Merchant account

You need to first have an Xfers Merchant account before being able to integrate the Xfers SDK.

If you're from Singapore - Sign up for an Xfers Merchant account through https://www.xfers.io/account_registration and make sure to get an api_key.

If you're from Indonesia - Sign up for an Xfers Merchant account by emailing support@xfers.com.

### Android integration

#### Download Xfers Android SDK

1. In your Android project's `build.gradle`, add the following repository:

```gradle
allprojects {
    repositories {
        ...
        maven { url 'https://dl.bintray.com/xfers/xfers-android' }
    }
}
```
1. In your App project's `build.gradle`, add the following dependency:

```gradle
dependencies {
    ...
    implementation "com.xfers.xfers_sdk:xfers_sdk:0.1.1"
}
```
1. Sync gradle

You have now successfully downloaded and added the Xfers Android SDK to your app.

#### Set up your merchant specific settings

You will need the following in order to successfully integrate with Xfers Android SDK:

1. Merchant name - the name that you prefer to be addressed by through the SDK, for e.g. Xfers.
1. Merchant logo - the logo that you prefer to have displayed when we refer to you through the SDK, for e.g. the Xfers logo.
1. Merchant logo's tint - the tint of your logo that you prefer to have displayed when we refer to you through the SDK, for e.g. the Xfers logo's blue.
1. Merchant's api_base - the base url of your backend server, we will be sending HTTP requests to this server during the authentication phase, see `Backend integration` for more information as to how to set up this backend server.

To set up the above details, in your main activity, add the following code into the `onCreate` method:

```Java
// Put your Base URL here, this is the Base URL that we will call for Connect flow, for e.g.
// https://bright-sunshine-91728.herokuapp.com/
private String merchantApiBase = "<set_your_backend_api_base_here>"

// Put your name here, this is the name that we will use to refer to you in the SDK, for e.g.
// Best Merchant
private String merchantName = "<set_your_name_here>"

// Put your logo source here, this is the image that we will use to refer to you in the SDK, for e.g.
// R.drawable.your_logo
private int merchantLogo = R.drawable.ic_launcher_foreground

// Put your logo tint here, this is the color that we will use to tint your logo in the SDK, for e.g.
// R.color.your_color
private int merchantLogoTint = Color.BLACK

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    Xfers xfers = new Xfers(this); // this here refers to the Context
    
    xfers.config.setSDKConfigurations(Xfers.Country.ID, Xfers.Environment.SANDBOX);
    xfers.config.setMerchantConfigurations(merchantApiBase, merchantName, merchantLogo, merchantLogoTint);
}
```

*** NOTE: It is recommended that you first try to integrate with SANDBOX before trying to integrate with PRODUCTION.

At this point, you are ready to start calling features from the Xfers SDK.

#### Features of Xfers SDK

* When you call any of these methods, we will present a new activity on top of `this` where `this` being the context that you initialised the `Xfers` object with, such as your `MainActivity`.

* Note that some of the flows and UI are still currently under construction and you will see the following UI:

![Xfers Under Construction](https://user-images.githubusercontent.com/6291947/47300198-7c89d100-d64e-11e8-9541-263097340abd.png)

This does not mean that you have integrated the SDK wrongly, in fact, this means that you have integrated the SDK correctly and the feature will be live in a soon-to-be-coming update to the SDK!

##### Flows

* NOTE: The only flow that does not require a `user_api_key` to be supplied to work is the `Xfers Connect Flow`, that is the flow which after being set up, will supply you with a `user_api_key` that can be used to perform interactions between you (the Merchant) and your user (the user). Please refer to the section on `Setting up the Xfers Connect Flow` for more detailed explanation on how to integrate the connect flow and get the user's `user_api_key`.

1. Xfers Connect Flow

This is the flow that you'll integrate with in order to get the user's `user_api_key` in order to initiate the other flows.

```Java
new Xfers(this).flow.startConnectFlow();
```

![Xfers Connect Flow UI](https://user-images.githubusercontent.com/6291947/47300564-5f093700-d64f-11e8-8afa-7050d5fddaba.png)

1. Xfers Topup Flow

This is the flow that you'll call in order to allow the user to topup to their Xfers wallet.

```Java
new Xfers(this).flow.startTopupFlow();
```

![Xfers Topup Flow UI](https://user-images.githubusercontent.com/6291947/47300659-a55e9600-d64f-11e8-90a1-a485dc3443fd.png)

1. Xfers KYC Flow

This is the flow that you'll call in order to allow the user to KYC with Xfers, often having benefits such as higher wallet limits.

```Java
new Xfers(this).flow.startKYCFlow();
```

![Xfers KYC Flow UI](https://user-images.githubusercontent.com/6291947/47300703-bc9d8380-d64f-11e8-909a-a53010dc40db.png)

1. Xfers Manage Banks Flow

This is the flow that you'll call in order to allow the user to manage their bank accounts with Xfers, such as adding / deleting the bank accounts or modifying details.

```Java
new Xfers(this).flow.startManageBanksFlow();
```

![Xfers Manage Banks Flow UI](https://user-images.githubusercontent.com/6291947/47300750-d76ff800-d64f-11e8-96ca-1c6a91c96d07.png)

1. Xfers Withdrawal Flow

This is the flow that you'll call in order to allow the user to withdraw from their Xfers wallet to their bank account(s).

```Java
new Xfers(this).flow.startWithdrawalFlow();
```

![Xfers Withdrawal Flow UI](https://user-images.githubusercontent.com/6291947/47300797-f8384d80-d64f-11e8-94f3-dfe6bb0ef09a.png)

1. Xfers Payment Flow

This is the flow that you'll call with an amount in `BigInteger` in order to allow the user to pay you through their Xfers wallet.

* Note that you can pass in an additional description as the 2nd parameter

```Java
new Xfers(this).flow.startPaymentFlow(new BigInteger("100")); // Note that the BigInteger represents the amount that you wish for the user to pay you
```

![Xfers Payment Flow UI](https://user-images.githubusercontent.com/6291947/47300833-0c7c4a80-d650-11e8-8f05-2ae45ce0424b.png)

##### Misc UI

1. Xfers Menu

This is the UI that you'll call to present the Xfers menu which allows the user to have an overview and details of their connected Xfers account.

```Java
new Xfers(this).ui.startMenuActivity();
```

![Xfers Menu UI](https://user-images.githubusercontent.com/6291947/47300368-dc807780-d64e-11e8-9c7a-9fdc18a96117.png)

1. Xfers Settings

This is the UI that you'll call to present the Xfers settings page which allows the user to modify their Xfers account information such as name, email etc.

```Java
new Xfers(this).ui.startSettingsActivity();
```

![Xfers Settings UI](https://user-images.githubusercontent.com/6291947/47300493-2a957b00-d64f-11e8-874c-b4876eb08220.png)

1. Xfers Transactions Overview

This is the UI that you'll call to present the Xfers transactions overview page which allows the user to see the transactions that they have conducted through Xfers recently with you (the Merchant).

```Java
new Xfers(this).ui.startTransactionsOverviewActivity();
```

![Xfers Transactions Overview UI](https://user-images.githubusercontent.com/6291947/47300403-f28e3800-d64e-11e8-8187-1d5e46df3c8a.png)

### Backend integration

<TBD>
  
### Setting up the Xfers Connect Flow

<TBD>

## Web SDK Usage Overview


## Contributing to our SDK 
Please refer to our [SDK development notes here](https://github.com/Xfers/xfers-sdk/wiki)
