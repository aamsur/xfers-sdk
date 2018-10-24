import React from 'react'

export default function getBankSpecifics(senderBankAccountAbbreviation) {

  let externalBankUrl, bankCommentLabel, bankAcronyms;

  switch (senderBankAccountAbbreviation) {
    case 'DBS':
      bankAcronyms = 'DBS';
      bankCommentLabel = <span>Comment to Payee:</span>
      externalBankUrl = 'https://internet-banking.dbs.com.sg/'
      break;
    case 'POSB':
      bankAcronyms = 'POSB'
      bankCommentLabel = <span>Comment to Payee:</span>
      externalBankUrl = 'https://internet-banking.dbs.com.sg/posb/'
      break;
    case 'UOB':
      bankAcronyms = 'UOB';
      bankCommentLabel = <span>Comments:</span>
      externalBankUrl = 'https://pib.uob.com.sg/PIBLogin/appmanager/Login/Public'
      break;
    case 'MBB':
      bankAcronyms = 'Maybank';
      bankCommentLabel = <span>Transaction Details:</span>
      externalBankUrl = 'https://sslsecure.maybank.com.sg/cgi-bin/mbs/scripts/mbb_login.jsp'
      break;
    case 'OCBC':
      bankAcronyms = 'OCBC';
      bankCommentLabel = <span>Payment Description:</span>
      externalBankUrl = 'https://internet.ocbc.com/internet-banking/'
      break;
    case 'HSBC':
      bankAcronyms = 'HSBC';
      bankCommentLabel = <span>Beneficiary Notes:</span>
      externalBankUrl = 'https://www.hsbc.com.sg/1/2/ALL_SITE_PAGES/HUB_PIB/PIB_LOGON'
      break;
    case 'CITI':
      bankAcronyms = 'Citibank';
      bankCommentLabel = <span>Message:</span>
      externalBankUrl = 'https://www.citibank.com.sg/SGGCB/JSO/signon/DisplayUsernameSignon.do'
      break;
    case 'SCB':
      bankAcronyms = 'Standard Chartered';
      bankCommentLabel = <span>Description:</span>
      externalBankUrl = 'https://ibank.standardchartered.com.sg/'
      break;
    case 'BOC':
      bankAcronyms = 'BOC'
      bankCommentLabel = <span>Description:</span>
      externalBankUrl = 'https://ap.ebs.bankofchina.com/login_sin.html?bn=SG&bo=inv&lan=e'
      break;
    case 'CIMB':
      bankAcronyms = 'CIMB'
      bankCommentLabel = <span>Message To Recipient:</span>
      externalBankUrl = 'https://www.cimbclicks.com.sg/clicks/'
      break;
    default:
      bankAcronyms = 'others'
      bankCommentLabel = <span>Description:</span>
      externalBankUrl = ''
      break;
  }
  return {
    bankAcronyms,
    bankCommentLabel,
    externalBankUrl
  }
}
