import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import Router from "next/router";
import ErrorAlert from "../components/ErrorAlert";

const login = () => {
  const { currentUser, handleLogin, error, clearError, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      Router.push("/");
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <ErrorAlert value={error} />
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100 sm:h-fit h-3/4">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                value={email}
                type="text"
                placeholder="email"
                className="input input-bordered"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                value={password}
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(event) => setPassword(event.target.value)}
              />
              <label className="label">
                <a href="/activate" className="label-text-alt link link-hover">
                  First time? Activate your account
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={() => {
                  clearError();
                  handleLogin(email, password);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
