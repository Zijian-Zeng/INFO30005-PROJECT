import React, { useState, useContext, useEffect } from "react";

import { UserContext, useFetch, getUser } from "../Methods";
import Layout from "../Navigation/Layout";

import { myFetch } from "../Methods";
import Student from "./Student";
import Staff from "./Staff";
import Loading from "../Loading";

export default () => {
	const [userInfo, setUserInfo] = useState(null);
	const [subjectInfo, setSubjectInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const { setSelectedRoute } = useContext(UserContext);

	useEffect(() => {
		//Set Navigation to this page.
		setSelectedRoute("settings");

		//Loading user information.
		const fetchUser = async () => {
			const userInfo = await myFetch("/api/shared/users/info", "GET");
			setUserInfo(userInfo);
			return userInfo.type;
		};
		const fetchSubject = async (type) => {
			if (type === "student") {
				const subjects = await myFetch(
					"/api/student/subjects/all",
					"GET"
				);
				setSubjectInfo(subjects);
				setLoading(false);
			} else {
				const subjects = await myFetch(
					"/api/staff/subjects/all",
					"GET"
				);
				setSubjectInfo(subjects);
				setLoading(false);
			}
		};
		const fetchData = async () => {
			const type = await fetchUser();
			fetchSubject(type);
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loading />;
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
