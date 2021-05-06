import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/pages/layout/AppLayout';
import { AppRoutes } from '@app/routes';
import { SSOProvider } from '@app/services/sso/SSOProvider';
import '@app/app.css';

const App: React.FunctionComponent = () => (
  <SSOProvider>
    <Router basename="/contractor-onboarding">
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  </SSOProvider>
);

export { App };
