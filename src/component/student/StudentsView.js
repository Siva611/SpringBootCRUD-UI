import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

import {
	FaEdit,
	FaEye,
	FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";

import {API_URL} from "../../api/StudentService";

const StudentsView = () => {
	const [students, setStudents] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadStudents();
	}, []);

	const loadStudents = async () => {
		const result = await axios.get(
			// 'http://localhost:8080/students'
			   API_URL,
			{
				validateStatus: () => {
					return true;
				},
			}
		);
		if (result.status === 302) {
			setStudents(result.data);
		}
	};

	const handleDelete = async (id) => {
		await axios.delete(
			// `http://localhost:9192/students/delete/${id}`
			`${API_URL}/delete/${id}`
		);
		loadStudents();
	};

	return (
		<section>
			<Search
				search={search}
				setSearch={setSearch}
			/>

			<div class="table-responsive">

			  <table className="table table-bordered table-hover shadow">
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Image</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Depatment</th>
						<th>Aadhar Number</th>
						<th colSpan="3">Actions</th>
					</tr>
				</thead>

				<tbody className="text-center">
					{students
						.filter((st) =>
							st.firstName
								.toLowerCase()
								.includes(search)
						)
						.map((student, index) => (
							<tr key={student.id}>
								<th scope="row" key={index}>
									{index + 1}
								</th>
								<td><img className="rounded-circle img-fluid"
                                       style={{ width: 50 }}
                                       src={student.photoUrl ? `${API_URL.replace("/students", "")}${student.photoUrl}` : "default-profile.png"} 
                                   /></td>
								<td>{student.firstName}</td>
								<td>{student.lastName}</td>
								<td>{student.email}</td>
								<td>{student.department}</td>
								<td>{student.aadharNumber}</td>
								<td className="mx-2">
									<Link
										to={`/student-profile/${student.id}`}
										className="btn btn-info">
										<FaEye />
									</Link>
								</td>
								<td className="mx-2">
									<Link
										to={`/edit-student/${student.id}`}
										className="btn btn-warning">
										<FaEdit />
									</Link>
								</td>
								<td className="mx-2">
									<button
										className="btn btn-danger"
										onClick={() =>
											handleDelete(student.id)
										}>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>

		</section>
	);
};

export default StudentsView;
