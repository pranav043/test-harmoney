import { useState, useEffect, useCallback } from "react";
import FormComponent from "./components/Form";
import Message from "./components/Message";
import DeleteAllNotifier from "./components/DeleteAllNotifier";
import PaginationComponent from "./components/Pagination";
import { getMessages, postMessage, deleteMessage } from "./api/api";

const PAGE_SIZE = import.meta.env.VITE_PAGE_SIZE || 5;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingMessageId, setDeletingMessageId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingAll, setDeletingAll] = useState(false);
  const [deleteAllError, setDeleteAllError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchMessages = useCallback(async () => {
    try {
      const data = await getMessages();

      if (!Array.isArray(data)) {
        setErrorMessage(
          "Unable to connect to the server, please try again later!"
        );
        return;
      }
      const sortedMessages = data.sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime();
        const timestampB = new Date(b.timestamp).getTime();
        return sortOrder === "asc"
          ? timestampA - timestampB
          : timestampB - timestampA;
      });
      setMessages(sortedMessages);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      setErrorMessage(
        "Unable to connect to the server, please try again later. (" +
          error.response.data.detail +
          ")"
      );
    }
  }, [sortOrder]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMessages();
    };
    fetchData();
  }, [fetchMessages]);

  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage === "") {
      setErrorMessage("Message cannot be empty");
      return;
    }
    try {
      setErrorMessage("");
      await postMessage(trimmedMessage);
      fetchMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error submitting message:", error);
      setErrorMessage(
        "Error submitting message, please try later. (" +
          error.response.data.detail +
          ")"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingMessageId(id);
      const currentPageBeforeDelete = currentPage;
      await deleteMessage(id);
      await fetchMessages();
      const remainingMessagesOnPage = (messages.length - 1) % PAGE_SIZE;
      if (currentPage > 1 && remainingMessagesOnPage === 0) {
        setCurrentPage(currentPage - 1);
      } else if (
        currentPage > 1 &&
        messages.length < (currentPage - 1) * PAGE_SIZE + 1
      ) {
        setCurrentPage(currentPage - 1);
      } else {
        setCurrentPage(currentPageBeforeDelete);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setErrorMessage(
        "Error deleting message, please try later. (" +
          error.response.data.detail +
          ")"
      );
    } finally {
      setDeletingMessageId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (messages.length <= 0) {
      alert("No Message to Delete!");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all messages?"
    );
    if (confirmDelete) {
      setDeleteAllError(null);
      try {
        for (const message of messages) {
          await deleteMessage(message.id);
        }
        fetchMessages();
        setDeletingAll(true);
        setCurrentPage(1);
        setTimeout(() => {
          setDeletingAll(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting all messages:", error);
        setDeleteAllError(
          "Error deleting all messages, please try later. (" +
            error.response.data.detail +
            ")"
        );
        setDeletingAll(false);
      }
    }
  };

  const pageCount = Math.ceil(messages.length / PAGE_SIZE);
  const startIndex = Math.max(0, (currentPage - 1) * PAGE_SIZE);
  const endIndex = Math.min(startIndex + PAGE_SIZE, messages.length);
  const visibleMessages = messages.slice(startIndex, endIndex);

  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="text-left">
          Chat Board, by{" "}
          <a
            href="https://pranavgupta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pranav
          </a>
        </h1>
      </header>

      <FormComponent
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
        handleSort={handleSort}
        handleDeleteAll={handleDeleteAll}
        deletingAll={deletingAll}
        sortOrder={sortOrder}
      />

      <DeleteAllNotifier
        deletingAll={deletingAll}
        deleteAllError={deleteAllError}
      />

      {visibleMessages.length === 0 ? (
        <p>No messages</p>
      ) : (
        <div>
          {visibleMessages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onDelete={handleDelete}
              isDeleting={deletingMessageId === message.id}
            />
          ))}
        </div>
      )}

      <PaginationComponent
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        messagesLength={messages.length}
      />
    </div>
  );
};

export default App;
