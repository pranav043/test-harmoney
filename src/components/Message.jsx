import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import TrashSvg from "./TrashSvg";
import { formatTimestamp } from "../utils/helpers";

const Message = ({ message, onDelete, isDeleting }) => (
  <div
    className="chat-container mb-3 d-flex p-1 pt-0 pb-1"
    style={chatContainerStyle}
  >
    <div className="chat-content m-2 mt-1" style={{ width: "100%" }}>
      <div className="chat-header">
        <div style={headerContainerStyle}>
          <strong style={{ fontSize: "1.2em", marginRight: "8px" }}>
            {message.source}
          </strong>
          <small style={{ fontSize: "0.8em", marginLeft: "auto" }}>
            {formatTimestamp(message.timestamp)}
          </small>
        </div>
      </div>
      <div className="chat-body" style={bodyStyle}>
        <p style={messageTextStyle}>{message.text}</p>
      </div>
    </div>
    <Button
      variant="outline-danger"
      onClick={() => onDelete(message.id)}
      disabled={isDeleting}
      className="delete-button btn-sm mr-3 align-self-end"
    >
      <TrashSvg />
    </Button>
  </div>
);

const chatContainerStyle = {
  border: "1px solid #ccc",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const headerContainerStyle = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #ccc",
  paddingBottom: "2px",
  marginBottom: "8px",
};

const bodyStyle = {
  wordWrap: "break-word",
  overflowWrap: "break-word",
};

const messageTextStyle = {
  whiteSpace: "pre-line",
  wordBreak: "break-word",
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
};

export default Message;
