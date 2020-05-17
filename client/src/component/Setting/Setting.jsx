import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Methods";
import Layout from "../Navigation/Layout";
import { myFetch } from "../Methods";
import Student from "./Student";
import Staff from "./Staff";

/***
 * The setting page.
 */
export default () => {
<<<<<<< HEAD
    const [subjectInfo, setSubjectInfo] = useState({});
    const {
        setSelectedRoute,
        setLoadingRoute,
        loadingRoute,
        detectAlert,
        fetchUser,
        user,
    } = useContext(UserContext);

    const fetchSubject = async (type) => {
        console.log(type);
        if (type === "student") {
            const res = await myFetch("/api/student/subjects/all", "GET");
            setSubjectInfo(res);
            detectAlert(res);
            if (res.success) setLoadingRoute(false);
=======
	const [subjectInfo, setSubjectInfo] = useState({});
	const {
		setSelectedRoute,
		setLoadingRoute,
		loadingRoute,
		detectAlert,
		fetchUser,
		user,
	} = useContext(UserContext);

	//Loading subject information.
	const fetchSubject = async (type) => {
		console.log(type);
		if (type === "student") {
			const res = await myFetch("/api/student/subjects/all", "GET");
			setSubjectInfo(res);
			detectAlert(res);
			if (res.success) setLoadingRoute(false);
>>>>>>> regina-front-end

			console.log(res);
		} else {
			const res = await myFetch("/api/staff/subjects/all", "GET");
			setSubjectInfo(res);
			detectAlert(res);
			if (res.success) setLoadingRoute(false);
		}
	};

<<<<<<< HEAD
    useEffect(() => {
        //Set Navigation to this page.
        setSelectedRoute("settings");
        setLoadingRoute(true);
        console.log(123);
=======
	useEffect(() => {
		//Set Navigation to this page.
		setSelectedRoute("settings");
		setLoadingRoute(true);
		console.log(123);
>>>>>>> regina-front-end

		const fetchData = async () => {
			const res = await fetchUser();
			if (res.success) {
				detectAlert(
					res,
					false,
					`Welcome back! ${res.type} ${res.userInfo.firstName} ${res.userInfo.lastName}`
				);
			}
			console.log(res);
			fetchSubject(res.type).then(() => setLoadingRoute(false));
		};
		fetchData();
	}, []);

	//Loading.
	if (loadingRoute || !user.type) {
		return <Layout />;
	}

	return (
		<Layout
			content={
				user.type === "student" ? (
					<Student
						user={user}
						mySubjects={subjectInfo}
						setMySubjects={setSubjectInfo}
					/>
				) : (
					<Staff
						user={user}
						mySubjects={subjectInfo}
						setMySubjects={setSubjectInfo}
						fetchSubject={fetchSubject}
					/>
				)
			}
			type={user.type}
		/>
	);
};
