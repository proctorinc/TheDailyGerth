import { useAuth } from "../hooks/useAuth";
import AuthRoute from "../components/flow/AuthRoute";
import Header from "../../components/Header";

const favorites = () => {
  const { currentUser } = useAuth();

  return (
    <AuthRoute>
      <Header />
      <div>My favorites</div>
    </AuthRoute>
  );
};

export default favorites;
