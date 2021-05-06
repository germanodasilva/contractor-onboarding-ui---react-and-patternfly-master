import * as React from 'react';
import light from '@app/assets/images/bulb.png';
import './NoRowsFound.css';
import { Title, EmptyState, EmptyStateVariant, EmptyStateBody } from '@patternfly/react-core';

const NoRowsFound: React.FunctionComponent = () => {
  return (
    <EmptyState variant={EmptyStateVariant.small}>
      <img src={light} alt="Bulb" height={192} width={199} />
      <Title headingLevel="h4" size="lg">
        Uh oh!
      </Title>
      <EmptyStateBody>There are currently No Cases/Task available with this specific filter.</EmptyStateBody>
    </EmptyState>
  );
};

export { NoRowsFound };
