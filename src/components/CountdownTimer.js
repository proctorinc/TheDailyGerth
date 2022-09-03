import Spinner from "./Spinner";
import { useState } from "react";

const CountdownTimer = ({ isScreenLoading }) => {
  const [countdown, setCountdown] = useState();

  // Set the date we're counting down to
  var countDownDate = new Date(Date.now()).setHours(24, 0, 0, 0);

  //   .getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    setCountdown(hours + "h " + minutes + "m " + seconds + "s ");

    // If the count down is finished, write some text
    if (distance < 0) {
      setCountdown("0h 0m 0s");
    }
  }, 1000);

  return (
    <div className="w-full text-center pb-3">
      <h1 className="text-lg">Time until the next Gerth pic</h1>
      <h1 className="text-4xl">{countdown}</h1>
    </div>
  );
};

export default CountdownTimer;
