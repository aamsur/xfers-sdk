import cx from 'classnames'
import cls from './MainMenuItemSide.scss'

const adminNavMapper = {
  frequent            : "Frequently Used Pages",
  auditor             : "Auditing Tools",
  users               : "Users",
  records             : "Records",
  analytics           : "Analytics",
  daily_graph         : "Daily Graph",
  weekly_graph        : "Weekly Graph",
  monthly_graph       : "Monthly Graph",
  marketing_sales     : "Marketing",
  monitoring_analytics: "Monitoring Analytics",
  finance_report      : "Finance Report",
  compliance          : "Compliance",
  others              : "Others",
}

export default function MainMenuItemSide({
  title, item, expanded, toggleSublist
}) {
  if (item.length == 1) {
    return (
      <li className={cls.mainMenuItem}>
        <a href={item[0].url}>
          <i className={cx("fa fa-angle-double-right", cls.menuIcon)} />
          <span className={cls.mmText}>{adminNavMapper[title]}</span>
        </a>
      </li>
    )
  } else {
    const mmDropdownClassname = cx(cls.mainMenuItem, cls.mmDropdown, {
      [cls.mmDropdownExpanded]: expanded
    })

    return (
      <li className={mmDropdownClassname} onMouseEnter={toggleSublist} onMouseLeave={toggleSublist}>
        <a>
          <i className={cx("fa fa-angle-double-right", cls.menuIcon)} />
          <span className={cls.mmText}>{adminNavMapper[title]}</span>
        </a>

        <ul className={cls.subMenuListContainer}>
          { item.map((submenu, i) =>
            <SubItem
              key={i}
              item={submenu}
              />
          )}
        </ul>
      </li>
    );
  }
}

function SubItem({item}) {
  return (
    <li>
      <a href={item.url}>
        <span className={cls.mmText}>{item.title}</span>
      </a>
    </li>
  );
}
