
/*
options: {
  showZero: false
}
*/

export default function toCurrency(amount, options = {}) {

  const {showZero} = options;
  if (parseFloat(amount).toFixed(2) == "0.00"  && !showZero) {
    return '-'
  }

  let currency = 'SGD';
  if (process.env.LOCALE == 'id') { currency = 'IDR' }

  const formatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }

  if (window.Intl) {
    try{
      amount = (new Intl.NumberFormat('en-US', formatOptions)).format(amount);
    }
    catch(err){}
  }
  return amount;
}
