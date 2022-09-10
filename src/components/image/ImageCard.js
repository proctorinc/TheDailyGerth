import Image from "next/image";
import { PaperPlaneTilt } from "phosphor-react";
import { getTodaysDate, prettyDateFormat } from "@utils/utils";
import SetRatingIcon from "./SetRatingIcon";
import RatingViewCollapsible from "./RatingViewCollapsible";
import ToggleFavoritedIcon from "./ToggleFavoritedIcon";
import { ICON_SIZE } from "@consts/consts";

const ImageCard = ({ image }) => {
  const formattedDate = prettyDateFormat(image.date);
  var ratio = 1;
  const readOnly = image.date != getTodaysDate();

  const handleSharing = async () => {
    const data = {
      url: `thedailygerth.web.app/daily?${image.date}/#${image.date}`,
      title: `The Daily Gerth: ${formattedDate}`,
    };
    if (navigator.share === undefined) {
      alert("This Browser does not support sharing. Please try Safari browser");
    }
    try {
      if (navigator.canShare(data)) {
        await navigator.share(data);
      } else {
        throw new Error("Can't Share data");
      }
    } catch (err) {}
  };

  return (
    <div id={image.date} className="card p-2">
      <div className="w-full">
        <Image
          id={image.url}
          alt={image.url}
          src={image.url}
          width={window.innerWidth}
          height={window.innerWidth}
          layout="responsive"
          className="relative rounded-lg"
          // onLoadingComplete={({ naturalWidth, naturalHeight }) =>
          //   (ratio = naturalWidth / naturalHeight)
          // }
        />
      </div>
      <div className="card-actions flow-root mt-1 mb-0">
        <div className="flex float-left">
          <SetRatingIcon image={image} readOnly={readOnly} />
          <PaperPlaneTilt
            onClick={() => handleSharing()}
            className="m-1 text-neutral"
            weight="regular"
            size={ICON_SIZE}
          />
        </div>
        <ToggleFavoritedIcon image={image} />
      </div>
      <div className="card-content px-2 text-sm">
        <h2 className="card-title text-md">{formattedDate}</h2>
        <RatingViewCollapsible image={image} />
      </div>
    </div>
  );
};

export default ImageCard;
