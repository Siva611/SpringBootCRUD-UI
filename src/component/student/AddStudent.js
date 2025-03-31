import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../api/StudentService";


export async function updatePhoto(formData) {
    try {
        const response = await axios.put(`${API_URL}/photo`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating photo:", error.response?.data || error.message);
        throw error;
    }
}

export async function saveStudent(student) {
    return await axios.post(API_URL, student);
}

const AddStudent = () => {
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const [student, setStudent] = useState({
        
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        aadharNumber:"",
		    photoUrl: "",
    });

    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const  savedStudent  = await saveStudent(student);

			const { data: savedStudent } = await saveStudent(student);

            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("id", savedStudent.id);

                await updatePhoto(formData);
            }

         
            setStudent({
                
                firstName: "",
                lastName: "",
                email: "",
                department: "",
                aadharNumber:"",
				        photoUrl: "",
            });
            setFile(null);
            if (fileRef.current) fileRef.current.value = null;

            
            navigate("/view-students");

        } catch (error) {
            console.error("Error saving student:", error);
			alert(`Error: ${error.response?.data?.error || error.message}`);
        }
	};
		
    return (
             <div className="container d-flex justify-content-center align-items-center">
               <div className="col-md-6 p-4 shadow rounded bg-light">
                 <h2 className="text-center mb-4 text-primary">Add Student</h2>
                 <form onSubmit={handleSubmit}>
             
                 {/* <div className="mb-4">
                     <label className="form-label fw-bold">ID</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="id"
                       required
                       value={student.id}
                       onChange={handleInputChange}
                     />
                   </div> */}

                   <div className="mb-4">
                     <label className="form-label fw-bold">First Name</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="firstName"
                       required
                       value={student.firstName}
                       onChange={handleInputChange}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Last Name</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="lastName"
                       required
                       value={student.lastName}
                       onChange={handleInputChange}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Email</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="email"
                       name="email"
                       required
                       value={student.email}
                       onChange={handleInputChange}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Department</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="text"
                       name="department"
                       required
                       value={student.department}
                       onChange={handleInputChange}
                     />
                   </div>

                   <div className="mb-4">
                     <label className="form-label fw-bold">Aadhar Number</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="number"
                       name="aadharNumber"
                       required
                       value={student.aadharNumber}
                       onChange={handleInputChange}
                     />
                   </div>
             
                   <div className="mb-4">
                     <label className="form-label fw-bold">Profile Photo</label>
                     <input
                       className="form-control rounded-3 p-2"
                       type="file"
                       onChange={(event) => setFile(event.target.files[0])}
                       ref={fileRef}
                       name="photo"
                       required
                     />
                   </div>
             
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

export default AddStudent;
