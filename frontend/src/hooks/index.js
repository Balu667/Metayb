import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getAllBikes,
  startAssemblebike,
  completeAssemblebike,
  logoutUser,
  getProgressAssembleBikeByEmployee,
  getAllAssembleBikes,
  getAllEmployees,
  getAllAssembleBikesByEmpId,
} from "../api";
import { useDispatch } from "react-redux";
import { removeProfileData } from "../redux/slices/profileSlice";

const useGetAllBikes = () =>
  useQuery({
    queryKey: ["AllBikes"],
    queryFn: () => getAllBikes(),
  });

  const useGetAllEmployees = () =>
  useQuery({
    queryKey: ["AllEmployess"],
    queryFn: () => getAllEmployees(),
  });

const useStartAssembleBike = (onSucessFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => startAssemblebike(data),
    onSuccess: (data) => {
      onSucessFn(JSON.parse(data.data));
      queryClient.invalidateQueries({ queryKey: ["getProgressAssembleBikes"] });
      toast.success(data.response);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useCompleteAssembleBike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => completeAssemblebike(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["getProgressAssembleBikes"] });
      toast.success(response.response);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetProgressAssembleBikesByEmployeeId = (id) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["getProgressAssembleBikes", id],
    queryFn: ({ queryKey }) =>
      getProgressAssembleBikeByEmployee({ employeeId: queryKey[1] }),
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useLogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (id) => logoutUser(id),
    onSuccess: (response) => {
      toast.success(response.response);
      dispatch(removeProfileData());
      localStorage.clear();
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetAssembleBikes =  (onSucessFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => getAllAssembleBikes(data),
    onSuccess: (data) => {
      onSucessFn(JSON.parse(data.data));
      queryClient.invalidateQueries({ queryKey: ["getAssembleBikes"] });
      // toast.success(data.response);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

const useGetAssembleBikesByEmployeeId =  (onSucessFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => getAllAssembleBikesByEmpId(data),
    onSuccess: (data) => {
      onSucessFn(JSON.parse(data.data));
      // queryClient.invalidateQueries({ queryKey: ["getAssembleBikes"] });
      // toast.success(data.response);
    },
    onError: (error) => {
      toast.error(error.message.split(":")[1]);
    },
  });
};

export {
  useLogout,
  useGetAllBikes,
  useStartAssembleBike,
  useCompleteAssembleBike,
  useGetProgressAssembleBikesByEmployeeId,
  useGetAssembleBikes,
  useGetAllEmployees,
  useGetAssembleBikesByEmployeeId
};
