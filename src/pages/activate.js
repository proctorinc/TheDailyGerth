import { useState } from "react";
import Link from "next/link";
import Header from "@components/ui/Header";
import { useAuth } from "@hooks/useAuth";
import ErrorAlert from "@components/ui/ErrorAlert";

const ActivateAccount = () => {
  const [email, setEmail] = useState("");
  const { sendActivationEmail, error } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <ErrorAlert value={error} />
        <div className="container card flex-shrink-0 w-full max-w-sm bg-base-100 sm:h-fit h-3/4">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                value={email}
                type="text"
                placeholder="email"
                className={
                  error
                    ? "input input-bordered placeholder-error text-error input-error rounded-lg"
                    : "input input-bordered rounded-lg"
                }
                onChange={(event) => setEmail(event.target.value)}
              />
              <label className="label">
                <Link href="/login" className="label-text-alt link link-hover">
                  Already have an account? Login
                </Link>
              </label>
            </div>
            <div htmlFor="my-modal" className="form-control mt-6">
              <label
                htmlFor="my-modal"
                className="btn btn-primary modal-button rounded-lg"
                onClick={() => sendActivationEmail(email)}
              >
                Activate
              </label>
            </div>
          </div>
        </div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <label htmlFor="my-modal" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Activation Email sent to:</h3>
            <h3 className="text-lg font-bold">{email}</h3>
            <p className="py-4">
              If you do not see this email, please check your spam folder
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                ok
              </label>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
};

export default ActivateAccount;
