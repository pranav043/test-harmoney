import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const PaginationComponent = ({
  pageCount,
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  messagesLength,
}) => (
  <div className="text-center mt-3">
    {messagesLength > 0 && (
      <span className="m-1">
        Showing {startIndex + 1}-{endIndex} of {messagesLength}
      </span>
    )}
    {pageCount > 1 && messagesLength > 0 && (
      <>
        <Button
          variant="outline-secondary"
          size="sm"
          className="ml-2 m-1"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          className="ml-2 m-1"
          onClick={() =>
            setCurrentPage((prev) => Math.min(pageCount, prev + 1))
          }
          disabled={currentPage === pageCount}
        >
          Next
        </Button>
      </>
    )}
  </div>
);
PaginationComponent.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  messagesLength: PropTypes.number.isRequired,
};
export default PaginationComponent;
