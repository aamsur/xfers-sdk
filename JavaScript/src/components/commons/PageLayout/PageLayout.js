import React from 'react'
import { MainMenu, ContentWrapper } from './components'
import { getOptions, fetchWithErrorHandling } from 'UtilityFunctions'

export default class PageLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuList: {} }
  }
  componentDidMount() {
    fetchWithErrorHandling({
      endPointUrl: '/admin_navigation',
      fetchOptions: getOptions({ method: 'GET' }),
      onSuccess: (res) => {
        let parsedMenu = Object.assign({}, res);

        Object.keys(res).map((menuKey) => {
          if (res[menuKey].length == 0) { delete parsedMenu[menuKey] }
          return;
        });
        
        this.setState({ menuList: parsedMenu })
      },
    });
  }
  render() {
    const { menuList } = this.state;
    const { pageTitle, children } = this.props;
    return (
      <div>
        <MainMenu menuList={menuList} />
        <ContentWrapper
          pageTitle={pageTitle}
          children={children}
        />
      </div>
    );
  }
}
