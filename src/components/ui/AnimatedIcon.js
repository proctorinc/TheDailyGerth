import { useState } from "react";
import { Star } from "phosphor-react";
import { ICON_SIZE } from "@consts/consts";

const AnimatedIcon = ({ animation }) => {
  const [effect, setEffect] = useState(false);
  return (
    <label className="float-right p-1">
      <Star
        color="#fac011"
        weight="fill"
        size={ICON_SIZE}
        className={`${effect ? animation : ""} `}
        onClick={() => {
          setEffect(true);
        }}
        onAnimationEnd={() => setEffect(false)}
      />
    </label>
  );
};

export default AnimatedIcon;
