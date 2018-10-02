import 'whatwg-fetch'
import {
  CONSTANTS
} from './constants_mapper'

// ------------------------------------
// Actions
// ------------------------------------
const MC_PAYMENT_API_END_POINT = 'https://gw2.uat.mcpayment.net:8443/api/v5/';
const MC_PAYMENT_TERMINAL_AUTH_END_POINT = MC_PAYMENT_API_END_POINT + 'auth/terminal';
const MC_PAYMENT_PREAUTH_END_POINT = MC_PAYMENT_API_END_POINT + 'preauth';
const TRANSACTION_MC_PAYMENT_END_POINT = '/api/v3/credit_card_charges/mc_payment_top_up';

function getOptions(options = {}) {
  return ({
    ...options,
    cache: 'default',
    headers: {
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']") && (document.querySelector("meta[name='csrf-token']").getAttribute("content") || ''),
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  })
}

function parseJSON(response) {
  return response.json()
}

/*
 * Input format:
 * {
      "cardNo": "4111111111111111",
      "cardExpiryDate": "YYMM",
      "cardHolderName": "test account",
      "cvc": "123",
      "totalAmount": "1234"
    }
 */

export default function authMcPayment(input) {
  let authBody = {
    "header": {
      "version": CONSTANTS.MC_PAYMENT.Version,
      "appType": CONSTANTS.MC_PAYMENT.AppTypeAuth,
      "appVersion": CONSTANTS.MC_PAYMENT.AppVersion,
      "mcpTerminalId": CONSTANTS.MC_PAYMENT.McpTerminalId
    },
    "data": {
      "apiAccessKey": CONSTANTS.MC_PAYMENT.ApiAccessKey
    }
  };

  return fetch(MC_PAYMENT_TERMINAL_AUTH_END_POINT,
    getOptions({
      method: 'POST',
      body: JSON.stringify(authBody)
    })
  )
  .then(parseJSON)
  .then(json => {
    /*
    Response:
    {
      "header": {
        "version": "5",
        "appType": "W",
        "appVersion": "xfers.0.0.1",
        "status": {
          "responseCode": "0000",
          "message": "Approved"
        },
        "mcpTerminalId": "3117110004",
        "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNb2JpbGUgQ3JlZGl0IFBheW1lbnQgUHRlIEx0ZCIsIm1jcFRlcm1pbmFsSWQiOiIzMTE3MTEwMDA0IiwicHVibGljS2V5IjoiTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBTUx6T3ZZMUV1eG95Mjg5UzFITFRPMW5hT215RHBCY1xucml4TXRTNG5Sby92dTJtQU1nbmROVVZBRXVPNmJSSDJIekdBZWFwdUVyb2VWSFRBWlgzdDNKMENBd0VBQVE9PSIsImV4cCI6MjExNzExMjIxNDAyMTYsImlhdCI6MjAxNzExMjIxNDAyMTZ9.IxBhlW4XtB5TiTiMzehmKH0CTqJ0YKGiVD2z7qHB6wI"
      },
      "data": {
        "mcpTerminalId": "3117110004"
      }
    }
    */

    if (json.header.status.responseCode != CONSTANTS.MC_PAYMENT.ApprovedCode) {
      return {
        isSuccess: false,
        data: json.header.status.message
      };
    } else {
      return preAuthMcPayment(json, input);
    }
  })
  .catch(error => {
    return {
      isSuccess: false,
      data: error
    };
  });
};

function preAuthMcPayment(json, input) {
  let preAuthBody = {
    "header": {
      "version": CONSTANTS.MC_PAYMENT.Version,
      "appType": CONSTANTS.MC_PAYMENT.AppTypePreAuth,
      "appVersion": CONSTANTS.MC_PAYMENT.AppVersion,
      "mcpTerminalId": CONSTANTS.MC_PAYMENT.McpTerminalId,
      "jwt": json.jwt
    },
    "data": {
      "currency": "SGD",
      "cardno": input.cardNo,
      "cardExpiryDate": input.cardExpiryDate,
      "cardHolderName": input.cardHolderName,
      "cvc": input.cvc,
      "totalAmount": "1",
      "tokenize": CONSTANTS.MC_PAYMENT.Tokenize
    }
  };

  return fetch(MC_PAYMENT_PREAUTH_END_POINT,
    getOptions({
      method: 'POST',
      body: JSON.stringify(preAuthBody)
    }))
  .then(parseJSON)
  .then(json => {
    let sentData = {
      ...json,
      totalAmount: input.totalAmount
    };

    /*
    Response:
    {
      "data": {
        "transactionId": "54635",
        "transactionType": "100",
        "transactionState": "2",
        "salesAmount": "0",
        "totalAmount": "1",
        "hostResponseDate": "20171127154044",
        "clientRequestDate": "20171127153959",
        "gatewayRequestDate": "20171127154043",
        "gatewayResponseDate": "20171127154044",
        "posConditionCode": "00",
        "stan": "003943",
        "authCode": "003943",
        "respCode": "00",
        "currencyCode": "702",
        "truncatedPan": "************1111",
        "brandName": "Visa",
        "currency": "SGD",
        "cardHolderName": "test account",
        "hostResponseMessage": "Transaction was accepted successfully",
        "type": "TRANSACTION",
        "gatewayResponseCode": "00",
        "errorMessage": "Transaction was accepted successfully",
        "cvc": "123",
        "cardtoken": "545c952b-59c3-470f-84df-1fc216672867",
        "merchantCountry": "SGP",
        "tokenize": "Y"
      },
      "header": {
        "version": "5",
        "appType": "A",
        "appVersion": "xfers.0.0.1",
        "status": {
          "responseCode": "0000",
          "message": "Approved"
        },
        "mcpTerminalId": "3117110004",
        "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNb2JpbGUgQ3JlZGl0IFBheW1lbnQgUHRlIEx0ZCIsIm1jcFRlcm1pbmFsSWQiOiIzMTE3MTEwMDA0IiwicHVibGljS2V5IjoiTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBTUx6T3ZZMUV1eG95Mjg5UzFITFRPMW5hT215RHBCY1xucml4TXRTNG5Sby92dTJtQU1nbmROVVZBRXVPNmJSSDJIekdBZWFwdUVyb2VWSFRBWlgzdDNKMENBd0VBQVE9PSIsImV4cCI6MjExNzExMjIxNDAyMTYsImlhdCI6MjAxNzExMjIxNDAyMTZ9.IxBhlW4XtB5TiTiMzehmKH0CTqJ0YKGiVD2z7qHB6wI"
      }
    }
    */

    if (json.header.status.responseCode != CONSTANTS.MC_PAYMENT.ApprovedCode) {
      return {
        isSuccess: false,
        data: json.header.status.message
      };
    } else {
      return sendDataToBackend(sentData);
    }
  })
  .catch(error => {
    return {
      isSuccess: false,
      data: error.message
    };
  });
};

function sendDataToBackend(data) {
  return fetch(TRANSACTION_MC_PAYMENT_END_POINT,
    getOptions({
      method: 'POST',
      body: JSON.stringify(data)
    }))
  .then(parseJSON)
  .then(json => {
    return {
      isSuccess: true,
      data: json
    };
  })
  .catch(error => {
    return {
      isSucess: false,
      data: error.message
    };
  });
}
