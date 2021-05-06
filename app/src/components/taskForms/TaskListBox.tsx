import * as React from 'react';
import TaskComponentInterfaces from '@app/components/taskForms/TaskComponentInterfaces';
import { FormSelect, FormSelectOption } from '@patternfly/react-core';

import { Controller } from 'react-hook-form';

const TaskListBox: React.FunctionComponent<TaskComponentInterfaces> = props => {
  const { fieldData, errors, control } = props;
  const name = fieldData.binding || fieldData.name;

  // TODO add unselectable label
  return (
    <Controller
      as={
        <FormSelect id={fieldData.id} validated={errors[name] ? 'error' : 'default'} aria-label="FormSelect Input">
          {fieldData.options.map((option, index) => (
            <FormSelectOption isDisabled={fieldData.readOnly} key={index} value={option.value} label={option.text} />
          ))}
        </FormSelect>
      }
      isRequired={fieldData.required}
      name={name}
      control={control}
      defaultValue={fieldData.defaultValue || fieldData.options[0].value}
      rules={{ required: 'Required Value' }}
      isDisabled={fieldData.readOnly}
    />
  );
};

export { TaskListBox };
