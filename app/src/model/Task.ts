export interface Task {
  id: string;
  processInstanceId: number;
  activationTime?: string;
  containerId?: string;
  createdOn?: string;
  description?: string;
  name?: string;
  parentId?: number;
  priority?: number;
  processId?: string;
  skipable?: boolean;
  status?: string;
  subject?: string;
  correlationKey?: string;
  processInstanceDescription?: string;
  actualOwner?: string;
}
