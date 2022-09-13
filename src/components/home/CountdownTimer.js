import { useState } from "react";
import { getTodaysDate } from "@utils/utils";
import useUserRatingSnapshot from "@hooks/useUserRatingSnapshot";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState("0h 0m 0s");
  const userRating = useUserRatingSnapshot({
    imageData: { date: getTodaysDate() },
  });

  // Set the date we're counting down to
  var countDownDate = new Date(Date.now()).setHours(24, 0, 0, 0);

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for hours, minutes, and seconds
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    setCountdown(
      (hours > 0 ? `${hours}h ` : "") +
        (minutes > 0 ? `${minutes}m ` : "") +
        (seconds > 0 ? `${seconds}s` : "")
    );
  }, 1000);

  if (userRating?.value) {
    return (
      <div className="w-full text-center pb-3">
        <h1 className="text-sm text-base-300">
          Time until the next Daily Gerth
        </h1>
        <h1 className="text-3xl">{countdown}</h1>
      </div>
    );
  }
  return <></>;
};

export default CountdownTimer;
