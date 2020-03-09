import React from "react";
import { TextField } from "@material-ui/core";

export default ({ label, required, variant, setState, type }) => {
	let style = "filled";
	if (variant != null) style = "variant";
	return (
		<TextField
			variant={style}
			margin="normal"
			required={required}
			fullWidth
			id={label}
			label={label}
			autoComplete={label}
			type={type}
			onChange={(e) => {
				setState(e.target.value);
			}}
		/>
	);
};
