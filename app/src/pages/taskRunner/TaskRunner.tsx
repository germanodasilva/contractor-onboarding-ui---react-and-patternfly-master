import * as React from 'react';
import { useState, useLayoutEffect, Fragment, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TaskInput, TaskListBox, TaskCheckBox, TaskTextArea, TaskRadioGroup } from '@app/components/taskForms/';
import { HttpService } from '@app/services/httpService/HttpService';
import { TaskFormUtils } from '@app/utils/taskFormUtils';
import { WarningTriangleIcon } from '@patternfly/react-icons';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import { TaskRunnerProps } from '@app/pages/taskRunner/TaskRunnerProps';
import _ from 'lodash';
import './TaskRunner.css';
import {
  Form,
  FormGroup,
  Spinner,
  CardBody,
  Button,
  Card,
  PageSection,
  Text,
  TextVariants,
  Modal,
  TextContent,
  TextList,
  TextListItem,
  TextListVariants,
  TextListItemVariants,
} from '@patternfly/react-core';

const TaskRunner: React.FunctionComponent<TaskRunnerProps> = props => {
  //TODO add persistence to localstorage
  const validTaskFields = [
    'TextBox',
    'ListBox',
    'CheckBox',
    'TextArea',
    'IntegerBox',
    'DecimalBox',
    'RadioGroup',
    'DatePicker',
  ];
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [taskForm, setTaskForm] = useState([]);
  const [formData, setFormData] = useState([]);
  const { isModalOpen, onModalClose, task, container, caseId } = props;

  const updateForm = res => {
    setTaskForm(res.parsedFields);
    setFormData(res.form.data);
    setIsLoading(false);
  };

  const fetch = useCallback(async () => {
    try {
      const taskDetails = await HttpService.getTaskDetails(task.processInstanceId, container);
      const defaultInputs = taskDetails.data[0]?.taskInstance?.inputData;
      const form = await HttpService.getForm(task.id, container);
      const parsedFields = TaskFormUtils.parseTaskForm(form.data, defaultInputs);
      return { parsedFields, form };
    } catch (error) {
      return error;
    }
  }, [container, task.id, task.processInstanceId]);

  // TODO replace this with useAsync
  useLayoutEffect(() => {
    fetch()
      .then(res => updateForm(res))
      .catch(err => {
        setError(err.message);
        ToastAlertService.createAlert({ msg: `Error Fetching Task Form`, type: 'danger' });
        setIsLoading(false);
      });
  }, [container, fetch, task]);

  const { register, handleSubmit, watch, errors, control } = useForm();

  const onSubmit = async data => {
    try {
      // TODO fix this hack onthe backend
      // need different calls depending on task
      let endpoint = 'processTask';
      if (task?.name == 'Contractor informations' || task?.name == 'Chase for additional informations') {
        endpoint = 'processContractorTask';
      }

      if (!_.isEmpty(data)) {
        data = TaskFormUtils.setFormOut(formData, data);
      }
      const response = await HttpService.doTask(task?.id || '', JSON.stringify(data), endpoint, container);
      if (response) {
        ToastAlertService.createAlert({ msg: `Task ${task?.name} completed successfully`, type: 'success' });
        onModalClose();
      } else {
        ToastAlertService.createAlert({ msg: `Error Running Task: ${error}`, type: 'danger' });
      }
    } catch (error) {
      ToastAlertService.createAlert({ msg: `Error Running Task: ${error}`, type: 'danger' });
    }
  };

  const onTestSubmit = async () => {
    // inject data for testing
    try {
      // TODO fix this hack onthe backend
      // need different calls depending on task
      const endpoint = 'processContractorTask';
      const data = {
        contractorDetails: {
          employeeId: 'employ',
          token: 'token',
          employeeRegion: 'EMEA',
          manager: 'manager',
          managerEmail: 'memail',
          costCenter: 'cost',
          supplier: 'Accenture',
          employeeType: 'Employee',
          supplierEmail: 'vemail',
          requestorEmail: 'remail',
          firstName: 'Fintan',
          contactType: 'HOME',
          lastName: 'Smith',
          contactNumber: '12333',
          preferedName: 'bill',
          rHaccountExists: true,
          previousRHEmail: 'rhemil',
          alternativeEmail: 'altema',
          workLocation: 'RHSITE',
          workPhoneRequired: true,
          employeeCountry: 'ALLEMEA',
          classifiedAs: 'DESKASSI',
          workSite: 'REMIRE',
          jobTitle: 'Consultant',
          startDate: '12/12/2020',
        },
      };
      const response = await HttpService.doTask(task?.id || '', JSON.stringify(data), endpoint, container);
      if (response) {
        ToastAlertService.createAlert({ msg: `Task ${task?.name} completed successfully`, type: 'success' });
        onModalClose();
      } else {
        ToastAlertService.createAlert({ msg: `Error Running Task: ${error}`, type: 'danger' });
      }
    } catch (error) {
      ToastAlertService.createAlert({ msg: `Error Running Task: ${error}`, type: 'danger' });
    }
  };

  const renderFields = fields => {
    return fields.map((field, idx) => {
      if (validTaskFields.indexOf(field.code) < 0) return null;
      return (
        <Fragment key={idx}>
          {/* TODO format this better for sub forms */}
          <Text component={TextVariants.h3}>
            {field.level > 0 && (idx == 0 || fields[idx - 1].parent?.name != field.parent?.name)
              ? `Subform: ${field.parent?.label} - ${field.parent?.name}${
                  field.parent?.helpMessage ? ` - ${field.parent?.helpMessage}` : ``
                }`
              : null}
          </Text>
          <FormGroup
            style={{ marginLeft: `${field.level * 2}em` }}
            label={field.code !== 'CheckBox' ? field.label : null}
            isRequired={field.required}
            fieldId={field.id}
            helperText={field.helpMessage}
            helperTextInvalid={errors[field.binding || field.name]?.message}
            validated={errors[field.binding || field.name] ? 'error' : 'default'}
          >
            {field.code === 'TextBox' && (
              <TaskInput fieldData={field} type="text" register={register} errors={errors} watch={watch} />
            )}
            {field.code === 'DatePicker' && (
              <TaskInput fieldData={field} type="datetime-local" register={register} errors={errors} watch={watch} />
            )}
            {field.code === 'IntegerBox' && (
              <TaskInput fieldData={field} type="number" register={register} errors={errors} watch={watch} />
            )}
            {field.code === 'DecimalBox' && (
              <TaskInput fieldData={field} type="number" register={register} errors={errors} watch={watch} />
            )}
            {field.code === 'TextArea' && (
              <TaskTextArea fieldData={field} register={register} errors={errors} watch={watch} control={control} />
            )}
            {field.code === 'ListBox' && (
              <TaskListBox fieldData={field} register={register} errors={errors} watch={watch} control={control} />
            )}
            {field.code === 'RadioGroup' && (
              <TaskRadioGroup fieldData={field} register={register} errors={errors} watch={watch} control={control} />
            )}
            {field.code === 'CheckBox' && (
              <TaskCheckBox fieldData={field} register={register} errors={errors} watch={watch} control={control} />
            )}
          </FormGroup>
        </Fragment>
      );
    });
  };

  return (
    <Modal
      variant="large"
      title={`Task Name: ${task?.name}`}
      isOpen={isModalOpen}
      disableFocusTrap={true}
      onClose={onModalClose}
      className="taskModal"
      actions={
        task?.name == 'Contractor informations'
          ? [
              <Button key="debug" variant="tertiary" onClick={onTestSubmit}>
                Debug
              </Button>,
              <Button key="cancel" variant="secondary" onClick={onModalClose}>
                Cancel
              </Button>,
              <Button key="confirm" variant="primary" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>,
            ]
          : [
              <Button key="cancel" variant="secondary" onClick={onModalClose}>
                Cancel
              </Button>,
              <Button key="confirm" variant="primary" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>,
            ]
      }
    >
      <PageSection>
        <Card>
          {error && (
            <CardBody>
              <Text component={TextVariants.h3}>
                <WarningTriangleIcon color="#c9190b" size="lg" /> Error fetching Task Form: {error}
              </Text>
            </CardBody>
          )}

          {loading && (
            <div className="spinner-center">
              <Spinner className="spinner-center" size="md" />
            </div>
          )}

          {taskForm && (
            <CardBody>
              <TextContent>
                <TextList component={TextListVariants.dl}>
                  <TextListItem component={TextListItemVariants.dt}>Case Id</TextListItem>
                  <TextListItem component={TextListItemVariants.dd}>{caseId}</TextListItem>
                </TextList>
              </TextContent>

              <Form className="table-wrapper" onSubmit={handleSubmit(onSubmit)} isHorizontal>
                {renderFields(taskForm)}
              </Form>
            </CardBody>
          )}
        </Card>
      </PageSection>
    </Modal>
  );
};

export { TaskRunner };
