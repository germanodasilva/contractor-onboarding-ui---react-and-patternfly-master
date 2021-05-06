import * as React from 'react';
import { Header } from '@app/components/header/Header';
import { Page } from '@patternfly/react-core';
import { ToastAlert } from '@app/components/alerts/toastAlerts';

export interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  return (
    <Page header={<Header />} mainContainerId="primary-app-container" onPageResize={() => true}>
      <ToastAlert />
      {children}
    </Page>
  );
};

export { AppLayout };
