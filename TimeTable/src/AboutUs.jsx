// src/AboutUs.jsx
import React, { useEffect } from 'react';
import './AboutUs.css';
import photo from './pic.jpg';

const AboutUs = () => {
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { element: document.querySelector('.about-section'), delay: 0 },
                { element: document.getElementById('about-text'), delay: 200 },
                { element: document.getElementById('team-section'), delay: 400 },
                { element: document.getElementById('team-container'), delay: 600 },
                { element: document.getElementById('mission-section'), delay: 800 },
                { element: document.getElementById('mission-images'), delay: 1000 },
                { element: document.getElementById('mission-text'), delay: 1200 }
            ];

            sections.forEach(({ element, delay }) => {
                const sectionPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.5;

                if (sectionPosition < screenPosition) {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <section className="section about-section visible">
                <h1>About Us</h1>
            </section>

            <section className="section about-text" id="about-text">
                <p>
                    We are a passionate team of four individuals, each bringing a unique set of skills and experience to the table. Our diverse backgrounds in technology, design, and business drive our commitment to innovation and excellence. Together, we aim to create impactful solutions that enhance the lives of our customers and the communities we serve. We believe in collaboration, creativity, and the power of teamwork, which allows us to tackle challenges with a fresh perspective. Our mission is not just to succeed but to leave a lasting impact on the world around us.
                </p>
            </section>

            <section className="section team-section" id="team-section">
                <h2 style={{textAlign:"center"}}>Meet Our Team</h2>
            </section>

            <div className="section team-container" id="team-container">
                {['Daksh Jain', 'Bhaskar Kapase', 'Jainam Khanter', 'Nimesh Katudia'].map((name, index) => (
                    <div className="team-member" key={index} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                        <img src={photo} alt={name} />
                        <h3>{name}</h3>
                    </div>
                ))}
            </div>

            <section className="section mission-section" id="mission-section">
                <h2>Our Mission</h2>
            </section>

            <div className="section mission-images" id="mission-images">
                {['Daksh Jain', 'Bhaskar Kapase', 'Jainam Khanter', 'Nimesh Katudia'].map((name, index) => (
                    <img src={photo} alt={name} key={index} />
                ))}
            </div>

            <section className="section mission-text" id="mission-text">
                <p>
                    Our mission is to innovate and create solutions that make a difference in the world. We strive to exceed expectations and deliver exceptional value to our customers and the community. We focus on sustainable practices, ensuring that our work not only benefits our clients but also respects and nurtures the environment. By leveraging the latest technologies and fostering a culture of continuous improvement, we aim to lead the way in our industry while maintaining our commitment to integrity and social responsibility. Together, we envision a future where our contributions create a brighter, more sustainable world for all.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
