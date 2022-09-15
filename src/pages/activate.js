import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";
import SimpleHeader from "@components/ui/SimpleHeader";
import ActivationConfirmationModal from "@components/modal/ActivationConfirmationModal";
import LoadingScreen from "@components/ui/LoadingScreen";
import Container from "@components/ui/Container";

const ActivateAccount = () => {
  const { sendActivationEmail, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-screen">
      <SimpleHeader />
      <Container size="xs" center>
        <form
          className="form-control"
          onSubmit={(event) => {
            event.preventDefault();
            clearError();
            const noError = sendActivationEmail(email);
            if (noError) {
              setIsModalOpen(true);
            }
          }}
        >
          <h1 className="text-3xl text-center mb-8">Activate</h1>
          <label className="label">
            <span className="label-text text-base-300">Email</span>
          </label>
          <input
            value={email}
            type="text"
            placeholder="email"
            className={
              error
                ? "input input-bordered text-error input-error rounded-lg"
                : "input input-bordered border-neutral text-base-content placeholder-base-content rounded-lg bg-neutral"
            }
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && (
            <label className="label">
              <span className="label-text-alt text-error">{error}</span>
            </label>
          )}
          <label className="label">
            <Link
              href="/login"
              className="label label-text-alt link link-hover"
            >
              <h3
                className="text-sm mt-2 text-base-300"
                onClick={() => {
                  setLoading(true);
                  clearError();
                }}
              >
                Already have an account? Login
              </h3>
            </Link>
          </label>
          <input
            type="submit"
            className="btn btn-primary rounded-lg mt-3"
            value="Activate"
          />
        </form>
        <ActivationConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Container>
    </div>
  );
};

export default ActivateAccount;
