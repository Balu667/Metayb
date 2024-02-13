import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import {
  useGetAllEmployees,
  useGetAssembleBikes,
  useGetAssembleBikesByEmployeeId,
} from "../../../hooks";
import { DatePicker } from "@mui/x-date-pickers";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import Loader from "../../../components/Loader/Loader";

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [assembleBikeData, setAssembleBikeData] = useState([]);
  const [empProductionDate, setEmpProductionDate] = useState(moment());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [empAssembleBikeData, setEmpAssembleBikeData] = useState([]);

  const getAssembleBikesSuccessFn = (data) => {
    setAssembleBikeData(data);
  };

  const getAssembleBikesByEmpIdSuccessFn = (data) => {
    setEmpAssembleBikeData(data);
  };

  const { mutate: getAssembleBikesMutate, isLoading: getAssembleBikeLoading } =
    useGetAssembleBikes(getAssembleBikesSuccessFn);

  const { data: employeeData, isLoading: employeeLoading } =
    useGetAllEmployees();
    
  const { mutate: getAssembleBikesByEmpIdMutate } =
    useGetAssembleBikesByEmployeeId(getAssembleBikesByEmpIdSuccessFn);

  useEffect(() => {
    getAssembleBikesMutate({ startDate, endDate });
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedEmployee) {
      getAssembleBikesByEmpIdMutate({
        employeeId: selectedEmployee,
        date: empProductionDate,
      });
    }
  }, [selectedEmployee, empProductionDate, employeeLoading]);

  if (getAssembleBikeLoading || employeeLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard-section">
      <div>
        <div className="heading-section">
          <h3>Assemble bikes Reports</h3>
          <div className="datepicker-container">
            <p>Filter By :</p>
            <MobileDateTimePicker
              slotProps={{ textField: { size: "small" } }}
              className="date-picker"
              value={startDate}
              onChange={(e) => setStartDate(e)}
              label="From"
            />
            <MobileDateTimePicker
              slotProps={{ textField: { size: "small" } }}
              value={endDate}
              onChange={(e) => setEndDate(e)}
              label="To"
            />
          </div>
        </div>
        <div className="chart-section">
          {assembleBikeData && assembleBikeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="count"
                  isAnimationActive={false}
                  data={assembleBikeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
      <div>
        <div className="heading-section">
          <h3>Employee Production Graph</h3>
          <div className="datepicker-container">
            <p>Filter By :</p>
            <FormControl className="select-container">
              <InputLabel id="demo-simple-select-label">
                Select Employee
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedEmployee}
                label="Select Employee"
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                {employeeData &&
                  employeeData.map((employee) => {
                    return (
                      <MenuItem key={employee._id} value={employee._id}>
                        {employee.username}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <DatePicker
              slotProps={{ textField: { size: "small" } }}
              value={empProductionDate}
              onChange={(e) => setEmpProductionDate(e)}
              label="Production Date"
            />
          </div>
        </div>
        <div className="chart-section">
          {empAssembleBikeData && empAssembleBikeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="count"
                  isAnimationActive={false}
                  data={empAssembleBikeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
