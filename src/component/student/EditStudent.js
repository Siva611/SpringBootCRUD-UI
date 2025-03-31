import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

import {API_URL} from "../../api/StudentService";

import {Link,useNavigate,useParams,} from "react-router-dom";

const EditStudent = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
    aadharNumber:"",
	});
	const {
		firstName,
		lastName,
		email,
		department,
    aadharNumber,
	} = student;

	useEffect(() => {
		loadStudent();
	}, []);

	const loadStudent = async () => {
		try{
		const result = await axios.get(
			// `http://localhost:8080/students/student/${id}`
			`${API_URL}/student/${id}`
		);
		setStudent(result.data);
		}
		catch (error) {
			console.error("Error fetching student data:", error);
		}
	};

	const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};
	const updateStudent = async (e) => {
		e.preventDefault();
		await axios.put(
			// `http://localhost:8080/students/update/${id}`,
			`${API_URL}/update/${id}`, 

			student
		);
		navigate("/view-students");
	};

	return (


		<div className="container d-flex justify-content-center align-items-center">
               <div className="col-md-6 p-4 shadow rounded bg-light ">
                 <h2 className="text-center mb-4 text-primary">Update Student</h2>
                 <form onSubmit={(e) => updateStudent(e)}>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">First Name</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="firstName"
                       required
					   value={firstName}
		     		  onChange={(e) => handleInputChange(e)}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Last Name</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="lastName"
                       required
                       value={lastName}
                       onChange={(e) => handleInputChange(e)}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Email</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="email"
                       name="email"
                       required
                       value={email}
                       onChange={(e) => handleInputChange(e)}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Aadhar Number</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="aadharNumber"
                       required
                       value={aadharNumber}
					             onChange={(e) => handleInputChange(e)}
                     />
                   </div>

                   <div className="mb-4">
                     <label className="form-label fw-bold">Department</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="department"
                       required
                       value={department}
					             onChange={(e) => handleInputChange(e)}
                     />
                   </div>
             
                   {/* <div className="mb-4">
                     <label className="form-label fw-bold">Profile Photo</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="file"
                       onChange={(event) => setFile(event.target.files[0])}
                       ref={fileRef}
                       name="photo"
                       required
                     />
                   </div> */}
             
                   <div className="d-flex justify-content-between">
                     <button type="submit" className="btn btn-primary btn-lg px-4 rounded-pill">
                       Save
                     </button>
                     <Link to={"/view-students"} className="btn btn-danger btn-lg px-4 rounded-pill">
                       Cancel
                     </Link>
                   </div>
                 </form>
               </div>
             </div>

	);
};

export default EditStudent;
