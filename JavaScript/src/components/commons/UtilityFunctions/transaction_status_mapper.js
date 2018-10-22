
// Unclaimed and Resolved are not included because they are not persistent states
const TRANSACTION_STATUS_MAP = {
  "Pending"       : "Buyer has confirmed this order, but has not provided shipping address.",
  "Shipped"       : "The Seller has shipped this order and a notification has been sent to the Buyer to release the funds.",
  "Refunded"      : "The payment collected for this order has been refunded partially or fully to the buyer.",
  "Await Shipping": "Buyer has paid for this order. Funds are withheld by Xfers until the Seller ships this order. Once the order is shipped, the Seller must click on “Declare Shipped” to prompt the Buyer to release funds to the Seller.",
  "Expired"       : "This order has not been paid for and has expired. The Seller may prompt the Buyer to make another order.",
  "Cancelled"     : "The Seller or the Buyer has cancelled this order. The Seller may prompt the Buyer to make another order.",
  "Completed"     : "Buyer has paid for this order. Funds are in the Seller’s Xfers account and can be withdrawn to a bank account.",
  "Await Payment" : "Buyer has confirmed this order, but has not successfully made payment.",
  "On Hold"       : "Buyer has accepted the transaction, but has broken the Xfers transaction limit. The Buyer may verify his/her account to lift the limit.",
  "Withheld"      : "Goods has been shipped. During this period, Buyer will be able to raise a dispute/seek refund. Default to 7 days and starting immediately after the status has been set to 'Shipped'. ",
  "Dispute"       : "Buyer has raised a dispute on this order. Seller can choose to resolve with Buyer privately or refund the Buyer.",
}

export const mapToStatusExplaination = (status) => {
  return TRANSACTION_STATUS_MAP[status];
}
