const SuccessModal = ({onOkClick}) => {
  return (
    <div>
      <h1>Success!</h1>
      <p>Your order submitted successfully.</p>
      <p>We will get back to you via email within the next few minutes.</p>
      <div className="modal-footer">
        <button className="button" onClick={onOkClick}>
          Ok
        </button>
      </div>
    </div>
  );
};
export default SuccessModal;