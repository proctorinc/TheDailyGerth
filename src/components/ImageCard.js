import Image from "next/image";
import { ChatCircle, PaperPlaneTilt } from "phosphor-react";
import { prettyDateFormat } from "../utils";
import RateImageComponent from "./RateImageComponent";
import ImageRatingsCollapsible from "./ImageRatingsCollapsible";
import FavoriteImageComponent from "./FavoriteImageComponent";

const ImageCard = ({ image }) => {
  const formattedDate = prettyDateFormat(image.date);
  var ratio = 1;

  return (
    <div className="card p-2">
      <Image
        alt={image.url}
        src={image.url}
        // layout={"fill"}
        // objectFit={"contain"}
        width={200}
        height={200 / ratio}
        layout="responsive"
        className="relative rounded-xl"
        onLoadingComplete={({ naturalWidth, naturalHeight }) =>
          (ratio = naturalWidth / naturalHeight)
        }
      />
      <div className="card-actions flow-root mt-1 mb-0">
        <div className="flex float-left">
          <RateImageComponent image={image} />
          <ChatCircle
            onClick={() => console.log("Pressed comment button!")}
            className="m-2 text-neutral"
            weight="regular"
            size={32}
          />
          <PaperPlaneTilt
            onClick={() => console.log("Pressed share button!")}
            className="m-2 text-neutral"
            weight="regular"
            size={32}
          />
        </div>
        <FavoriteImageComponent image={image} />
      </div>
      <h2 className="card-title px-2">{formattedDate}</h2>
      <div className="card-content px-2">
        <p>Look at this cat. Can you believe how chunky it is?</p>
        {/* <div className="badge badge-outline float-right text-gray-500">
            picture taken: {image.date}
          </div> */}
        <ImageRatingsCollapsible image={image} />
      </div>
    </div>
  );
};

export default ImageCard;
