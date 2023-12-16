import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormComponent = ({
  newMessage,
  setNewMessage,
  errorMessage,
  handleSubmit,
  handleSort,
  handleDeleteAll,
  deletingAll,
  sortOrder,
}) => (
  <Form onSubmit={handleSubmit} className="mb-4 text-center">
    <Form.Group controlId="formMessage" className="mb-3">
      <Form.Control
        as="input"
        rows={2}
        placeholder="Type your message here"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      {errorMessage && <div className="text-danger mt-1">{errorMessage}</div>}
    </Form.Group>
    <div className="d-flex justify-content-center">
      <Button type="submit" variant="primary" className="m-1">
        Post
      </Button>
      <Button variant="warning" className="m-1" onClick={handleSort}>
        Sort! {sortOrder === "asc" ? <span>&darr;</span> : <span>&uarr;</span>}
      </Button>
      <Button
        variant="danger"
        onClick={handleDeleteAll}
        disabled={deletingAll}
        className="m-1"
      >
        Delete All!
      </Button>
    </div>
  </Form>
);

FormComponent.propTypes = {
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleDeleteAll: PropTypes.func.isRequired,
  deletingAll: PropTypes.bool.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default FormComponent;
