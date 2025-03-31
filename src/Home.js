import React from "react";
import logo from "./logo.png"; 

const Home = () => {
	return (

	<>
      <style>
				{`
					.home-container {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 70vh;
						text-align: center;
						background-color: #F5F5F5;
					}

					.home-logo {
						width: 200px;
						height: 200px;
					}

					.home-title {
						color: #1A254B;
						margin-top: 20px;
					}
				`}
	  </style>

		
		<div className="home-container">
			<img src={logo} alt="Student Portal Logo" className="home-logo" />
			<h2 className="home-title">Welcome to the JSP Student Portal</h2>
		</div>

		</>
	);
};

export default Home;


