import React from "react";

const Footer = () => {
  return (
    <footer 
    style={{ textAlign: "right", padding: "10px", position: "fixed", bottom: 0, right: 0, width: "100%", color:"#595C5F"}}>
      &copy; {new Date().getFullYear()} All rights reserved <img src="/images/jsp.png" width="40" height="40" alt=""></img>
    </footer>
  );
};

export default Footer;