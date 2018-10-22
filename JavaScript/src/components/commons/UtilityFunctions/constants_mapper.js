export const CONSTANTS = {
  'WALLET': {
    1: "General",
    2: "Digital Goods",
    2354: "TunaiKita"
  },
  'TRANSACTION': {
    "withdrawal_request"                   : "Withdrawal",
    "xfers_internal_transaction"           : "Payout", // Unclear what is this yet
    "xfers_external_transaction_deposit"   : "Deposit",
    "xfers_external_transaction_withdrawal": "", // Unclear what is this yet
    "xfers_external_transaction"           : "", //Unclear what is this yet
    "payout_request_fee"                   : "Payout - Fee", // Withdrawal Fees from TunaiKita users
    "payout_request_penalty"               : "Payout - Penalty",
    "payout_request"                       : "Payout",
    "xfers_transaction_fee"                : "Fee",
    "xfers_transaction_credit_card"        : "Credit Card",
    "xfers_transaction_api"                : "Transaction",
    "xfers_transaction_paylink"            : "Payment Link",
    "xfers_transaction_withdrawal"         : "", //Unclear what is this yet
    "xfers_transaction_transfer"           : "Transfer"
  },
  'MC_PAYMENT': {
    "Version"       : "5",
    "AppTypeAuth"   : "W",
    "AppTypePreAuth": "A",
    "AppVersion"    : "xfers.0.0.1",
    "McpTerminalId" : "3117110004",
    "ApiAccessKey"  : "0hdMnjvmI16awLd02Z63YacGbQt9mZSG",
    "Tokenize"      : "Y",
    "ApprovedCode"  : "0000"
  }
};

export const mapToConstants = ({value, constant}) => {
  return CONSTANTS[constant][value];
};
