import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import { AlertGroup, AlertActionCloseButton, AlertVariant, Alert } from '@patternfly/react-core';

const ToastAlert: React.FunctionComponent<{}> = () => {
  const [toastAlerts, setToastAlerts] = useState([]);
  const [alertCount, setAlertCount] = useState(0);

  //need useRef here to access current value in setTimeout function
  const toastAlertsRef = useRef(toastAlerts);
  toastAlertsRef.current = toastAlerts;

  const removeAlert = alert => setToastAlerts(toastAlertsRef.current.filter(a => a !== alert));

  useEffect(() => {
    const subscription = ToastAlertService.alertSubscribe()
      // TODO Sort out below suppression
      .subscribe(alert => {
        // add count index to alert so it can be removed
        alert.count = alertCount;
        // add alert to array
        setToastAlerts([alert, ...toastAlerts]);

        window.setTimeout(() => removeAlert(alert), 4000);
        setAlertCount(alertCount + 1);
      });
    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <AlertGroup isToast>
      {toastAlerts.map((alert, index) => {
        return (
          <Alert
            key={index}
            isLiveRegion
            variant={AlertVariant[alert.type]}
            title={alert.msg}
            actionClose={<AlertActionCloseButton title={alert.type} onClose={() => removeAlert(alert)} />}
          />
        );
      })}
    </AlertGroup>
  );
};

export { ToastAlert };
