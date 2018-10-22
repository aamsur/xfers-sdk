import cx from 'classnames'
import globalCls from '_variables.scss'

export const mapToColorClass = (status) => {

  const isPendingColor = (
    status == 'pending' ||
    status == 'await_payment' ||
    status == 'on_hold' ||
    status == 'withheld'
  );

  const colorClass = cx({
    [globalCls.pendingColor]: isPendingColor,
    [globalCls.completedColor]: status == 'completed' || status == 'resolved',
    [globalCls.cancelledColor]: status == 'cancelled' || status == 'dispute',
    [globalCls.expiredColor]: status == 'expired',
    [globalCls.refundedColor]: status == 'refunded',
    [globalCls.unclaimedColor]: status == 'unclaimed',
    [globalCls.awaitShippingColor]: status == 'await_shipping',
    [globalCls.shippedColor]: status == 'shipped',
  })
  return colorClass;
}
