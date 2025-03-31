import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (

	<>	
		<style>
				{`
					.navbar {
						background-color: #1A254B;
						border-radius: 8px;
					}

					.navbar-brand, .nav-link {
						color: #E0E7FF !important;
						transition: color 0.3s ease-in-out;
					}

					.nav-link:hover {
						color: #EB6029 !important;
					}

					.navbar-toggler {
						border: 2px solid #EB6029 !important;
						background-color: transparent !important;
					}

					.navbar-toggler-icon {
						filter: invert(52%) sepia(75%) saturate(3666%) hue-rotate(349deg) brightness(93%) contrast(89%);
					}
				`}
			</style>


		<nav className="navbar navbar-expand-lg  mb-5 ">
			<div className="container-fluid">
				<Link className="navbar-brand" to={"/"} >
		        <img src="/images/jsp.png" width="60" height="60" alt=""></img>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation" >
					<span className="navbar-toggler-icon" ></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								className="nav-link active"
								aria-current="page"
								to={"/view-students"} >
								View All Student
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								to={"/add-students"} >
								Add new Students
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</>
	);
	
};

export default NavBar;
