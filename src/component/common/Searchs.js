import React from "react";

const Search = ({ search, setSearch }) => {
	return (
		<div className="mb-3">
			<input
				className="form-control"
				type="search"
				placeholder="Search by email..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				style={{ width: "50%" }}
			/>
		</div>
	);
};

export default Search;
