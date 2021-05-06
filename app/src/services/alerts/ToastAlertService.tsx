import { Subject } from 'rxjs';

const alertSubject = new Subject();
const createAlert = alert => alertSubject.next(alert);

const alertSubscribe = () => {
  return alertSubject.asObservable();
};

export const ToastAlertService = {
  createAlert,
  alertSubscribe,
};
