import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useAsync } from 'react-async';
import { parseDate, doFilterByFieldAndValue, doFilterByStatus } from '@app/utils/utils';
import { FilterIcon, SearchIcon } from '@patternfly/react-icons';
import { HttpService } from '@app/services/httpService/HttpService';
import { TableMessages } from '@app/components/notFound/TableMessages';
import { TaskRunner } from '@app/pages/taskRunner/TaskRunner';
import _orderBy from 'lodash/orderBy';
import { SpinnerBullsEye } from '@app/components/notFound/SpinnerBullsEye';
import { NoCases } from '@app/components/notFound/NoCases';
import './Tasks.css';
import { RouteComponentProps } from 'react-router';
import {
  Toolbar,
  Stack,
  StackItem,
  PageSection,
  Pagination,
  ToolbarItem,
  ToolbarContent,
  InputGroup,
  TextInput,
  Select,
  SelectOption,
  SelectVariant,
  ButtonVariant,
  Button,
  ToolbarGroup,
} from '@patternfly/react-core';
import { Table, TableHeader, TableBody, TableVariant, textCenter } from '@patternfly/react-table';

const Tasks: React.FunctionComponent<RouteComponentProps> = ({ location, history }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({});

  /**
   * Pagination setup
   */
  const perPageOptions = [
    { title: '8', value: 8 },
    { title: '16', value: 16 },
    { title: '24', value: 24 },
    { title: '32', value: 32 },
  ];
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[0].value);
  const [rowStart, setRowStart] = useState(0);
  const [rowEnd, setRowEnd] = useState(8);

  const taskModalOpen = task => {
    setTask(task);
    setIsModalOpen(true);
  };

  // parse tasklist into table rows
  const doTaskListMap = useCallback(taskList => {
    const runTaskBtn = task => {
      return (
        <div onClick={() => taskModalOpen(task)}>
          <Button variant="link"> Run Task </Button>
        </div>
      );
    };
    return taskList.map(task => {
      return {
        cells: [
          task['correlationKey'],
          task['name'],
          task['status'],
          task['processInstanceDescription'],
          task['actualOwner'],
          task['id'],
          parseDate(task['createdOn']),
          task['status'] === 'Ready' ? runTaskBtn(task) : null,
        ],
      };
    });
  }, []);

  //set up table columns
  const columns = [
    'Case Id',
    'Task Name',
    'Status',
    'Type',
    'Task Owner',
    {
      title: 'Task Id',
      transforms: [textCenter],
      cellTransforms: [textCenter],
    },
    'CreatedOn',
    '',
  ];

  // load data from back end
  let emptyState = '';
  let rowsData, noData, rawData, rowNum;

  const { data, error, isPending, setData, reload } = useAsync({ promiseFn: HttpService.fetchTaskList });
  if (isPending) noData = TableMessages.showSpinner(8);
  if (error) noData = TableMessages.showError(error.message, 8);
  if (data) {
    rawData = data;
    rowNum = data.data.length;
    //emptyState returns '{}' if the data is empty
    emptyState = JSON.stringify(data.data);
    rowsData = _orderBy(data.data, ['correlationKey'], ['desc']);
  }

  const onSetPage = (evt, pageNumber) => {
    setPage(pageNumber);
    const start = (pageNumber - 1) * perPage;
    setRowStart(start);
    setRowEnd(start + perPage);
    setData(rawData);
  };

  const onPerPageSelect = (evt, perPage) => {
    setPerPage(perPage);
    setRowStart(0);
    setRowEnd(perPage);
    setPage(1);
    setData(rawData);
  };

  const taskModalClose = () => {
    setIsModalOpen(false);
    reload();
  };

  useEffect(() => {
    const polling = window.setInterval(() => {
      reload();
    }, 60 * 1000);
    return () => {
      window.clearInterval(polling);
    };
  }, [reload]);

  /**
   * Filter setup
   */
  const [isOpen, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterText, setFilterText] = useState('');

  const onFilterSelect = (event, selection) => {
    setSelected(selection);
    setIsExpanded(false);
  };

  const filterOptions = [
    { value: 'correlationKey', display: 'Filter By...', isPlaceholder: true },
    { value: 'correlationKey', display: 'Case Id' },
    { value: 'name', display: 'Task Name' },
    { value: 'processId', display: 'Case Type' },
  ];

  /**
   * Status setup
   */
  const [status, setStatus] = useState({ statusIsExpanded: false, statusSelected: '' });

  const statusOptions = [
    { value: 'Status', disabled: false, isPlaceholder: true },
    { value: 'Ready', disabled: false },
    { value: 'Completed', disabled: false },
    { value: 'InProgress', disabled: false },
    { value: 'Failed', disabled: false },
    { value: 'Exited', disabled: false },
    { value: 'Reserved', disabled: false },
    { value: 'Suspended', disabled: false },
    { value: 'Obsolete', disabled: false },
    { value: 'Created', disabled: false },
    { value: 'Error', disabled: false },
  ];

  const onStatusToggle = isOpen => {
    setStatus({ statusIsExpanded: isOpen, statusSelected: status.statusSelected });
  };

  const clearStatusSelection = () => {
    setStatus({
      statusSelected: '',
      statusIsExpanded: false,
    });
  };

  const onStatusSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder || selection == 'Status') {
      return clearStatusSelection();
    }
    setStatus({
      statusSelected: selection,
      statusIsExpanded: false,
    });
  };

  const filterData = useCallback(
    _rowsData => {
      const filteredData = doFilterByFieldAndValue(
        doFilterByStatus(_rowsData, 'status', status.statusSelected),
        selected,
        filterText,
      );
      const _filteredData = filteredData.slice(rowStart, rowEnd);
      if (_filteredData.length == 0) return TableMessages.showEmpty(8);
      return doTaskListMap(_filteredData);
    },
    [doTaskListMap, filterText, rowEnd, rowStart, selected, status.statusSelected],
  );

  useEffect(() => {
    // if it comes from the cases page, run the filterData for that case
    if (location?.state?.do) {
      const caseId = location?.state?.do;
      history.replace({ pathname: location.pathname, state: { do: '' } });
      setFilterText(caseId);
      setSelected('correlationKey');
      filterData(rowsData);
    }
  }, [location, history, rowsData, filterData]);

  return (
    <PageSection>
      <Stack>
        {isPending && <SpinnerBullsEye />}
        {emptyState.length > 2 && (
          <StackItem>
            <Toolbar id="data-toolbar-group-types">
              <ToolbarContent>
                <ToolbarGroup variant="filter-group">
                  <ToolbarItem>
                    <InputGroup>
                      <Select
                        variant={SelectVariant.single}
                        toggleIcon={<FilterIcon />}
                        onToggle={setIsExpanded}
                        onSelect={(e, selection) => onFilterSelect(e, selection)}
                        selections={[selected]}
                        isOpen={isOpen}
                      >
                        {filterOptions.map((option, index) => (
                          <SelectOption key={index} value={option.value} isPlaceholder={option.isPlaceholder}>
                            {option.display}
                          </SelectOption>
                        ))}
                      </Select>
                    </InputGroup>
                  </ToolbarItem>
                  <ToolbarItem>
                    <InputGroup>
                      <Button variant={ButtonVariant.control} aria-label="search button for search input">
                        <SearchIcon />
                      </Button>
                      <TextInput
                        value={filterText}
                        type="search"
                        onChange={txt => setFilterText(txt)}
                        aria-label="text input"
                      />
                    </InputGroup>
                  </ToolbarItem>
                </ToolbarGroup>
                <ToolbarGroup variant="filter-group">
                  <ToolbarItem>
                    <Select
                      variant={SelectVariant.single}
                      aria-label="Select Input"
                      onToggle={isOpen => onStatusToggle(isOpen)}
                      onSelect={(e, selection, isPlaceholder) => onStatusSelect(e, selection, isPlaceholder)}
                      selections={[status.statusSelected]}
                      isOpen={status.statusIsExpanded}
                    >
                      {statusOptions.map((option, index) => (
                        <SelectOption isDisabled={option.disabled} key={index} value={option.value} />
                      ))}
                    </Select>
                  </ToolbarItem>
                </ToolbarGroup>
                <ToolbarItem variant="pagination" alignment={{ default: 'alignRight' }}>
                  <Pagination
                    itemCount={rowNum}
                    perPage={perPage}
                    page={page}
                    onSetPage={onSetPage}
                    widgetId="pagination-options-menu-top"
                    onPerPageSelect={onPerPageSelect}
                    perPageOptions={perPageOptions}
                  />
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
            <Table
              isStickyHeader
              variant={TableVariant.compact}
              aria-label="Simple Table"
              cells={columns}
              rows={rowsData ? filterData(rowsData) : noData || []}
            >
              <TableHeader />
              <TableBody />
            </Table>
            <Toolbar>
              <ToolbarContent>
                <ToolbarItem variant="pagination" alignment={{ default: 'alignRight' }}>
                  <Pagination
                    itemCount={rowNum}
                    perPage={perPage}
                    page={page}
                    onSetPage={onSetPage}
                    widgetId="pagination-options-menu-top"
                    onPerPageSelect={onPerPageSelect}
                    perPageOptions={perPageOptions}
                  />
                </ToolbarItem>
              </ToolbarContent>
            </Toolbar>
          </StackItem>
        )}
        {emptyState.length === 2 && <NoCases />}
        {isModalOpen && (
          <TaskRunner
            isModalOpen={isModalOpen}
            task={task}
            caseId={task['correlationKey']}
            container={task['containerId']}
            onModalClose={taskModalClose}
          />
        )}
      </Stack>
    </PageSection>
  );
};

export { Tasks };
