import xfersLogo from 'xfersLogo.png'
import xfersCard from 'cardProfileDefault.png'

import cx from 'classnames'
import cls from './MainMenu.scss'
import clsItem from '../MainMenuItemSide/MainMenuItemSide.scss'
import MainMenuItemSide from '../MainMenuItemSide'

import {getOptions, fetchWithErrorHandling} from 'UtilityFunctions'

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expandedDropdownIndex: undefined }
  }

  toggleDropdown = (index) => {
    const { expandedDropdownIndex } = this.state;
    const newIndex = (index == expandedDropdownIndex ? undefined : index);
    this.setState({ expandedDropdownIndex: newIndex });
  }

  signOut = () => {
    fetchWithErrorHandling({
      endPointUrl: '/users/sign_out',
      fetchOptions: getOptions({ method: 'DELETE' }),
      onSuccess: (res) => {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          location.reload();
        }
      },
      onBreakingError: (res) => {
        location.reload();
      }
    });
  }

  render() {
    const { menuList } = this.props;
    const { expandedDropdownIndex } = this.state;

    return (
      <div className={cls.mainMenu}>
        <div className={cls.topMenuBox}>
          <img className={cls.menuLogo} src={xfersLogo} />
          <div className={cls.accountType}>
            <img src={xfersCard} />
            <span>Admin Panel</span>
          </div>
        </div>

        <div className={cls.bottomMenuBox}>
          { menuList &&
            <ul className={cls.mainMenuItem}>
              { Object.keys(menuList).map((menuKey, i) =>
                <MainMenuItemSide
                  key={i}
                  title={menuKey}
                  item={menuList[menuKey]}
                  expanded={expandedDropdownIndex == i ? true : false}
                  toggleSublist={() => this.toggleDropdown(i)}
                />
              )}
            </ul>
          }
        </div>

        <div className={cls.fixedBottomMenuBox}>
          <ul className={cls.mainMenuItem}>
            <li className={clsItem.mainMenuItem}><a onClick={this.signOut}>
              <i className={cx("fa fa-power-off", clsItem.menuIcon)} />
              <span className={clsItem.mmText}>Logout</span>
            </a></li>
          </ul>
        </div>
      </div>
    )
  }
}
