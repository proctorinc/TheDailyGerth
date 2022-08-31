import Router from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";

import AuthRoute from "../auth/AuthRoute";

export default function Home() {
  const { currentUser } = useAuth();

  // useEffect(() => {
  //   if (!currentUser) {
  //     Router.push("/login");
  //   }
  // }, [currentUser]);

  return (
    <AuthRoute>
      <div className="flex flex-col h-screen bg-red-100">
        <Header />
        <div>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        {/* <Footer /> */}
      </div>
    </AuthRoute>
  );
}
