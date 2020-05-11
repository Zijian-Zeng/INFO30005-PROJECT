import React, { useState, useContext, useEffect } from "react";

import { UserContext, getUser } from "../Methods";
import Layout from "../Navigation/Layout";

import { myFetch } from "../Methods";
import Student from "./Student";
import Staff from "./Staff";
import Loading from "../Navigation/Loading";

export default () => {
	const [userInfo, setUserInfo] = useState(null);
	const [subjectInfo, setSubjectInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const {
		setSelectedRoute,
		setLoadingRoute,
		loadingRoute,
		detectAlert,
	} = useContext(UserContext);

	useEffect(() => {
		//Set Navigation to this page.
		setSelectedRoute("settings");
		setLoadingRoute(true);

		//Loading user information.
		const fetchUser = async () => {
			const res = await myFetch("/api/shared/users/info", "GET");
			setUserInfo(res);
			console.log(res);
			detectAlert(res);
			if (res.success) {
				detectAlert(
					res,
					false,
					`Welcome back! ${res.type} ${res.userInfo.firstName} ${res.userInfo.lastName}`
				);
			}

			return res.type;
		};

		const fetchSubject = async (type) => {
			if (type === "student") {
				const res = await myFetch("/api/student/subjects/all", "GET");
				setSubjectInfo(res);
				detectAlert(res);
				if (res.success) setLoadingRoute(false);

				console.log(res);
			} else {
				const res = await myFetch("/api/staff/subjects/all", "GET");
				setSubjectInfo(res);
				detectAlert(res);
				if (res.success) setLoadingRoute(false);
			}
		};
		const fetchData = async () => {
			const type = await fetchUser();
			fetchSubject(type);
		};
		fetchData();
	}, []);

	if (loadingRoute || !userInfo) {
		return <Layout />;
	}

	return (
		<Layout
			content={
				userInfo.type === "student" ? (
					<Student
						user={userInfo}
						mySubjects={subjectInfo}
						setMySubjects={setSubjectInfo}
					/>
				) : (
					<Staff
						user={userInfo}
						mySubjects={subjectInfo}
						setMySubjects={setSubjectInfo}
					/>
				)
			}
			type={userInfo.type}
		/>
	);
};
