import * as React from 'react';
import { useAsync } from 'react-async';
import { Text, TextContent, PageSectionVariants, Bullseye, Flex, FlexItem, PageSection } from '@patternfly/react-core';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import { HttpService } from '@app/services/httpService/HttpService';
import { ThresholdChart } from '@app/components/dashboard/DonutChart';
import { DetailCards } from '@app/components/dashboard/DetailCards';
import { SpinnerBullsEye } from '@app/components/notFound/SpinnerBullsEye';
import { NoCases } from '@app/components/notFound/NoCases';
import './Dashboard.css';

const Dashboard: React.FunctionComponent<{}> = () => {
  const [procedureIndex, setReload] = React.useState(0);

  const changeIndex = i => setReload(i);

  // load data from back end
  const { data, error, isPending } = useAsync({ promiseFn: HttpService.getStats });
  if (error) ToastAlertService.createAlert({ msg: `Error Fetching Data: ${error}`, type: 'danger' });

  return (
    <React.Fragment>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h3">BUSINESS AUTOMATION</Text>
          <Text component="p">
            <b>Red Hat Process Automation Manager</b>
            <br />
            Develop cloud-native applications that automate business decisions and processes Red Hat® Process Automation
            Manager is a platform for developing containerized microservices and applications that automate business
            decisions and processes. Process Automation Manager includes business process management (BPM), business
            rules management (BRM), and business resource optimization and complex event processing (CEP) technologies.
            It also includes a user experience platform to create engaging user interfaces for process and decision
            services with minimal coding.
          </Text>
        </TextContent>
      </PageSection>
      <br />
      <PageSection variant={PageSectionVariants.light} className="section-padding">
        {isPending && <SpinnerBullsEye />}
        {data?.data?.totalInstances > 0 && (
          <TextContent>
            <Text component="h3">PAM Procedures</Text>
            <Bullseye>
              <div>
                <Flex>
                  {data?.data?.stats?.map((chart, index) => (
                    <FlexItem key={index} onClick={() => changeIndex(index)} height={100}>
                      <ThresholdChart
                        totalInstances={data?.data?.totalInstances}
                        totalVal={chart.total}
                        totalPercentOf={chart.totalPercentOf}
                        name={chart.name}
                        key={index}
                        idx={index}
                        className={procedureIndex === index ? 'active-qqq' : ''}
                      />
                    </FlexItem>
                  ))}
                </Flex>
              </div>
            </Bullseye>
          </TextContent>
        )}
        {data?.data?.totalInstances === 0 && <NoCases />}
      </PageSection>
      <br />
      <PageSection>
        {data?.data?.totalInstances > 0 && (
          <DetailCards
            totalOpen={data?.data?.stats[procedureIndex].totalOpen}
            totalClosed={data?.data?.stats[procedureIndex].totalClosed}
            totalAborted={data?.data?.stats[procedureIndex].totalAborted}
          />
        )}
      </PageSection>
    </React.Fragment>
  );
};

export { Dashboard };
