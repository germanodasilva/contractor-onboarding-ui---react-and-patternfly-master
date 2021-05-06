import * as React from 'react';
import { Title, EmptyState, EmptyStateVariant, EmptyStateBody } from '@patternfly/react-core';
import light from '@app/assets/images/bulb.png';
import './NoProcedureFound.css';

const NoProcedureFound: React.FunctionComponent = () => {
  return (
    <EmptyState variant={EmptyStateVariant.small}>
      <img src={light} alt="Bulb" height={192} width={199} />
      <Title headingLevel="h4" size="lg">
        Uh oh!
      </Title>
      <EmptyStateBody>There are no procuedures available, please contact your administrator.</EmptyStateBody>
    </EmptyState>
  );
};

export { NoProcedureFound };
