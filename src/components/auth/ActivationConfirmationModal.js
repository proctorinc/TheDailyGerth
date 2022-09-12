const ActivationConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <label className="modal modal-open cursor-pointer">
      <label className="modal-box relative rounded-lg">
        <h3 className="text-lg font-bold">Activation Email Sent</h3>
        <p className="py-4">
          If you do not see this email, please check your spam folder
        </p>
        <div className="modal-action">
          <label className="btn rounded-lg" onClick={onClose}>
            ok
          </label>
        </div>
      </label>
    </label>
  );
};

export default ActivationConfirmationModal;
