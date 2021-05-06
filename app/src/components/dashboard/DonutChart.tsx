import * as React from 'react';
import { ChartDonut } from '@patternfly/react-charts';

interface ThresholdChartProps {
  totalInstances: number;
  totalVal: number;
  totalPercentOf: number;
  name: string;
  idx: string;
  className: string;
}

const ThresholdChart: React.FunctionComponent<ThresholdChartProps> = props => {
  const val = props.totalInstances - props.totalVal;

  // TODO Extract these to values files
  const colors = ['#0066cc', '#f0ab00', '#2fcc00', '#5752D1', '#00ccb9', '#ec7a08'];

  const setColor = colorsIndex => {
    return colorsIndex % 6;
  };

  return (
    <div style={{ height: '214px', width: '214px' }} className={props.className}>
      <ChartDonut
        ariaDesc="Cases in Procedure"
        constrainToVisibleArea={true}
        data={[
          { x: props.name, y: props.totalVal },
          { x: 'Remaining Procedures', y: val },
        ]}
        title={`${props.totalVal}`}
        subTitle={props.name}
        height={214}
        width={214}
        colorScale={[colors[setColor(props.idx)], '#BBB']}
        // TODO Is this style used?
        style={{ height: 100, width: 100 }}
      />
    </div>
  );
};

export { ThresholdChart };
