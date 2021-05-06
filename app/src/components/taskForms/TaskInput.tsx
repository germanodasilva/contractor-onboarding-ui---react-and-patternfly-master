import * as React from 'react';
import { TextInput } from '@patternfly/react-core';
import TaskComponentProps from './TaskComponentInterfaces';

// TODO handle Integer
const TaskInput: React.FunctionComponent<TaskComponentProps> = props => {
  const { fieldData, register, errors, type } = props;
  const name = fieldData.binding || fieldData.name;
  return (
    <TextInput
      isRequired={fieldData.required}
      type={type}
      id={fieldData.id}
      aria-label={fieldData.name}
      aria-describedby={fieldData.label}
      name={name}
      defaultValue={fieldData.defaultValue}
      validated={errors[name] ? 'error' : 'default'}
      isDisabled={fieldData.readOnly}
      ref={register({
        required: fieldData.required ? 'Required Value' : false,
        maxLength: {
          value: fieldData.maxLength || 1000,
          message: `maximum number of characters is ${fieldData.maxLength}`,
        },
      })}
    />
  );
};

export { TaskInput };
