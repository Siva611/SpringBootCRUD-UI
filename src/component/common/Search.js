import React, { useState, useEffect } from "react";
import {
	FaEdit,
	FaEye,
	FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Search = () => {
	const [students, setStudents] = useState([]); // Store students from API
	const [search, setSearch] = useState("");

	// Fetch students from backend
	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch("http://localhost:8080/students");
				const data = await response.json();

				// Ensure response is an array before setting state
				if (Array.isArray(data)) {
					setStudents(data);
				} else {
					console.error("API response is not an array:", data);
					setStudents([]);
				}
			} catch (error) {
				console.error("Error fetching students:", error);
				setStudents([]);
			}
		};

		fetchStudents();
	}, []);

	// Filter students by email
	const filteredStudents = students.filter(
		(student) =>
			student.email &&
			student.email.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="container">
			<h2 className="mt-3">Student Search</h2>

			{/* Search Input */}
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

			{/* Show Table Only If Search Input Has Text */}
			{search && (
				<>
					{filteredStudents.length > 0 ? (
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Name</th>
									<th>Depatment</th>
									<th>Aadhar Number</th>
									<th>Email</th>
									<th>View</th>
								</tr>
							</thead>
							<tbody>
								{filteredStudents.map((student) => (

                                 <tr key={student.id}>
                                       
										{/* <td>{student.id}</td> */}

										<td>
										<span style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
										      {student.firstName}
										</span>
											
										</td>
										<td>
										<span style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
										       {student.department}
										</span>
										</td>
										<td>
										<span style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
										      {student.aadharNumber}
										</span>

                                        </td>
										<td>
		
											{student.email.toLowerCase().includes(search.toLowerCase()) ? (
												<span style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
													{student.email}
												</span>
											) : (
												student.email
											)}
										</td>
										<td className="mx-2">
									        <Link
										      to={`/student-profile/${student.id}`}
										       className="btn btn-info">
										      <FaEye />
									        </Link>
								        </td>
									</tr>
								))}
							</tbody>
						</table>
					) : (

						<p style={{ color: "red", fontWeight: "bold" }}>No matching Records Found in JSP Student Portal.</p>
		
					)}
				</>
			)}
		</div>
	);
};

export default Search;
