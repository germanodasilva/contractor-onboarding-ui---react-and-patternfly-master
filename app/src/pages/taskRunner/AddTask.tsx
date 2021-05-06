import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HttpService } from '@app/services/httpService/HttpService';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import { TaskRunnerProps } from '@app/pages/taskRunner/TaskRunnerProps';
import {
  Modal,
  ModalVariant,
  Button,
  Form,
  FormGroup,
  CardBody,
  Card,
  PageSection,
  TextInput,
  TextContent,
  TextList,
  TextListItem,
  TextListVariants,
  TextListItemVariants,
} from '@patternfly/react-core';

const AddTask: React.FunctionComponent<TaskRunnerProps> = props => {
  const { type, caseId, container, onModalClose } = props;
  const [taskName, setTaskName] = useState('');
  const [caseRoles, setCaseRoles] = useState('');
  const [keyValue, setKeyValue] = useState([{ name: '', value: '' }]);

  const isModalOpen = true;

  const handleTaskName = value => setTaskName(value);
  const handleCaseRoles = value => setCaseRoles(value);

  const handleKeyValueObject = (text, idx, type) => {
    const _addKeyValue = keyValue.map((kv, indx) => {
      if (idx !== indx) return kv;
      kv[type] = text;
      return kv;
    });
    setKeyValue(_addKeyValue);
  };

  const addNewRow = () => {
    const _keyValue = [...keyValue, { name: '', value: '' }];
    setKeyValue(_keyValue);
  };

  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    try {
      const jsonData = keyValue.reduce((r, e) => {
        r[e.name] = e.value;
        return r;
      }, {});

      const response = await HttpService.addTask(jsonData, type || '', caseId, container, taskName, caseRoles);

      if (response) ToastAlertService.createAlert({ msg: `Task ${taskName} added successfully`, type: 'success' });
      else ToastAlertService.createAlert({ msg: 'Error Adding Task', type: 'danger' });

      onModalClose();
    } catch (error) {
      ToastAlertService.createAlert({ msg: `Error Adding Task: ${error}`, type: 'danger' });
    }
  };

  return (
    <Modal
      variant={ModalVariant.large}
      title="Add Task"
      isOpen={isModalOpen}
      disableFocusTrap={true}
      onClose={onModalClose}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleSubmit(onSubmit)} isDisabled={!(taskName && caseRoles)}>
          Create
        </Button>,
        <Button key="cancel" variant="secondary" onClick={onModalClose}>
          Cancel
        </Button>,
      ]}
    >
      <PageSection>
        <Card>
          <CardBody>
            <TextContent>
              <TextList component={TextListVariants.dl}>
                <TextListItem component={TextListItemVariants.dt}>Case Id</TextListItem>
                <TextListItem component={TextListItemVariants.dd}>{caseId}</TextListItem>
              </TextList>
            </TextContent>
            <Form className="table-wrapper" onSubmit={handleSubmit(onSubmit)} isHorizontal>
              <FormGroup label="Task Name" isRequired fieldId="simple-form-taskName">
                <TextInput
                  isRequired
                  aria-label="Task Name"
                  type="text"
                  id="simple-form-taskNam"
                  name="simple-form-email"
                  value={taskName}
                  onChange={text => handleTaskName(text)}
                />
              </FormGroup>
              <FormGroup label="Roles" isRequired fieldId="simple-form-roles">
                <TextInput
                  isRequired
                  aria-label="Role"
                  type="text"
                  id="simple-form-roles"
                  name="simple-form-roles"
                  value={caseRoles}
                  onChange={text => handleCaseRoles(text)}
                />
              </FormGroup>
              <FormGroup label="Data" isRequired fieldId="simple-form-data">
                <table>
                  <tbody>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                      <th>
                        <Button variant="secondary" key="confirm" onClick={addNewRow}>
                          {' '}
                          +{' '}
                        </Button>
                      </th>
                    </tr>
                    {keyValue.map((e, idx) => {
                      return (
                        <tr key={idx}>
                          <td>
                            <TextInput
                              id={`${idx}`}
                              aria-label="Name"
                              type="text"
                              name="name"
                              value={e.name}
                              onChange={text => handleKeyValueObject(text, idx, 'name')}
                            />
                          </td>
                          <td>
                            <TextInput
                              id={`${idx}`}
                              aria-label="Value"
                              type="text"
                              name="value"
                              value={e.value}
                              onChange={text => handleKeyValueObject(text, idx, 'value')}
                            />
                          </td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </PageSection>
    </Modal>
  );
};

export { AddTask };
