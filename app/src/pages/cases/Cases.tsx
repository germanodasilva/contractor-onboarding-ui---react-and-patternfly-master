import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAsync } from 'react-async';
import { useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import { parseDate, doFilterByFieldAndValue, doFilterByStatus } from '@app/utils/utils';
import { HttpService } from '@app/services/httpService/HttpService';
import { TableMessages } from '@app/components/notFound/TableMessages';
import { FilterIcon, SearchIcon } from '@patternfly/react-icons';
import _orderBy from 'lodash/orderBy';
import { SpinnerBullsEye } from '@app/components/notFound/SpinnerBullsEye';
import { NoCases } from '@app/components/notFound/NoCases';
import { AbortCase } from '@app/components/abortCase/AbortCase';
import { AddTask } from '../taskRunner/AddTask';
import './Cases.css';
import {
  Table,
  TableHeader,
  TableBody,
  textCenter,
  TableVariant,
  classNames,
  Visibility,
} from '@patternfly/react-table';
import {
  Stack,
  StackItem,
  Pagination,
  PageSection,
  Toolbar,
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
import { RouteComponentProps } from 'react-router';

enum CaseStatus {
  PENDING, //0
  ACTIVE, // 1
  COMPLETED, // 2
  ABORTED, // 3
  SUSPENDED, //4
}

//page number
const perPageOptions = [
  { title: '8', value: 8 },
  { title: '16', value: 16 },
  { title: '24', value: 24 },
  { title: '32', value: 32 },
];

const Cases: React.FunctionComponent<RouteComponentProps> = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [page, setPage] = useState(1);
  const [rowStart, setRowStart] = useState(0);
  const [rowEnd, setRowEnd] = useState(8);
  /**
   * Abort Case Modal Open Code
   */
  const [isAbortCaseModalOpen, setAbortCaseModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  // TODO Bad need for a refactor. This can surely be an object
  const [type, setType] = useState('');
  const [caseId, setCaseId] = useState('');
  const [container, setContainer] = useState('');

  const [perPage, setPerPage] = useState(perPageOptions[0].value);

  /**
   * Status setup
   */
  const [status, setStatus] = useState({ statusIsOpen: false, statusSelected: undefined });

  // parse caselist into table rows
  const doCaseListMap = caseList => {
    return caseList.map(csObj => {
      const cs = csObj.key;
      const nextTaskName = csObj.value.value[0]?.name;
      return {
        cells: [
          cs['caseId'],
          cs['caseOwner'],
          CaseStatus[cs['caseStatus']],
          cs['caseDescription'],
          parseDate(cs['startedAt']),
          cs['slaCompliance'],
          nextTaskName,
          viewBtn(cs['caseId'], cs['type'], cs['containerId']),
          cs['type'],
          cs['containerId'],
        ],
        runTask: nextTaskName,
      };
    });
  };

  //set up table columns
  const columns = [
    { title: 'Case Id' },
    'Owner/Initiator',
    { title: 'Status' },
    'Type',
    { title: 'Start Date' },
    'SLA Due',
    'Next Task',
    { title: '', transforms: [textCenter], cellTransforms: [textCenter] },
    { title: 'Type Hidden', columnTransforms: [classNames(Visibility.hidden || '')] },
    { title: 'ContainerId Hidden', columnTransforms: [classNames(Visibility.hidden || '')] },
  ];

  // set up table rows
  // view case button on table row
  const viewBtn = (caseId, type, containerId) => {
    return (
      <div>
        <NavLink to={`${path}/${caseId}/${type}/${containerId}`}> View Case </NavLink>
      </div>
    );
  };

  /**
   * TODO - Move this to utilities file
   */
  const actionResolver = rowData => {
    // set up action menu for table rows
    const actionsArr = [
      {
        title: 'View Case Details',
        onClick: (event, rowId, rowData) => {
          history.push(`${path}/${rowData.cells[0]}/${rowData.cells[8]}/${rowData.cells[9]}`);
        },
      },
      {
        title: 'View Tasks',
        onClick: (event, rowId, rowData) => {
          history.push(`/tasks/`, { do: rowData.cells[0] });
        },
      },
    ];

    if (rowData.runTask) {
      actionsArr.push({
        title: 'Run Next Task',
        onClick: (event, rowId, rowData) => {
          history.push(`${path}/${rowData.cells[0]}/${rowData.cells[8]}/${rowData.cells[9]}`, { do: 'runTask' });
        },
      });
    }

    if (rowData.cells[8] === 'CASE') {
      actionsArr.push({
        title: 'Create Task',
        onClick: (event, rowId, rowData) => {
          addTaskModalOpen(rowData.cells[8], rowData.cells[0], rowData.cells[9]);
        },
      });
    }

    if (rowData.cells[2] === 'ACTIVE') {
      actionsArr.push({
        title: 'Abort Case',
        onClick: (event, rowId, rowData) => {
          abortCaseModalOpen(rowData.cells[8], rowData.cells[0], rowData.cells[9]);
        },
      });
    }

    return rowData.empty ? [] : actionsArr;
  };

  /**
   * Load data from back end
   */
  let emptyState = '';
  let rowsData, noData, rowNum, rawData;
  const { data, error, isPending, setData, reload } = useAsync({ promiseFn: HttpService.fetchCaseList });

  if (isPending) noData = TableMessages.showSpinner(9);

  if (error) noData = TableMessages.showError(error.message, 9);

  if (data) {
    // TODO This smells, why set rawData?
    rawData = data;
    rowNum = data.data.length;
    //emptyState returns '{}' if the data is empty
    emptyState = JSON.stringify(data.data);
    rowsData = _orderBy(data.data, ['key.caseId'], ['desc']);
  }

  /**
   * TODO - Refactor: Code duplication on next 15 lines with Tasks File Line:121
   * @param evt
   * @param pageNumber
   */
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

  useEffect(() => {
    const polling = window.setInterval(() => {
      reload();
    }, 60 * 1000);
    return () => window.clearInterval(polling);
  }, [reload]);

  const abortCaseModalOpen = (type, caseid, container) => {
    setType(type);
    setCaseId(caseid);
    setContainer(container);
    setAbortCaseModalOpen(true);
  };

  const abortCaseModalClose = () => {
    setAbortCaseModalOpen(false);
    reload();
  };

  const addTaskModalOpen = (type, caseid, container) => {
    setType(type);
    setCaseId(caseid);
    setContainer(container);
    setAddTaskModalOpen(true);
  };

  const addTaskModalClose = () => {
    setAddTaskModalOpen(false);
    reload();
  };

  /**
   * Filter setup
   */
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterText, setFilterText] = useState('');
  const filterOptions = [
    { value: 'caseId', display: 'Filter By...', isPlaceholder: true },
    { value: 'caseId', display: 'Case Id' },
    { value: 'caseOwner', display: 'Created by' },
    { value: 'caseDescription', display: 'Case Type' },
  ];

  const onToggle = isOpen => setIsOpen(isOpen);

  const onFilterSelect = (event, selection) => {
    setSelected(selection);
    setIsOpen(false);
  };

  const statusOptions = [
    { value: 'Status', display: 'Status', disabled: false, isPlaceholder: true },
    { value: 'PENDING', display: 'Pending', disabled: false },
    { value: 'ACTIVE', display: 'Active', disabled: false },
    { value: 'COMPLETED', display: 'Completed', disabled: false },
    { value: 'ABORTED', display: 'Aborted', disabled: false },
    { value: 'SUSPENDED', display: 'Suspended', disabled: false },
  ];

  const onStatusToggle = isOpen => {
    setStatus({ statusIsOpen: isOpen, statusSelected: status.statusSelected });
  };

  const clearStatusSelection = () => {
    setStatus({
      statusSelected: undefined,
      statusIsOpen: false,
    });
  };

  const onStatusSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder || selection === 'Status') {
      return clearStatusSelection();
    }
    setStatus({
      statusSelected: selection,
      statusIsOpen: false,
    });
  };

  /**
   * Filter data logic
   * @param _rowsData
   */
  const filterData = _rowsData => {
    const _filteredData = doFilterByFieldAndValue(
      doFilterByStatus(_rowsData, 'caseStatus', CaseStatus[status.statusSelected]),
      selected,
      filterText,
    );
    const filteredData = _filteredData.slice(rowStart, rowEnd);
    if (filteredData.length == 0) return TableMessages.showEmpty(8);
    return doCaseListMap(filteredData);
  };

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
                        onToggle={onToggle}
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
                      isOpen={status.statusIsOpen}
                    >
                      {statusOptions.map((option, index) => (
                        <SelectOption isDisabled={option.disabled} key={index} value={option.value}>
                          {option.display}
                        </SelectOption>
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
              actionResolver={rowData => actionResolver(rowData)}
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
      </Stack>
      {isAbortCaseModalOpen && (
        <AbortCase
          isModalOpen={isAbortCaseModalOpen}
          type={type}
          caseId={caseId}
          container={container}
          onModalClose={abortCaseModalClose}
        />
      )}
      {isAddTaskModalOpen && (
        <AddTask
          isModalOpen={isAddTaskModalOpen}
          type={type}
          caseId={caseId}
          container={container}
          onModalClose={addTaskModalClose}
        />
      )}
    </PageSection>
  );
};

export { Cases };
