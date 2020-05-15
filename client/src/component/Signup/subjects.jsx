import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/autocomplete";
import { TextField, Chip } from "@material-ui/core";
import { myFetch } from "../Methods";

export default ({ setChosenSubjects, allSubjects }) => {
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
				onChange={(event, value) => setChosenSubjects(value)}
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
