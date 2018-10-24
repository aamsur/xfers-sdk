# Web SDK Usage Overview

## Pre-requisite

### 1. Xfers User Access Token

Web SDK requires user access token to be instantiated. If you have not gone through the process to setup **Xfers Connect**, please refer to the **Backend Integration** guide in the root, or click [here]https://github.com/Xfers/xfers-sdk)

## Download Xfers Web SDK

Once the setup for **User Access Token** is complete, proceed to download Xfers Web SDK either through **CDN** or **npm install**

### Through CDN & <script> Tag

Add the following lines into the `<head></head>` section:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- The following files can be downloaded from the js folder in this repository -->
<script src="https://cdn.jsdelivr.net/gh/Xfers/xfers-sdk@2b10a00db2cb7d7f1c16705c9c424ab7dfa0b1cc/JavaScript/dist/vendors~xfers.bundle.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Xfers/xfers-sdk@2b10a00db2cb7d7f1c16705c9c424ab7dfa0b1cc/JavaScript/dist/xfers.bundle.js"></script>

```

Then initialize the components by adding the following javascript into the `<body></body>` section:
```html
<body>
  <div id="xfers_elements"></div>

  <script type="text/javascript">

    // 1st param => Mounting Element Id: 'xfers_elements'
    // 2nd param => Avaialble components: ['XFERS_USER_API_KEY']
    const xfers = new Xfers("xfers_elements", "YTB7iBVauTzJ8zyk6cJ3ooTKUGJMQ-SYDPxFNFTDs4E");
    xfers.startPaymentFlow({
      amount: 30000,
      currency: 'SGD',
      orderId: 'AZ03273'
    });
  </script>
</body>
```

### Through npm, import/export

Install the package through npm or yarn:

```
npm install @xfers/xfers-js-sdk
```

Then import the Xfers UI Elements into your code:
```javascript
import { Elements } from '@xfers/xfers-js-sdk'
```

## Example:
https://cl.ly/81869d7de1b4
