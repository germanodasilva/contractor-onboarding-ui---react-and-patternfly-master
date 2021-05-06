import * as React from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';

const SpinnerBullsEye: React.FunctionComponent = () => (
  <Bullseye style={{ height: '8em' }}>
    <Spinner size="xl" />
  </Bullseye>
);

export { SpinnerBullsEye };
