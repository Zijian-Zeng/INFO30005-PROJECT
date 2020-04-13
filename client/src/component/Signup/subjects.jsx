import React from "react";
import Autocomplete from "@material-ui/lab/autocomplete";
import { TextField, Chip } from "@material-ui/core";

const subjects = ["COMP30023", "INFO30005", "TEST10000", "TEST10002"];

export default ({ setSubjects }) => {
	return (
		<div>
			<Autocomplete
				multiple
				id="size-small-filled-multi"
				size="small"
				options={subjects}
				getOptionLabel={(option) => option}
				defaultValue={[subjects[1]]}
				renderTags={(value, getTagProps) =>
					value.map((option, index) => (
						<Chip
							variant="outlined"
							label={option}
							size="large"
							{...getTagProps({ index })}
							color="primary"
							variant="default"
						/>
					))
				}
				onChange={(event, value) => setSubjects(value)}
				renderInput={(params) => {
					return (
						<TextField
							{...params}
							variant="filled"
							label="Subjects"
						/>
					);
				}}
			/>
		</div>
	);
};
