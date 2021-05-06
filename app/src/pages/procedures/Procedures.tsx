import * as React from 'react';
import { useAsync, Async } from 'react-async';
import { HttpService } from '@app/services/httpService/HttpService';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import './Procedures.css';
import { SpinnerBullsEye } from '@app/components/notFound/SpinnerBullsEye';
import { NoProcedureFound } from '@app/components/notFound/NoProcedureFound';
import { ImageZoom } from '@app/components/imageZoom/imageZoom';
import {
  Card,
  PageSection,
  Title,
  Modal,
  Grid,
  GridItem,
  ModalVariant,
  Button,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListCell,
  DataListToggle,
  DataListContent,
  DataListItemCells,
} from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

const Procedures: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const [expanded, setExpanded] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [indexValue, setIndex] = React.useState(0);

  const toCamelize = type => {
    return type[0].concat('', type.slice(1).toLowerCase());
  };

  // load data from back end
  const { data, error, isPending } = useAsync({ promiseFn: HttpService.fetchProceduresList });
  if (error) ToastAlertService.createAlert({ msg: `Error Fetching Procedures: ${error}`, type: 'danger' });

  const onToggle = id => {
    if (id === expanded) setExpanded('');
    else setExpanded(id);
  };

  const showCreateModal = index => {
    setIsModalOpen(true);
    setIndex(index);
  };

  const doCreate = async _value => {
    const caseData = [
      data?.data?.list[indexValue].type,
      data?.data?.list[indexValue].container,
      data?.data?.list[indexValue].id,
      data?.data?.list[indexValue].roles,
    ];
    setIsModalOpen(false);
    try {
      let response;
      if ('roles' in data?.data?.list[_value]) {
        response = await HttpService.createNewCase(caseData[0], caseData[1], caseData[2], caseData[3]);
      }
      //create case if there is/are no role/s present in the procedure
      else {
        response = await HttpService.createNewCase(caseData[0], caseData[1], caseData[2], []);
      }
      ToastAlertService.createAlert({ msg: `Case ${response.data} created successfully`, type: 'success' });
      history.push(`/cases/${response.data}/${data?.data?.list[_value].type}/${data?.data?.list[_value].container}`, {
        do: 'runTask',
      });
    } catch (error) {
      ToastAlertService.createAlert({ msg: `Error Creating Case: ${error}`, type: 'danger' });
    }
  };

  return (
    <PageSection>
      {isPending && <SpinnerBullsEye />}
      {data?.data?.list.length > 0 && (
        <DataList aria-label="Procedures">
          <Grid hasGutter>
            {data?.data?.list?.map((proc, index) => (
              <GridItem key={proc.id} span={12}>
                <Card isHoverable>
                  <DataListItem key={proc.id} aria-labelledby="ex-item1" isExpanded={expanded === 'idx' + index}>
                    <DataListItemRow>
                      <DataListToggle
                        onClick={() => onToggle('idx' + index)}
                        isExpanded={expanded === 'idx' + index}
                        id={'ex-toggle' + index}
                        aria-controls="ex-expand1"
                      />
                      <DataListItemCells
                        dataListCells={[
                          <DataListCell width={3} key="primary content">
                            <Title headingLevel="h3" size="xl">
                              <div>
                                <span className="proc-bold">Procedure:</span>
                                <span className="proc-normal">{proc.title}</span>
                              </div>
                            </Title>
                            <div>
                              <span className="proc-normal">{proc.desc}</span>
                            </div>
                            <div>
                              <span className="proc-bold">ID: </span>
                              <span className="proc-normal">{proc.id}</span>
                            </div>
                          </DataListCell>,
                          <DataListCell key="button" width={1} alignRight={true} className="text-align-right">
                            <Button onClick={() => showCreateModal(index)} variant="secondary" className="start-btn">
                              {' '}
                              Create New {toCamelize(proc.type)}
                            </Button>
                          </DataListCell>,
                        ]}
                      />
                    </DataListItemRow>
                    <DataListContent
                      aria-label="Primary Content Details"
                      id="ex-expand1"
                      isHidden={expanded != 'idx' + index}
                    >
                      <Title headingLevel="h4" size="xl">
                        Details
                      </Title>
                      <p className="spacer">{proc.details}</p>
                      <Title headingLevel="h4" size="xl">
                        Process Diagram
                      </Title>
                      {proc.processName && (
                        // TODO Is this optimal?
                        <Async
                          promiseFn={HttpService.fetchProcessImage}
                          id={proc.id}
                          callType={'getProcessImage'}
                          type={proc.type}
                          container={proc.container}
                        >
                          {({ data, error, isPending }) => {
                            if (isPending) return 'Loading...';
                            if (error) return `Something went wrong: ${error.message}`;
                            if (data)
                              return (
                                <ImageZoom>
                                  <div>
                                    <span dangerouslySetInnerHTML={{ __html: data.data }} />
                                  </div>
                                </ImageZoom>
                              );
                            return null;
                          }}
                        </Async>
                      )}
                    </DataListContent>
                  </DataListItem>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </DataList>
      )}
      {data?.data?.list.length === 0 && <NoProcedureFound />}
      <Modal
        variant={ModalVariant.small}
        title={`Create New ${data?.data?.list[indexValue]?.type}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actions={[
          <Button key="confirm" variant="primary" onClick={() => doCreate(indexValue)}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        You are creating a new {data?.data?.list[indexValue]?.type.toLowerCase()} for{' '}
        {data?.data?.list[indexValue]?.title}.
      </Modal>
    </PageSection>
  );
};

export { Procedures };
