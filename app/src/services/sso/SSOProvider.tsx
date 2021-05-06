import * as React from 'react';
import Keycloak, { KeycloakInitOptions, KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { KeycloakProvider } from '@react-keycloak/web';
import { SpinnerBullsEye } from '@app/components/notFound/SpinnerBullsEye';
import { getConfig } from '@app/utils/config';

// TODO Should we be retrieving the username from somewhere that Keycloak typing documents it being
interface ExtendedKeycloakInstance extends KeycloakInstance {
  tokenParsed?: KeycloakTokenParsed & {
    name?: string;
  };
}

const keycloak: ExtendedKeycloakInstance = Keycloak({
  realm: 'contractor-onboarding',
  url: getConfig().REACT_APP_SSO_URL || process.env.REACT_APP_SSO_URL || 'http://localhost:8880/auth',
  clientId: 'contractor-onboarding',
});

const Loading = () => <SpinnerBullsEye />;

const SSOisAuthenticated = () => keycloak.authenticated;

const userName = () => {
  return keycloak.tokenParsed?.name;
  // keycloak.loadUserProfile().then(result => {
  //   return result.username
  // }).catch(() => {
  //   return 'Username not found'
  // })
};

const SSOLogin = keycloak.login;

const SSOLogout = keycloak.logout;

const SSOUpdateToken = async () => {
  await keycloak.updateToken(20);
  return keycloak.token;
};

const SSOProvider: React.FunctionComponent = ({ children }) => {
  const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false,
  };

  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakInitOptions}
      LoadingComponent={<Loading />}
      isLoadingCheck={keycloak => !keycloak.authenticated}
    >
      {children}
    </KeycloakProvider>
  );
};

export { SSOProvider, SSOisAuthenticated, SSOLogout, SSOLogin, SSOUpdateToken, userName };
