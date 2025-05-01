import React from "react";
import "./About.css";

function About() {
    // Function to split text into words and wrap each in a span
    const renderTextWithHover = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className="hover-word">
                {word} 
            </span>
        ));
    };

    return (
        <div className="about-container">
            <div className="about-header animate-fade-in">
                <h1>About Our Wildlife Conservation Project</h1>
            </div>
            <div className="about-content animate-fade-in">
                <p>
                    {renderTextWithHover(
                        "The Wildlife Conservation Project is a digital platform designed to streamline data management for wildlife researchers. Developed by Divyam Garg and Kunal Malik, under the guidance of Dr. Saurabh Shanu, Assistant Professor at the School of Computer Science, UPES, this tool empowers conservationists to securely upload, manage, and analyze field data."
                    )}
                </p>
                <p>
                    {renderTextWithHover(
                        "Our platform leverages AWS S3 for secure file storage and AWS RDS for efficient database management. With role-based access controls, researchers can collaborate seamlessly while ensuring data privacy. Features like CSV uploads, scanned datasheet processing, and data analytics help uncover trends such as species populations and habitat changes."
                    )}
                </p>
                <p>
                    {renderTextWithHover(
                        "Built with React for the frontend and Node.js for the backend, this project offers a modern, responsive interface. Whether you're tracking endangered species or monitoring ecosystems, our solution ensures your data is safe, accessible, and actionable—anytime, anywhere."
                    )}
                </p>
                <p>
                    {renderTextWithHover(
                        "Say goodbye to lost records and inefficient workflows. Join us in building a sustainable future for wildlife conservation through technology."
                    )}
                </p>
            </div>
        </div>
    );
}

export default About;