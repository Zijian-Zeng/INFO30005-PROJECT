import { useState, useEffect, createContext } from "react";

const useFetch = (url, method, body) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(url, {
				method: method,
				body: JSON.stringify(body),
			});
			const data = await response.json();
			setData(data);
			setLoading(false);
		};
		fetchData();
	}, [url, method, body]);

	return [data, loading];
};

const AuthApi = createContext();

const UserContext = createContext();

export { useFetch, AuthApi, UserContext };
