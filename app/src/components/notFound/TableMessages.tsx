import * as React from 'react';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { global_danger_color_200 as globalDangerColor200 } from '@patternfly/react-tokens';
import { NoRowsFound } from './NoRowsFound';
import {
  Bullseye,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Spinner,
} from '@patternfly/react-core';

const showError = (msg, columns) => [
  {
    heightAuto: true,
    cells: [
      {
        props: { colSpan: columns },
        title: (
          <Bullseye>
            <EmptyState variant={EmptyStateVariant.small}>
              <EmptyStateIcon icon={ExclamationCircleIcon} color={globalDangerColor200.value} />
              <Title headingLevel="h2" size="lg">
                Something went wrong
              </Title>
              <EmptyStateBody>{msg}</EmptyStateBody>
            </EmptyState>
          </Bullseye>
        ),
      },
    ],
  },
];

const showSpinner = columns => [
  {
    heightAuto: true,
    cells: [
      {
        props: { colSpan: columns },
        title: (
          <Bullseye>
            <div>
              <Spinner size="xl" />
            </div>
          </Bullseye>
        ),
      },
    ],
  },
];

const showEmpty = columns => [
  {
    cells: [
      {
        props: { colSpan: columns },
        title: <NoRowsFound />,
      },
    ],
    empty: true,
  },
];

export const TableMessages = {
  showError,
  showSpinner,
  showEmpty,
};
