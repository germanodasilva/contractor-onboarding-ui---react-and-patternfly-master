import * as React from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
import { Dashboard } from '@app/pages/Dashboard/Dashboard';
import { Procedures } from '@app/pages/procedures/Procedures';
import { Cases } from '@app/pages/cases/Cases';
import { CaseDetail } from '@app/pages/caseDetail/CaseDetail';
import { Tasks } from '@app/pages/tasks/Tasks';
import { TaskRunner } from '@app/pages/taskRunner/TaskRunner';
import { NotFound } from '@app/components/notFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { SSOisAuthenticated, SSOLogin } from '@app/services/sso/SSOProvider';
import { Component } from 'react';

export interface IAppRoute {
  label?: string;
  component: React.ComponentType;
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
}

const routes: IAppRoute[] = [
  {
    component: Dashboard,
    exact: true,
    label: 'Dashboard',
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    component: Procedures,
    exact: true,
    label: 'Procedures',
    path: '/procedures',
    title: 'Procedures',
  },
  {
    component: Cases,
    exact: true,
    label: 'Cases',
    path: '/cases',
    title: 'Cases List',
  },
  {
    component: CaseDetail,
    exact: true,
    path: '/cases/:id/:type/:containerId',
    title: 'Cases Details',
  },
  {
    component: Tasks,
    exact: true,
    label: 'Tasks',
    path: '/tasks',
    title: 'Tasks List',
  },
  {
    component: TaskRunner,
    exact: true,
    path: '/tasks/:id',
    title: 'Task Runner',
  },
];

const ProtectedRouteWithTitleUpdates = ({ component: Component, title, ...rest }: IAppRoute) => {
  useDocumentTitle(title);
  function routeWithTitle(routeProps: RouteComponentProps) {
    // TODO possible to Redirect after Login
    return SSOisAuthenticated() ? <Component {...routeProps} /> : SSOLogin();
  }

  return <Route {...rest} render={routeWithTitle} />;
};

const RouteWithTitle = ({ component, title }: { component: Component; title: string }) => {
  useDocumentTitle(title);
  return <Route component={component} />;
};

const AppRoutes = () => (
  <Switch>
    {routes.map(({ path, exact, component, title, isAsync }, idx) => (
      <ProtectedRouteWithTitleUpdates
        path={path}
        exact={exact}
        component={component}
        key={idx}
        title={title}
        isAsync={isAsync}
      />
    ))}
    <Route path="/">
      <Redirect to="/dashboard" />
    </Route>
    <RouteWithTitle component={NotFound} title="404 Page Not Found" />
  </Switch>
);

export { AppRoutes, routes };
