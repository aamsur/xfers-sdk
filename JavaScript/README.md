# Web SDK Usage Overview

## Pre-requisite

### 1. Xfers User Access Token

Web SDK requires user access token to be instantiated. If you have not gone through the process to setup **Xfers Connect**, please refer to the **Backend Integration** guide in the root, or click [here]https://github.com/Xfers/xfers-sdk)

## Download Xfers Web SDK

Once the setup for **User Access Token** is complete, proceed to download Xfers Web SDK either through **CDN** or **npm install**

### 1. Through CDN & <script> Tag

Add the following lines into the corresponding HTML file `<head></head>` section:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- The following files can also be downloaded from the js folder in this repository -->
<script src="https://cdn.jsdelivr.net/gh/Xfers/xfers-sdk@2b10a00db2cb7d7f1c16705c9c424ab7dfa0b1cc/JavaScript/dist/vendors~xfers.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Xfers/xfers-sdk@2b10a00db2cb7d7f1c16705c9c424ab7dfa0b1cc/JavaScript/dist/xfers.bundle.js"></script>
```

Note that Xfers Web SDK requires a mounting point on a HTML DOM, add the following line into the same HTML file `<body></body>` section:

```html
  <!-- The ID of the DOM element is to be used to instantiate Web SDK later -->
  <!-- Make sure the following line is executed before the instantiation in the next segment -->
  <div id="xfers_elements"></div>
```

Next step, initialize the components by adding the following javascript into the same `<body></body>` section:

```html
<script type="text/javascript">
  
  // Paste your own Xfers User Access Token here
  const accessToken = 'YTB7iKVauTzJ8zyk6cJ4ooTOUGJMG-SYDPxFNFTDs4Z'  
  
  /* Instantiation takes in two parameters:
   * 1st param => mountingElementId: 'xfers_elements'
   * 2nd param => accessToken: e.g. - 'YTB7iKVauTzJ8zyk6cJ4ooTOUGJMG-SYDPxFNFTDs4Z'
   */
  const xfers = new Xfers("xfers_elements", accessToken);
  
  </script>
```

Next step, trigger SDK flows by executing the following command:

```javascript
  const paymentFlowParam = { amount: 3000, currency: 'SGD', orderId: 'AZ03283' }
  xfers.startPaymentFlow(paymentFlowParam);
```

### 2. Through npm, import/export

Install the package through npm or yarn:

```
npm install @xfers/xfers-js-sdk
```

Then import the Xfers UI Elements into your code:
```javascript
import { Xfers } from '@xfers/xfers-js-sdk'
```

## Flows Available

### Verification
* startVerificationFlow (Coming Soon)

### Transaction
* startPaymentFlow
* startTopUpFlow (Coming Soon)
* startManageBankFlow (Coming Soon)

## Example:
https://cl.ly/81869d7de1b4
