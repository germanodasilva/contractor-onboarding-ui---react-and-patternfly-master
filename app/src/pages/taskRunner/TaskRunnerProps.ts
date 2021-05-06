import { Task } from '@app/model/Task';

export interface TaskRunnerProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  container: string;
  caseId: string;
  task?: Task;
  type?: string;
}
