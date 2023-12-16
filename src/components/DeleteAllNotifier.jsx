import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

const DeleteAllNotifier = ({ deletingAll, deleteAllError }) => (
  <>
    {deletingAll && (
      <Alert key={"success"} variant={"success"}>
        Deleted all messages!
      </Alert>
    )}
    {deleteAllError && (
      <Alert key={"error"} variant={"danger"} className="text-danger">
        {deleteAllError}
      </Alert>
    )}
  </>
);

DeleteAllNotifier.propTypes = {
  deletingAll: PropTypes.bool.isRequired,
  deleteAllError: PropTypes.string,
};

export default DeleteAllNotifier;
