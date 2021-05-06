import * as React from 'react';
import { Checkbox } from '@patternfly/react-core';
import TaskComponentProps from './TaskComponentInterfaces';
import { Controller } from 'react-hook-form';

const TaskCheckBox: React.FunctionComponent<TaskComponentProps> = props => {
  const { fieldData, control } = props;
  const name = fieldData.binding || fieldData.name;

  return (
    <Controller
      as={Checkbox}
      label={fieldData.label}
      aria-label={fieldData.label}
      id={fieldData.id}
      control={control}
      valueName={'isChecked'}
      defaultValue={fieldData.defaultValue || false}
      name={name}
      isDisabled={fieldData.readOnly}
    />
  );
};

export { TaskCheckBox };
