import { BrowserRouter } from "react-router-dom";
import PublicApp from "./publicPaths";
import { useDispatch, useSelector } from "react-redux";
import AdminApp from "./adminPaths";
import Loader from "../components/Loader/Loader";
import { useLogout } from "../hooks";
import { useEffect } from "react";
import { removeProfileData } from "../redux/slices/profileSlice";
import { jwtDecode } from "jwt-decode";
import UserApp from "./userPath";


function RouteChecker() {
	const profileData = useSelector((state) => state.profile);
	const token = localStorage.getItem("token");
	const decodedData = token != null ? jwtDecode(token) : null;

	const { mutate, isLoading: logOutLoading } = useLogout();
	const dispatch = useDispatch();

	useEffect(() => {
		if (profileData.signedIn === true) {
			if (token === null) {
				dispatch(removeProfileData());
			} else {
				if (decodedData.exp * 1000 < new Date().getTime()) {
					mutate();
				}
			}
		}
	}, [token, decodedData, profileData.signedIn]);

	if (profileData.signedIn === false) {
		return <PublicApp />;
	} else {
		if (logOutLoading) {
			return <Loader />;
		} else {
			switch (profileData.profileData.user.role) {
				case 1:
					return <UserApp />;
				case 2:
					return <AdminApp />;
				default:
					return null;
			}
		}
	}
}

export default function RouterRender() {
	return (
		<BrowserRouter>
			<RouteChecker />
		</BrowserRouter>
	);
}
