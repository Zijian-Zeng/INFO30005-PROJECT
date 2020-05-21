import React, { useContext, useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import Skeleton from "@material-ui/lab/Skeleton";
import {
	Chart,
	ArgumentAxis,
	ValueAxis,
	BarSeries,
	Legend,
	Title,
} from "@devexpress/dx-react-chart-material-ui";

import { scaleBand } from "@devexpress/dx-chart-core";

import { Animation, Stack, ArgumentScale } from "@devexpress/dx-react-chart";

import { myFetch, UserContext } from "../Methods";

/***
 * Analytic page for staff.
 */
export default withWidth()(({ width }) => {
	const { user, detectAlert, setAlert, alert } = useContext(UserContext);
	const { userInfo } = user;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const largeScreen = isWidthUp("sm", width);

	const fetchAnalytic = async () => {
		setLoading(true);

		const res = await myFetch("/api/staff/analytic/consult", "GET");
		detectAlert(res);
		return res.consultTable;
	};

	//Updating consultations Information.
	useEffect(() => {
		fetchAnalytic().then((consultTable) => {
			if (!consultTable) return;
			setData(consultTable);
			setLoading(false);
			console.log(consultTable);
			console.log("??");
		});
	}, [alert.status]);

	//Developing, to be continued...
	if (loading)
		return (
			<div>
				<br />
				<br />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
				<Skeleton height={40} animation="wave" />
			</div>
		);

	return (
		<Paper>
			<Chart data={data}>
				<ArgumentScale factory={scaleBand} />
				<ArgumentAxis />
				<ValueAxis />

				<BarSeries
					name="TotalRegisteredNum"
					valueField="TotalRegisteredNum"
					argumentField="subjectCode"
				/>

				<BarSeries
					name="TotalSlotNum"
					valueField="TotalSlotNum"
					argumentField="subjectCode"
				/>
				<Animation />
				{largeScreen ? <Legend /> : null}
				<Stack />
				<Title text="Histogram of Consultation Available Slots vs Registered" />
			</Chart>
		</Paper>
	);
});
