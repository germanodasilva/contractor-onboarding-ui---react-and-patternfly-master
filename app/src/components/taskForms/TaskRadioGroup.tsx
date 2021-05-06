import * as React from 'react';
import { Radio } from '@patternfly/react-core';
import TaskComponentProps from '@app/components/taskForms/TaskComponentInterfaces';
import { Controller } from 'react-hook-form';

const TaskRadioGroup: React.FunctionComponent<TaskComponentProps> = props => {
  const { fieldData, control } = props;
  const name = fieldData.binding || fieldData.name;

  // TODO kind of works but how????  default doesn't display, double render after first submit
  // https://react-hook-form.com/api/#Controller
  /**
   * You need to either set defaultValue at the field-level or call useForm with defaultValues.
   * If your form will invoke reset with default values,
   * you will need to call `useForm` with defaultValues instead of setting the defaultValue on individual fields.
   */
  return (
    <div>
      {fieldData.options.map((option, idx) => (
        <Controller
          as={Radio}
          key={idx}
          id={fieldData.id}
          control={control}
          defaultValue={fieldData.defaultValue || 'false'}
          value={option.value}
          onChange={() => option.value}
          name={name}
          label={option.text}
          valueName="rtnvalue"
        />
      ))}
    </div>
  );
};

export { TaskRadioGroup };
