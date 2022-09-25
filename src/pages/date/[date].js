import AuthRoute from "@components/flow/AuthRoute";
import Header from "@components/ui/Header";
import Container from "@components/ui/Container";
import CheckLoading from "@components/flow/CheckLoading";
import CardSkeleton from "@components/image/CardSkeleton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@components/image/Card";
import { fetchImageByDate } from "@api/firestore";
import ErrorPage from "next/error";
import Link from "next/link";
import { prettyDateFormat } from "../../utils/utils";

const DatePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  const getImage = async () => {
    const image = await fetchImageByDate(date);
    setImage(image);
    setLoading(false);
  };

  useEffect(() => {
    getImage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading && !image) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <AuthRoute>
      <Header />
      <Container>
        <CheckLoading isLoading={loading} renderOnLoading={<CardSkeleton />}>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/">
                  {/* But make "Home" be where it came from */}
                  <a className="btn btn-ghost btn-xs">Home</a>
                </Link>
              </li>
              <li>
                <a className="btn btn-ghost btn-xs">
                  {image ? prettyDateFormat(image.date) : ""}
                </a>
              </li>
            </ul>
          </div>
          <Card image={image} />
        </CheckLoading>
      </Container>
    </AuthRoute>
  );
};

export default DatePage;
