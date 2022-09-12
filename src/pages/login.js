import { useState, useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import Router from "next/router";
import Link from "next/link";
import { INVALID_EMAIL_ERROR } from "../consts/consts";
import SimpleHeader from "@components/ui/SimpleHeader";
import LoadingScreen from "@components/ui/LoadingScreen";

const Login = () => {
  const { currentUser, handleLogin, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      Router.push("/");
    }
  }, [currentUser]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-screen">
      <SimpleHeader />
      <div className="flex flex-col items-center justify-center flex-grow">
        <form
          className="form-control w-full max-w-xs bg-base-100"
          onSubmit={(event) => {
            event.preventDefault();
            clearError();
            handleLogin(email, password);
          }}
        >
          <h1 className="text-3xl text-center mb-8">Login</h1>
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
            <span className="label-text text-base-300">Password</span>
          </label>
          <input
            value={password}
            type="password"
            placeholder="password"
            className={
              error
                ? "input input-bordered text-error input-error rounded-lg"
                : "input input-bordered border-neutral text-base-content placeholder-base-content rounded-lg bg-neutral"
            }
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && error != INVALID_EMAIL_ERROR && (
            <label className="label">
              <span className="label-text-alt text-error">{error}</span>
            </label>
          )}
          <label className="label">
            <Link href="/activate" className="label-text-alt link link-hover">
              <h3
                className="text-sm mt-2 text-base-300"
                onClick={() => {
                  setLoading(true);
                  clearError();
                }}
              >
                First time? Activate your account
              </h3>
            </Link>
          </label>
          <input
            type="submit"
            className="btn btn-primary rounded-lg mt-3"
            value="Sign In"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
