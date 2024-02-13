import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../../validationSchema/loginValidation";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { setProfileData } from "../../redux/slices/profileSlice";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import { useDispatch } from 'react-redux'
import { logInApi } from "../../api";
import './Login.css'

const Loginpage = () => {
	const [passwordVisibile, setPasswordVisibile] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		control
	} = useForm({
		resolver: yupResolver(loginValidation),
		mode: "onTouched",
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const dispatch = useDispatch();
	const loginData = useMutation({
		mutationFn: (data) => logInApi(data),
		onSuccess: async (data) => {
			if (data.status === 1) {
				const decodedData = jwtDecode(data.token);
				localStorage.setItem("token", data.token);
				localStorage.setItem("userId", decodedData.user.userId);
				dispatch(setProfileData(decodedData));
			} else {
				toast.error(data.response);
			}
		},
		onError: (error) => {
			toast.error(error.message.split(":")[1]);
		},
	});

	const onSubmit = (data) => {
		loginData.mutate(data);
	};

	function togglePasswordVisiblity() {
		setPasswordVisibile(!passwordVisibile);
	}

	const preventEvents = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="maindiv">
				<div className="container flexdiv login-section">
					<Form
						id="form"
						className="form"
						onSubmit={handleSubmit(onSubmit)}>
						<div className="Logodiv">
							<h1>MetayB</h1>
							<h5 className="pt-2">Welcome back !</h5>
						</div>
						<Form.Group className="pt-2">
							<Form.Label htmlFor="InputEmail1">
								Email Address{" "}
								<span style={{ color: "red" }}>*</span>
							</Form.Label>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Form.Control
										{...field}
										type="text"
										id="InputEmail1"
										className="form-control col-md-3"
										aria-describedby="passwordHelpBlock"
										placeholder="Enter Email Address"
									/>
								)}
							/>
							{errors.email && (
								<p className="errormsg">
									{errors.email.message}
								</p>
							)}
						</Form.Group>
						<Form.Group className="iconposition pt-3">
							<Form.Label htmlFor="InputPassword1">
								Password <span style={{ color: "red" }}>*</span>
							</Form.Label>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<Form.Control
										{...field}
										type={
											passwordVisibile
												? "text"
												: "password"
										}
										id="InputPassword1"
										className="form-control col-md-3"
										aria-describedby="passwordHelpBlock"
										placeholder="Enter Password"
										onCut={preventEvents}
										onCopy={preventEvents}
										onPaste={preventEvents}
										maxLength={16}
									/>
								)}
							/>
							<div
								className="icons"
								onClick={() => togglePasswordVisiblity()}>
								{passwordVisibile ? (
									<BsFillEyeSlashFill />
								) : (
									<AiFillEye />
								)}
							</div>
							{errors.password && (
								<p className="errormsg">
									{errors.password.message}
								</p>
							)}
						</Form.Group>
						<Button
							disabled={loginData.isLoading}
							type="submit"
							id="Signin"
							className="primary-btn w-100 mt-4">
							{loginData.isLoading ? (
								<CircularProgress sx={{color: "#fff"}} />
							) : (
								"Sign In"
							)}
						</Button>
					</Form>
				</div>
			</div>
		</>
	);
};

export default Loginpage;
