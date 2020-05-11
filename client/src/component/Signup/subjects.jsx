import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/autocomplete";
import { TextField, Chip } from "@material-ui/core";
import { myFetch } from "../Methods";

export default ({ setSubject }) => {
	const [loading, setLoading] = useState(true);
	const [allSubjects, setAllSubjects] = useState([]);

	useEffect(() => {
		const fetchSubjects = async () => {
			const { subjectList } = await myFetch(
				"/api/shared/users/allSubjects",
				"GET"
			);
			setAllSubjects(subjectList);
			setLoading(false);
			console.log(subjectList);
		};
		fetchSubjects();
	}, []);

	if (loading) return null;
	console.log(allSubjects);

	return (
		<div>
			<Autocomplete
				multiple
				id="size-small-filled-multi"
				size="small"
				options={allSubjects}
				getOptionLabel={(option) => option}
				defaultValue={[allSubjects[1]]}
				renderTags={(value, getTagProps) =>
					value.map((option, index) => (
						<Chip
							label={option}
							size="medium"
							{...getTagProps({ index })}
							color="primary"
							variant="default"
						/>
					))
				}
				onChange={(event, value) => setSubject(value)}
				renderInput={(params) => {
					return (
						<TextField
							{...params}
							variant="outlined"
							label="Subjects"
						/>
					);
				}}
			/>
		</div>
	);
};
