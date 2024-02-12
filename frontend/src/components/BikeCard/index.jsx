import { useEffect } from "react";
import { useCompleteAssembleBike, useStartAssembleBike } from "../../hooks";
import "./BikeCard.css";
import { apiUrl } from "../../config";

const BikeCard = ({ bikeData, progressAssembleData }) => {
  const completeBikeAssembleFn = (assembleId) => {
    completeBikeAssembleMutate({ assembleId });
  };
  let currentTime = new Date();

  useEffect(() => {
    const checkRemainingTime = () => {
      if (progressAssembleData.length > 0) {
        const progressBikeData = progressAssembleData.find(
          (item) => item.bikeId === bikeData._id
        );
        if (progressBikeData) {
          const remainingTime =
            bikeData.assembleTime * 60 * 1000 -
            (currentTime - new Date(progressBikeData.startTime));

          if (remainingTime <= 0) {
            completeBikeAssembleFn(progressBikeData._id);
          }
        }
      }
    };

    const intervalId = setInterval(checkRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [progressAssembleData, bikeData, completeBikeAssembleFn]);

  const startBikeAssembleSuccessFn = (data) => {
    setTimeout(() => {
      console.log("started");
      completeBikeAssembleFn(data.assembleId);
    }, bikeData.assembleTime * 60 * 1000);
  };

  const startBikeAssembleFn = (bikeId) => {
    startAssembleBikeMutate({ bikeId, employeeId });
  };

  const { mutate: startAssembleBikeMutate, isLoading } = useStartAssembleBike(
    startBikeAssembleSuccessFn
  );
  const { mutate: completeBikeAssembleMutate } = useCompleteAssembleBike();
  const employeeId = localStorage.getItem("userId");

  return (
    <seciton className="bike-cardsection">
      <div>
        <img
          className="bike-image"
          src={apiUrl + bikeData.bikeImgPath}
          alt="bikelogo"
        />
      </div>
      <div className="content">
        <p>
          <b>Bike Name:</b> {bikeData.name}
        </p>
        <p>
          <b>Bike Assemble Time:</b> {bikeData.assembleTime} min
        </p>
      </div>
      <div>
        <button
          className={
            progressAssembleData.find((item) => item.bikeId === bikeData._id)
              ? "progress-btn primary-btn"
              : "Assemble primary-btn"
          }
          disabled={progressAssembleData.length > 0}
          onClick={() => startBikeAssembleFn(bikeData._id)}
        >
          {progressAssembleData.find((item) => item.bikeId === bikeData._id)
            ? "InProgress"
            : "Assemble"}
        </button>
      </div>
    </seciton>
  );
};

export default BikeCard;
