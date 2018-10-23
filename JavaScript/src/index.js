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
