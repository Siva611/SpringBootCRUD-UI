import React, {
	useEffect,
	useState,
	useRef,
} from "react";

import { useParams } from "react-router-dom";
import axios from "axios";


import {API_URL} from "../../api/StudentService";


export async function updatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

const StudentPofile = () => {
	const { id } = useParams();

// Img ref
    const inputRef = useRef();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		aadharNumber:"",
		photoUrl: "",
	});

	useEffect(() => {
		loadStudent();
	}, []);


	const loadStudent = async () => {
		try {
		const result = await axios.get(
			// `http://localhost:8080/students/student/${id}`
            `${API_URL}/student/${id}`
		);
		setStudent(result.data);
	} catch (error) {
		console.error("Error fetching student data:", error);
	}
	};

	// Trigger file selection
	const selectImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };


	 // Upload the selected image
	 const handleUpdatePhoto = async (file) => {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("id", id);

            await updatePhoto(formData);

            // Update the photo URL in the state to reflect the change
            setStudent((prev) => ({
                ...prev,
                photoUrl: `${API_URL}/image/${id}?updated_at=${new Date().getTime()}`
            }));

            console.log("Photo updated successfully!");
        } catch (error) {
            console.error("Error updating photo:", error);
        }
    };

return (

		<>
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								{/* <img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/> */}
								  <img className="rounded-circle img-fluid"
                                       style={{ width: 150 }}
                                       src={student.photoUrl ? `${API_URL.replace("/students", "")}${student.photoUrl}` : "default-profile.png"} 
                                     alt={`Profile photo of ${student.firstName}`} 
                                   />

								{/* <h5 className="my-3">
									{`${student.firstName} ${student.lastName}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div> */}

							      <div className="profile__metadata">
                                        <p className="profile__name">{student.firstName} {student.lastName}</p>
                                        <p className="profile__muted">JPG, GIF, or PNG. Max size of 10MB</p>
                                        <button onClick={selectImage} className="btn">
                                            <i className="bi bi-cloud-upload"></i> Change Photo
                                        </button>
                                 </div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											First Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.firstName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Aadhar Number
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.aadharNumber}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Department
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{student.department}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

            <form style={{ display: "none" }}>
                <input 
                    type="file" 
                    ref={inputRef} 
                    onChange={(event) => handleUpdatePhoto(event.target.files[0])} 
                    accept="image/*" 
                />
            </form>
	 </>
	);
};

export default StudentPofile;


