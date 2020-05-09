import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";

const useFetch = (url, method, token, body) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(url, {
				method: method,
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					"meetute-token": token,
				},
			});
			const data = await response.json();
			setData(data);
			setLoading(false);
		};
		fetchData();
	}, [url, method, body]);

	return [data, loading];
};

const myFetch = async (url, method, body) => {
	const res = await fetch(url, {
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

export { useFetch, AuthApi, UserContext, myFetch };
