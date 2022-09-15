import Modal from "./Modal";

const FeedbackConfirmationModal = ({ isOpen, onClose }) => {
  const headerText = "Feedback has been sent!";
  const bodyText =
    "Thank you for submitting your feedback! Please submit your thoughts anytime!";
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

export default FeedbackConfirmationModal;
