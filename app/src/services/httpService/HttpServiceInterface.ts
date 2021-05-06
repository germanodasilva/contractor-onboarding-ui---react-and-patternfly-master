import { AxiosPromise } from 'axios';

type Response = [];

export interface I {
  fetchProcessImage({ id, callType, type, container }): AxiosPromise<object>;
  fetchCaseDetails(caseId: string, type: string, container: string): object;
  fetchCaseList(): AxiosPromise<Response>;
  fetchTaskList(): AxiosPromise<object>;
  fetchProceduresList(): AxiosPromise<object>;
  createNewCase(type: string, container: string, id: string, roles: string[]): AxiosPromise<object>;
  getForm(taskId: string, container: string): AxiosPromise<object>;
  getTaskDetails(processInstanceId: number, container: string): AxiosPromise<object>;
  addTask(
    formInput: object,
    type: string,
    caseId: string,
    container: string,
    taskName: string,
    caseRoles: string,
  ): AxiosPromise<object>;
  doTask(taskId: string, formInput: string, endpoint: string, container: string): AxiosPromise<object>;
  addComment(comment: string, caseId: string, container: string): AxiosPromise<object>;
  getStats(): AxiosPromise<object>;
  abortCase(type: string, caseId: string, container: string): AxiosPromise<object>;
}
