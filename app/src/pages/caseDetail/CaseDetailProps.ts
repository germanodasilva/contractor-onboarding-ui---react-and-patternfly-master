import { Task } from '@app/model/Task';
import { Comment } from '@app/model/Comment';

export interface CaseDetailsResponse {
  caseDetails: {
    caseInstanceVariables?: string[];
    processInstanceVariables?: object;
    milestones: object[];
    comments: Comment[];
    taskSummary: Task[];
    caseStatus: number;
  };
  svg: {
    data: string;
  };
}

export interface MatchParams {
  id: string;
  type: string;
  containerId: string;
}

export interface LocationParams {
  do: string;
}
