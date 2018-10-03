import React from 'react'
import PropTypes from 'prop-types'
import cls from './StatusPanel.scss'
import cx from 'classnames'

import errorLogo from 'icons/Error_Logo.png'
import pendingLogo from 'icons/Pending_Logo.png'
import successLogo from 'icons/Success_Logo.png'

import {Button, Panel, AnchorLink, FooterButtonGroup} from 'XfersBasicComponents'
import {CenterContent, SectionContainer} from 'XfersLayoutComponents'
import {toCurrency, mapToConstants} from 'UtilityFunctions'

const componentPropTypes = {
  children: PropTypes.node,
  customClass: PropTypes.string,
  walletInfo: PropTypes.shape({
    walletId: PropTypes.number,
    balance: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  }),
  footerLink: PropTypes.shape({ type: PropTypes.oneOf([ AnchorLink ]) }),
  type: PropTypes.oneOf(['success', 'error', 'pending']).isRequired,
  footerButtons: PropTypes.shape({ type: FooterButtonGroup }).isRequired,
}

const componentDefaultProps = {
  customClass: '',
};

function StatusPanel({
  type,
  children,
  customClass,
  footerLink,
  footerButtons,
  walletInfo,
}) {
  const icon = type == "success" ? successLogo :
               type == "pending" ? pendingLogo : errorLogo;
  return (
    <Panel customClass={customClass}>
      <SectionContainer paddingTop>
        <CenterContent>
          <div className={cls.statusIconContainer}><img src={icon} /></div>
          <div className={cls.mainTextContainer}>
            {children}
            <br/><br/><br/><br/>
            {walletInfo &&
              <div className={cls.walletInfoContainer}>
                <div className={cls.summary}>
                  {`${mapToConstants({value: walletInfo.walletId, constant: 'WALLET'})} Wallet`}<br/>
                  Balance<br/>
                </div>
                <span>{toCurrency(walletInfo.balance, {showZero: true})}</span>
              </div>
            }
          </div>
        </CenterContent>
        <div style={{textAlign: 'center'}}>{footerLink}</div>
      </SectionContainer>
      {footerButtons}
    </Panel>
  );
}

StatusPanel.propTypes = componentPropTypes;
StatusPanel.defaultProps = componentDefaultProps;

export default StatusPanel
