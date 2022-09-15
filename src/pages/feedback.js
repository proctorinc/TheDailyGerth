import { useState } from "react";
import { sendFeedback } from "@api/firestore";
import FeedbackConfirmationModal from "@components/modal/FeedbackConfirmationModal";
import AuthRoute from "@components/flow/AuthRoute";
import Header from "@components/ui/Header";
import Container from "@components/ui/Container";

const Feedback = () => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthRoute>
      <div className="flex flex-col h-screen">
        <Header />
        <Container size="xs" center>
          <form
            className="form-control w-full bg-base-100"
            onSubmit={(event) => {
              event.preventDefault();
              setError(null);
              if (text.length > 0) {
                sendFeedback(text);
                setIsModalOpen(true);
                setText("");
              } else {
                setError("Enter feedback before submitting");
              }
            }}
          >
            <h1 className="text-3xl text-center mb-8">Feedback</h1>
            <label className="label">
              <span className="label-text text-base-200">
                Enter feedback about the app
              </span>
            </label>
            <textarea
              className={
                error
                  ? "textarea text-error border-error text-base-content placeholder-base-content rounded-lg"
                  : "textarea border-neutral text-base-content placeholder-base-content rounded-lg bg-neutral"
              }
              placeholder="What could be better?"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            {error && (
              <label className="label">
                <span className="label-text-alt text-error">{error}</span>
              </label>
            )}
            <input
              type="submit"
              className="btn btn-primary rounded-lg mt-3"
              value="Submit"
            />
          </form>
          <FeedbackConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Container>
      </div>
    </AuthRoute>
  );
};

export default Feedback;
