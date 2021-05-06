import * as React from 'react';
import { TextArea } from '@patternfly/react-core';
import TaskComponentProps from '@app/components/taskForms/TaskComponentInterfaces';
import { Controller } from 'react-hook-form';

const TaskTextArea: React.FunctionComponent<TaskComponentProps> = props => {
  const { fieldData, errors, control } = props;
  const name = fieldData.binding || fieldData.name;

  //TODO handle disabled
  return (
    <Controller
      as={TextArea}
      isRequired={fieldData.required}
      resizeOrientation="vertical"
      id={fieldData.id}
      name={name}
      control={control}
      defaultValue={fieldData.defaultValue}
      validated={errors[name] ? 'error' : 'default'}
      rules={{ required: fieldData.required ? 'Required Value' : false }}
    />
  );
};

export { TaskTextArea };
