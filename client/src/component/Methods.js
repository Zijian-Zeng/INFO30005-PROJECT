import { useState, useEffect, createContext } from "react";

const useFetch = (url, method, token, body) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000" + url, {
				method: method,
				body: JSON.stringify(body),
				headers: {
					"meetute-token": token,
				},
			});
			const data = await response.json();
			setTimeout(() => {
				setData(data);
				setLoading(false);
			}, 500);
		};
		fetchData();
	}, [url, method, body]);

	return [data, loading];
};

const AuthApi = createContext();

const UserContext = createContext();

export { useFetch, AuthApi, UserContext };
