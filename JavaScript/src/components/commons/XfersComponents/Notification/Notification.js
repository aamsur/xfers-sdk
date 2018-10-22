import React from 'react'
import cx from 'classnames'
import cls from './Notification.scss'
import PropTypes from 'prop-types'
import {
  AnchorLink,
  Button
} from 'XfersComponents'

const componentPropTypes = {
  type: PropTypes.oneOf([
    'default', 'danger', 'new', 'info',
  ]),
  message: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func
    }),
  ),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
      text: PropTypes.string,
      onClick: PropTypes.func
    })
  )
}

const componentDefaultProps = {
  type: "default"
};

function Notification({ type, message, links, buttons, children }) {

  const notificationClass = cx(cls.notificationContainer, {
    [cls.info]: type == 'info',
    [cls.danger]: type == 'danger',
    [cls.new]: type == 'new',
  })

  const notificationLabel = () => {
    switch (type) {
      case "danger":
        return <div className={cx(cls.dangerLabel, cls.label)}>ALERT</div>
        break;
      case "new":
        return <div className={cx(cls.newLabel, cls.label)}>NEW</div>
        break;
      case "info":
        return <div className={cx(cls.infoLabel, cls.label)}>NOTICE</div>
        break;
      default:

    }
  }

  return (
    <div className={notificationClass}>
      {notificationLabel()}
      <div>
        <p><strong>{message}</strong></p>
      </div>
      <div>{children}</div>
      <div>
        { links && links.map((link, index) =>
            <AnchorLink key={index} href={link.href || "#"} onClick={link.onClick} target={link.target ? "_blank" : undefined}>{link.text}</AnchorLink>
          )
        }
      </div>
      <div className={cls.buttonContainer}>
        { buttons && buttons.map((button, index) =>
            <Button key={index} type={button.type} onClick={button.onClick}>{button.text}</Button>
          )
        }
      </div>
    </div>
  )
}

Notification.propTypes = componentPropTypes;
Notification.defaultProps = componentDefaultProps;

export default Notification
