import "./Dashboard.css";
import {
  useGetAllBikes,
  useGetProgressAssembleBikesByEmployeeId,
} from "../../../hooks";
import BikeCard from "../../../components/BikeCard";
import Loader from "../../../components/Loader/Loader";

const UserDashboard = () => {
  let employeeId = localStorage.getItem("userId");
  const { data: bikeData, isLoading: bikeDataLoading } = useGetAllBikes();
  const { data: progressAssemblebikeData, isLoading: progressAssembleLoading } =
    useGetProgressAssembleBikesByEmployeeId(employeeId);

  if (bikeDataLoading || progressAssembleLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard-section">
      <div>
        <h1>Bikes</h1>
        <div className="bikes-section">
          {bikeData &&
            bikeData.map((bike) => {
              return (
                <BikeCard
                  key={bike._id}
                  bikeData={bike}
                  progressAssembleData={progressAssemblebikeData}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
