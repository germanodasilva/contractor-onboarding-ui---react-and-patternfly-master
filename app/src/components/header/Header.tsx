import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DropdownItem } from '@patternfly/react-core';
import { SSOisAuthenticated, SSOLogout, userName } from '@app/services/sso/SSOProvider';
import { routes } from '@app/routes';
import { IAppLayout } from '@app/pages/layout/AppLayout';
import './Header.css';
import rH from '@app/assets/images/RedHatNewLogo.png';
import { Avatar } from '@patternfly/react-core';
import avatarImg from '@app/assets/images/avatar.png';
import {
  Nav,
  NavList,
  NavItem,
  Dropdown,
  DropdownToggle,
  PageHeader,
  Brand,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
} from '@patternfly/react-core';

const Header: React.FunctionComponent<IAppLayout> = () => {
  const logoProps = { href: '/dashboard' };

  const location = useLocation();
  let showCaseId, showCaseId1;

  if (location?.pathname?.indexOf('/cases/') > -1) {
    showCaseId1 = location.pathname.substring(location.pathname.indexOf('/cases/') + 7, location.pathname.length);
    showCaseId = showCaseId1.substring(0, showCaseId1.indexOf('/')); //newCaseId without parameters
  }

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark" variant="horizontal">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) =>
            route.label && (
              <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
                <NavLink exact to={route.path} activeClassName="pf-m-current">
                  {route.label}
                </NavLink>
              </NavItem>
            ),
        )}
        {showCaseId && (
          <NavItem key="12345">
            <NavLink exact to={'#'} activeClassName="pf-m-current">
              {showCaseId}
            </NavLink>
          </NavItem>
        )}
      </NavList>
    </Nav>
  );

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const AuthStatus = () => {
    const userLoggedIn = userName();
    const dropdownItems = [
      <DropdownItem key="link" onClick={SSOLogout}>
        Log Out
      </DropdownItem>,
    ];

    return SSOisAuthenticated() ? (
      <PageHeaderTools>
        <PageHeaderToolsGroup>
          <PageHeaderToolsItem>
            <Dropdown
              isOpen={isDropdownOpen}
              isPlain
              onSelect={() => setIsDropdownOpen(false)}
              toggle={<DropdownToggle onToggle={setIsDropdownOpen}>User: {userLoggedIn}</DropdownToggle>}
              dropdownItems={dropdownItems}
            />
          </PageHeaderToolsItem>
          <PageHeaderToolsItem>
            <Avatar src={avatarImg} alt="avatar" />
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
      </PageHeaderTools>
    ) : (
      <p>You are not logged in.</p>
    );
  };

  const HeaderLogo = (
    <div className="header-logo">
      <Brand src={rH} alt="Red Hat Logo" />
      <span className="h-title"> Professional Services Automation</span>
    </div>
  );

  return (
    <PageHeader
      logo={HeaderLogo}
      logoProps={logoProps}
      topNav={Navigation}
      headerTools={AuthStatus()}
      className="psa-header"
    />
  );
};

export { Header };
