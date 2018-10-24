import PaymentFlow from './wrappers/interfaces/PaymentFlow'

function selectComponent(name) {
  switch (name) {
    // This interface allow users to manage their bank accounts (index, create, delete)
    case 'bank':
      return ManageBank;
      break;
  }
}

module.exports = PaymentFlow

// new Xfers(this).flow.startPaymentFlow(new BigInteger("100"))

/*

  const xfers = new Xfers('xfers_elements', 'abckedgfjgj123456788');
  xfers.startPaymentFlow(200)

*/
