import * as React from 'react';
import './CaseDetail.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Tabs, Tab } from '@patternfly/react-core';
import { HttpService } from '@app/services/httpService/HttpService';
import { Table, TableHeader, TableBody, cellWidth } from '@patternfly/react-table';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import { TaskRunner } from '../taskRunner/TaskRunner';
import Stepper from 'react-stepper-horizontal';
import { AbortCase } from '@app/components/abortCase/AbortCase';
import { AddTask } from '../taskRunner/AddTask';
import { LocationParams, MatchParams } from '@app/pages/caseDetail/CaseDetailProps';
import { Task } from '@app/model/Task';
import { Comment } from '@app/model/Comment';
import { jsonToHTML } from '@app/utils/jsonToHTML';
import { SpinnerBullsEye } from '@app/components/notFound/SpinnerBullsEye';
import { ImageZoom } from '@app/components/imageZoom/imageZoom';
import {
  PageSection,
  PageSectionVariants,
  TabTitleText,
  Button,
  Flex,
  FlexItem,
  Text,
  TextVariants,
  TextContent,
  Card,
  CardBody,
  TextInput,
} from '@patternfly/react-core';

const CaseDetail: React.FC<RouteComponentProps<MatchParams, object, LocationParams>> = props => {
  const { match, location, history } = props;

  const [activeTabKey, setActiveTabKey] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [isAbortModalOpen, setAbortModalOpen] = useState<boolean>(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<object[]>([]);
  const [svgImg, setSvgImg] = useState({ data: '' });
  const [processVars, setProcessVars] = useState<object>({});
  const [caseVars, setCaseVars] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [msSteps, setMsSteps] = useState<object>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [task, setTask] = useState<Task>();
  const [status, setStatus] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(true);

  const columns = [
    { title: 'Milestone', transforms: [cellWidth(30)] },
    { title: 'Status', transforms: [cellWidth(20)] },
    { title: 'Achieved At', transforms: [cellWidth(30)] },
  ];
  const commentColumns = [
    { title: 'Author', transforms: [cellWidth(30)] },
    { title: 'Comment', transforms: [cellWidth(30)] },
    { title: 'Date/Time', transforms: [cellWidth(30)] },
  ];

  const handleTabClick = (event, tabIndex) => setActiveTabKey(tabIndex);

  const addComment = async () => {
    try {
      await HttpService.addComment(newComment, match.params.id, match.params.containerId);
      ToastAlertService.createAlert({ msg: `Comment added successfully`, type: 'success' });
      setNewComment('');
      setIsExpanded(false);
    } catch (error) {
      ToastAlertService.createAlert({ msg: `Error Adding Comment: ${error.message}`, type: 'danger' });
    }
  };

  // parse milestones into table rows
  const mapMilestones = milestones => {
    return milestones.map(ms => {
      return { cells: [ms.name, ms.status, ms.achievedAt] };
    });
  };

  const mapComments = comments => {
    return comments.map(com => {
      return { cells: [com.author, com.text, com.addedAt] };
    });
  };

  const fetchData = useCallback(async () => {
    return await HttpService.fetchCaseDetails(match.params.id, match.params.type, match.params.containerId);
  }, [match]);

  const updateUI = useCallback(
    ({ caseDetails, svg }) => {
      if (caseDetails) {
        setIsPending(false);
        setCaseVars(caseDetails.caseInstanceVariables ? caseDetails.caseInstanceVariables : []);
        setProcessVars(caseDetails.processInstanceVariables ? caseDetails.processInstanceVariables : {});
        setMilestones(caseDetails.milestones ? caseDetails.milestones : []);
        setComments(caseDetails.comments ? caseDetails.comments : []);
        setTask(caseDetails.taskSummary ? caseDetails.taskSummary[0] : {});
        setStatus(caseDetails.caseStatus ? caseDetails.caseStatus : 0);
        setActiveStep(0);
        setSvgImg(svg);

        const steps = caseDetails.milestones?.map(ms => {
          if (ms.status === 'Completed') setActiveStep(activeStep + 1);
          return { title: ms.name };
        });
        setMsSteps(steps);
      } else {
        ToastAlertService.createAlert({ msg: `Error fetching Case Details`, type: 'danger' });
      }
    },
    [activeStep],
  );

  // TODO why 2 useeffects?
  /**
   * Check for navigation from create case
   * Run task it if is
   */
  useEffect(() => {
    if (task && location?.state?.do === 'runTask') {
      history.replace({ pathname: location.pathname, state: { do: '' } });
      setIsTaskModalOpen(true);
    }
  }, [task, history, location]);

  const unmounted = useRef<boolean>(false);

  useEffect(() => {
    if (!unmounted.current)
      fetchData()
        // TODO This looks ugly too, do we need to readdress?
        .then(res => updateUI(res))
        .catch(err => {
          throw new Error(err);
        });
    return () => {
      unmounted.current = true;
    };
  }, [fetchData, updateUI]);

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light} className="top-section">
        {match.params.type === 'CASE' && (
          <TextContent>
            <Text component="h3"> Case Details </Text>
            {msSteps && <Stepper steps={msSteps} activeStep={activeStep} titleFontSize={10} />}
          </TextContent>
        )}
        <br />
        <Flex justifyContent={{ default: 'justifyContentFlexEnd' }}>
          {task && (
            <FlexItem>
              <Text className="inline-text" component={TextVariants.small}>
                Next Task:
              </Text>
              <Text className="inline-text" component={TextVariants.h2}>
                {' '}
                {task.name}
              </Text>
            </FlexItem>
          )}
          {match.params.type === 'CASE' && (
            <FlexItem>
              <Button className="task-button" onClick={() => setAddTaskModalOpen(true)} variant="secondary">
                Add Task
              </Button>
            </FlexItem>
          )}
          {task && (
            <FlexItem>
              <Button className="task-button" onClick={() => setIsTaskModalOpen(true)} variant="primary">
                Run Next Task
              </Button>
            </FlexItem>
          )}
          {status === 1 && (
            <FlexItem>
              <Button className="task-button" onClick={() => setAbortModalOpen(true)} variant="danger">
                Abort
              </Button>
            </FlexItem>
          )}
        </Flex>
      </PageSection>
      <PageSection>
        {isPending && <SpinnerBullsEye />}
        <Card>
          <Tabs activeKey={activeTabKey} onSelect={handleTabClick} className="details-tabs">
            <Tab eventKey={0} title={<TabTitleText> Details </TabTitleText>}>
              <Card>
                <CardBody>
                  <Flex direction={{ default: 'column' }}>
                    <FlexItem>{processVars && jsonToHTML(processVars, 0)}</FlexItem>
                    <FlexItem>{caseVars && jsonToHTML(caseVars, 0)}</FlexItem>
                  </Flex>
                </CardBody>
              </Card>
            </Tab>
            <Tab eventKey={1} title={<TabTitleText> Process Diagram </TabTitleText>}>
              <Card>
                <CardBody>
                  {svgImg && (
                    <ImageZoom>
                      <div>
                        <span dangerouslySetInnerHTML={{ __html: svgImg.data }} />{' '}
                      </div>
                    </ImageZoom>
                  )}
                </CardBody>
              </Card>
            </Tab>
            {match.params.type === 'CASE' && (
              <Tab eventKey={2} title={<TabTitleText> Milestones </TabTitleText>}>
                <Card>
                  <CardBody>
                    <Table
                      aria-label="Milestones Table"
                      cells={columns}
                      rows={milestones ? mapMilestones(milestones) : []}
                    >
                      <TableHeader className="spacerTop" />
                      <TableBody />
                    </Table>
                  </CardBody>
                </Card>
              </Tab>
            )}
            {match.params.type === 'CASE' && status != 3 && (
              <Tab eventKey={3} title={<TabTitleText> Comments </TabTitleText>}>
                <Card>
                  <CardBody>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                      <Flex>
                        {isExpanded && (
                          <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                            <FlexItem>
                              <Text component={TextVariants.h2}>New Comment :</Text>
                            </FlexItem>
                            <FlexItem>
                              <TextInput
                                value={newComment}
                                onChange={text => setNewComment(text)}
                                aria-label="Enter Comment"
                              />
                            </FlexItem>
                            <FlexItem>
                              <Button isDisabled={newComment === ''} variant="primary" onClick={addComment}>
                                Save
                              </Button>
                            </FlexItem>
                          </Flex>
                        )}
                      </Flex>
                      <Flex>
                        <FlexItem>
                          <Button onClick={() => setIsExpanded(!isExpanded)} variant="secondary">
                            {' '}
                            Add Comment{' '}
                          </Button>
                        </FlexItem>
                      </Flex>
                    </Flex>
                    {comments != undefined && (
                      <Table
                        aria-label="Comment Table"
                        cells={commentColumns}
                        rows={comments ? mapComments(comments).reverse() : []}
                      >
                        <TableHeader className="spacerTop" />
                        <TableBody />
                      </Table>
                    )}
                  </CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </Card>
        // TODO do not like wrapping these
        {isTaskModalOpen && (
          <TaskRunner
            isModalOpen={isTaskModalOpen}
            task={task}
            caseId={match.params.id}
            container={match.params.containerId}
            onModalClose={() => setIsTaskModalOpen(false)}
          />
        )}
        {isAbortModalOpen && (
          <AbortCase
            isModalOpen={isAbortModalOpen}
            type={match.params.type}
            caseId={match.params.id}
            container={match.params.containerId}
            onModalClose={() => setAbortModalOpen(false)}
          />
        )}
        {isAddTaskModalOpen && (
          <AddTask
            isModalOpen={isAddTaskModalOpen}
            type={match.params.type}
            caseId={match.params.id}
            container={match.params.containerId}
            onModalClose={() => setAddTaskModalOpen(false)}
          />
        )}
      </PageSection>
    </React.Fragment>
  );
};

export { CaseDetail };
