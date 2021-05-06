import * as React from 'react';
import { Text, Card, CardTitle, CardBody, Flex, FlexItem } from '@patternfly/react-core';
import './DetailCards.css';

interface DetailCardsProps {
  totalOpen: string;
  totalClosed: string;
  totalAborted: string;
}

const DetailCards: React.FunctionComponent<DetailCardsProps> = props => {
  return (
    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
      <FlexItem>
        <Card>
          <CardTitle> Number of Opened Cases </CardTitle>
          <CardBody>
            There are currently <Text className="openCase-text">{props.totalOpen}</Text> open cases
          </CardBody>
        </Card>
      </FlexItem>
      <FlexItem>
        <Card>
          <CardTitle> Number of Closed Cases </CardTitle>
          <CardBody>
            There are currently <Text className="closedCase-text">{props.totalClosed}</Text> closed cases
          </CardBody>
        </Card>
      </FlexItem>
      <FlexItem>
        <Card>
          <CardTitle> Number of Aborted Cases </CardTitle>
          <CardBody>
            There are currently <Text className="abortedCase-text">{props.totalAborted}</Text> aborted cases
          </CardBody>
        </Card>
      </FlexItem>
    </Flex>
  );
};

export { DetailCards };
