const Modal = ({ isOpen, onClose, header, body, button }) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <label className="modal modal-open cursor-pointer">
      <label className="modal-box relative rounded-lg">
        <h3 className="text-lg font-bold">{header}</h3>
        <p className="py-4">{body}</p>
        <div className="modal-action">
          <label className="btn rounded-lg" onClick={onClose}>
            {button}
          </label>
        </div>
      </label>
    </label>
  );
};

export default Modal;
