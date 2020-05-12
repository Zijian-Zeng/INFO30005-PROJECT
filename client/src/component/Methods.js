import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";

const myFetch = async (url, method, body) => {
	const res = await fetch("http://localhost:5000" + url, {
		method: method,
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
			"meetute-token": Cookies.get("meetute"),
		},
	});

	const msg = await res.json();
	return msg;
};

const AuthApi = createContext();

const UserContext = createContext();

const StaffContext = createContext();

const StudentContext = createContext();

export { AuthApi, UserContext, myFetch, StaffContext, StudentContext };
