import Modal from "./Modal";

const ActivationConfirmationModal = ({ isOpen, onClose }) => {
  const headerText = "Activation Email Sent";
  const bodyText =
    "If you do not see this email, please check your spam folder";
  const buttonText = "ok";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={headerText}
      body={bodyText}
      button={buttonText}
    />
  );
};

export default ActivationConfirmationModal;
