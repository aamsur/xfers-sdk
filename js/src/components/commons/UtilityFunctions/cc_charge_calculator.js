export const calculateCreditCardFees = (amount) => {
  let chargeAmt = 0;
  if (Number(amount) === amount) {
    if (amount == 0) {
      chargeAmt = 0;
    } else {
      chargeAmt = (amount * 1.034) + 0.5;
    }
  }
  return parseFloat(Math.round(chargeAmt * 100) / 100).toFixed(2);
}
