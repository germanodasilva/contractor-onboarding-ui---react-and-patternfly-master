import * as React from 'react';
import { HttpService } from '@app/services/httpService/HttpService';
import { ToastAlertService } from '@app/services/alerts/ToastAlertService';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';

interface AbortCaseProps {
  type: string;
  caseId: string;
  container: string;
  isModalOpen: boolean;
  onModalClose: () => void;
}

const AbortCase: React.FunctionComponent<AbortCaseProps> = props => {
  const { type, caseId, container, onModalClose } = props;
  const isModalOpen = true;

  const handleSubmit = async () => {
    try {
      await HttpService.abortCase(type, caseId, container);
      ToastAlertService.createAlert({ msg: `Case ${caseId} aborted successfully`, type: 'success' });
      onModalClose();
    } catch (error) {
      ToastAlertService.createAlert({ msg: `Error Aborting Case: ${error}`, type: 'danger' });
    }
  };

  return (
    <Modal
      variant={ModalVariant.small}
      title="Abort Case"
      isOpen={isModalOpen}
      disableFocusTrap={true}
      onClose={onModalClose}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleSubmit}>
          Abort
        </Button>,
        <Button key="cancel" variant="secondary" onClick={onModalClose}>
          Cancel
        </Button>,
      ]}
    >
      Do you want to Abort Case {caseId} ?
    </Modal>
  );
};

export { AbortCase };
