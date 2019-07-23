import React from 'react';

const TextInput = ({ type, inputClass, describedby, placeholder, changed, name, value, required, isError, error }) => {
	return (
		<div className={`form-group ${isError ? 'has-danger' : ''}`}>
			<input
				type={type}
				className={inputClass}
				aria-describedby={describedby}
				placeholder={placeholder}
				onChange={changed}
				name={name}
				value={value}
				required={required}
			/>
			{isError ? <div className="invalid-feedback">{error.message}</div> : null}
		</div>
	);
};
export default TextInput;
