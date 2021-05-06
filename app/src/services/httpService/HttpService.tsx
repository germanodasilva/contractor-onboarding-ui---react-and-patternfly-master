import axios from 'axios';
import { SSOUpdateToken } from '@app/services/sso/SSOProvider';
import { getConfig } from '@app/utils/config';
import { I } from './HttpServiceInterface';

const host = getConfig().REACT_APP_HOSTNAME || process.env.REACT_APP_HOSTNAME || 'http://localhost:8280';

const _axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

_axios.interceptors.request.use(async config => {
  const tokenResponse = await SSOUpdateToken();
  config.headers.Authorization = `Bearer ${tokenResponse}`;
  return config;
});

const HttpService: I = {
  fetchProcessImage: async ({ id, callType, type, container }) => {
    const axiosConfigSvg = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/svg+xml',
        Accept: 'application/svg+xml',
      },
    };
    const url = `${host}/contractor-onboarding/public/services/cases/${callType}/${type}?containerId=${container}&processId=${id}`;
    return _axios(url, axiosConfigSvg);
  },

  fetchCaseDetails: async (caseId, type, container) => {
    const url = `${host}/contractor-onboarding/public/services/cases/getCaseDetails/${type}?caseId=${caseId}&containerId=${container}`;
    let caseDetails = await _axios(url);
    const id = caseDetails.data?.processInstanceId;
    const callType = 'getProcessInstanceImage';

    const svg = await HttpService.fetchProcessImage({ id, callType, type, container })
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    caseDetails = caseDetails.data;
    return { caseDetails, svg };
  },

  fetchCaseList: async () => {
    const url = `${host}/contractor-onboarding/public/services/cases/getCaseList`;
    return _axios(url);
  },

  fetchTaskList: async () => {
    const url = `${host}/contractor-onboarding/public/services/cases/getTasksList`;
    return _axios(url);
  },

  fetchProceduresList: async () => {
    const url = `${host}/contractor-onboarding/public/services/procedures/getProceduresList`;
    return _axios(url);
  },

  createNewCase: async (type, container, id, roles) => {
    let url, string, dynRoles;
    if (roles.length === 0) {
      url = `${host}/contractor-onboarding/public/services/cases/createCase/${type}?containerId=${container}&processId=${id}`;
    }
    //roles are fixed here,  2 roles hard coded in else{}
    else {
      string = roles.map(role => `&roles=${role}`);
      dynRoles = string.join('');
      url = `${host}/contractor-onboarding/public/services/cases/createCase/${type}?containerId=${container}&processId=${id}${dynRoles}`;
    }
    return _axios(url);
  },

  getForm: async (taskId, container) => {
    const url = `${host}/contractor-onboarding/public/services/cases/getTaskForm/${taskId}?containerId=${container}`;
    return _axios(url);
  },

  getTaskDetails: async (processInstanceId, container) => {
    const url = `${host}/contractor-onboarding/public/services/cases/getTaskDetails/${processInstanceId}?containerId=${container}`;
    return _axios(url);
  },

  addTask: async (formInput, type, caseId, container, taskName, caseRoles) => {
    const url = `${host}/contractor-onboarding/public/services/cases/addDynamicTaskToCase/${type}?caseId=${caseId}&containerId=${container}&name=${taskName}&groups=${caseRoles}`;
    return _axios.post(url, formInput);
  },

  doTask: async (taskId, formInput, endpoint, container) => {
    const url = `${host}/contractor-onboarding/public/services/cases/${endpoint}/${taskId}?containerId=${container}`;
    return _axios.post(url, formInput);
  },

  addComment: async (comment, caseId, container) => {
    const url = `${host}/contractor-onboarding/public/services/cases/addComment/${caseId}?containerId=${container}`;
    return _axios.post(url, comment);
  },

  getStats: async () => {
    const url = `${host}/contractor-onboarding/public/services/dashboard/getDashboardStats`;
    return _axios(url);
  },

  abortCase: async (type, caseId, container) => {
    const url = `${host}/contractor-onboarding/public/services/cases/abortCase/${type}?caseId=${caseId}&containerId=${container}`;
    return _axios(url);
  },
};

export { HttpService };
