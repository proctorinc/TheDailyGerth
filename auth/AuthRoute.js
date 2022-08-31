import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const AuthRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const Router = useRouter();

  if (currentUser) {
    return <>{children}</>;
  } else {
    Router.push("/login");
    return <></>;
  }
};

export default AuthRoute;
