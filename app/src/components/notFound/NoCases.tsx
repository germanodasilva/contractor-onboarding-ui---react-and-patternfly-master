import * as React from 'react';
import { useHistory } from 'react-router-dom';
import light from '@app/assets/images/bulb.png';
import './NoCase.css';
import { Button, Title, EmptyState, EmptyStateVariant, EmptyStateBody } from '@patternfly/react-core';

const NoCases: React.FunctionComponent = () => {
  const history = useHistory();
  return (
    <EmptyState variant={EmptyStateVariant.small}>
      <img src={light} alt="Bulb" height={192} width={199} />
      <Title headingLevel="h4" size="lg">
        Uh oh!
      </Title>
      <EmptyStateBody>
        You have not created any new cases of the current procedures. Once you have created a new case, you can view the
        statistics associated with the cases.
      </EmptyStateBody>
      <Button variant="primary" onClick={() => history.push(`/procedures`)}>
        Create Case
      </Button>
    </EmptyState>
  );
};

export { NoCases };
