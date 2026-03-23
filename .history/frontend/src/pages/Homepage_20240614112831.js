import React, { useState ,useRef} from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/uni.jpg";
import ComputerScienceImage from '../assets/computer_science.jpg';
import GeoImage from '../assets/geo.jpg';
import TechImage from '../assets/tech.jpg';
import AgriImage from '../assets/agri.jpg';
import ManagementImage from '../assets/market.jpg';
import MedicineImage from '../assets/med.jpg';
import BannerImage from '../assets/homebg.png';
import AppliedImage from '../assets/applied.jpg';
import logo from '../assets/unilogo.png'
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material"
import SocialImage from '../assets/social.jpg';
import { BlueButton, LightPurpleButton } from '../components/buttonStyles';


const Homepage = () => {
  
  const coursesSectionRef = useRef(null);
  const welcomeSectionRef = useRef(null);
  const facultySectionRef = useRef(null);
  const contactSectionRef=useRef(null);

    const scrollToCourses = () => {
        coursesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToWelcome = () => {
      welcomeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFaculty = () => {
    facultySectionRef.current.scrollIntoView({ behavior: 'smooth' });
};
const scrollToContact = () => {
  contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
};
    return (
        <div>
            <Navbar style={{ backgroundColor: '#080a43', marginTop:'0%', paddingTop:'0%' }}>
                <NavBrand to="/"><img src={logo}alt=""  style={{ width: '25%',height:'50%',margin:'0%'}}/></NavBrand>
                <NavLinks>
                <NavLink to="/" onClick={scrollToWelcome}>About</NavLink>
                <NavLink to="/" onClick={scrollToCourses}>Courses</NavLink>
                <NavLink to="/" onClick={scrollToFaculty}>Faculty</NavLink>
                <NavLink to="/" onClick={scrollToContact}>Contact</NavLink>
                </NavLinks>
            </Navbar>

            <Banner src={BannerImage} alt="Banner" />
            
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <img src={Students} alt="students" style={{ width: '100%', paddingTop: '60px', paddingLeft:'30px' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                        <StyledTitle ref={welcomeSectionRef}>
                                WELCOME TO 
                            </StyledTitle>

                            <StyledTitle1 ref={welcomeSectionRef}>
                                University Management System
                            </StyledTitle1>
                            <StyledText>
                                Streamline University management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.The system will support user management for students, faculty, and administrative staff. It will maintain detailed profiles for each user, capturing essential information such as personal details, academic history, and roles within the university. Role-based access control will be implemented to ensure that each user has appropriate permissions, safeguarding sensitive information and maintaining privacy across the system.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <BlueButton variant="contained" fullWidth>
                                        Login
                                    </BlueButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{ mt: 2, mb: 3, color: "#00008B", borderColor: "#00008B" }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                                <StyledText>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{ color: "#00008B" }}>
                                        Sign up
                                    </Link>
                                </StyledText>
                            </StyledBox>
                        </StyledPaper>
                    </Grid>
                </Grid>
                <div ref={coursesSectionRef}>
                <CoursesSection>
                <h2><u>Explore Our Courses</u></h2>
                <CoursesGrid>
                    <CourseCard style={{ backgroundImage: `url(${ComputerScienceImage})` }}>
                        <h3>Computing</h3>
                        <p>Computing courses offer a comprehensive exploration of computer science principles, programming languages, and software engineering practices. </p>
   
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${GeoImage})` }}>
                        <h3>Geomatics</h3>
                        <p>Geomatics courses focus on the study of geographic information systems (GIS), remote sensing, and cartography. Students explore techniques for acquiring, .</p>
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${TechImage})` }}>
                        <h3>Technology</h3>
                        <p>Technology courses explore the latest advancements in computing, engineering, and applied sciences, preparing students for careers at the forefront of innovation. </p>
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${AgriImage})` }}>
                        <h3>Agriculture</h3>
                        <p>Agriculture courses cover a broad range of topics related to the science, technology, and management of food and fiber production.  </p>
   
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${ManagementImage})` }}>
                        <h3>Mnagement Studies</h3>
                        <p>Management studies courses encompass the principles and practices essential for effective organizational leadership and strategic decision-making</p>
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${AppliedImage})` }}>
                        <h3>Applied Sciences</h3>
                        <p>Applied sciences involve the practical application of scientific knowledge to solve specific problems in various fields. .</p>
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${MedicineImage})` }}>
                        <h3>Medicine</h3>
                        <p>Medical science courses provide comprehensive training in various aspects of healthcare, including anatomy, physiology, pathology, and pharmacology</p>
                    </CourseCard>
                    <CourseCard style={{ backgroundImage: `url(${SocialImage})` }}>
                        <h3>Social Sciences & Languages</h3>
                        <p>Social sciences and language courses offer a multidisciplinary exploration of human behavior, societies, and cultures.
.</p>
                    </CourseCard>
                </CoursesGrid>
            </CoursesSection>
            </div>
            <div ref={facultySectionRef}>
                <FacultySection>
                    <h2><u>Meet Our Faculty</u></h2>
                    <FacultyGrid>
                        <FacultyCard>
                            <img src="faculty1.jpg" alt="Faculty 1" />
                            <h3>Dr. John Smith</h3>
                            <p>Professor of Computer Science</p>
                        </FacultyCard>
                        <FacultyCard>
                            <img src="faculty2.jpg" alt="Faculty 2" />
                            <h3>Dr. Emily Johnson</h3>
                            <p>Assistant Professor of Business Administration</p>
                        </FacultyCard>
                        <FacultyCard>
                            <img src="faculty3.jpg" alt="Faculty 3" />
                            <h3>Dr. Sarah Williams</h3>
                            <p>Associate Professor of Psychology</p>
                        </FacultyCard>
                    </FacultyGrid>
                </FacultySection>
                </div>

                <TestimonialsSection>
                    <h2><u>What Our Students Say</u></h2>
                    <TestimonialSlider>
                        <TestimonialCard>
                            <p>"The courses offered here are comprehensive and engaging. I've learned so much and feel well-prepared for my career."</p>
                            <cite>- John Doe</cite>
                        </TestimonialCard>
                        <TestimonialCard>
                            <p>"The faculty members are incredibly knowledgeable and supportive. They go above and beyond to help students succeed."</p>
                            <cite>- Jane Smith</cite>
                        </TestimonialCard>
                        <TestimonialCard>
                            <p>"The courses offered here are comprehensive and engaging. I've learned so much and feel well-prepared for my career."</p>
                            <cite>- John Doe</cite>
                        </TestimonialCard>
                    </TestimonialSlider>
                </TestimonialsSection>
              
                  <ContactSection>
                  <div className="contact-column">
                      <form>
                        <input type="email" placeholder="Enter your email" required />
                        <textarea placeholder="Enter your question" required></textarea>
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                    <div className="contact-column">
                      <img src="contactus.jpg" alt="Contact" />
                    </div>
                    
                  </ContactSection>
  
                
                <Footer ref={contactSectionRef}>
                  <div className="footer-column">
                    <h2>University Management</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <div className="social-icons">
                        <Facebook className="icon"/>
                        <Instagram className="icon"/>
                        <Twitter className="icon"/>
                        <YouTube className="icon"/>
                    </div>
                  </div>
                  <div className="footer-column">
                    <h2>Quick Links</h2>
                    <ul>
                      <li><a href="#home">Home</a></li>
                      <li><a href="#services">Services</a></li>
                      <li><a href="#contact">Contact</a></li>
                    </ul>
                  </div>
                  <div className="footer-column">
                    <h2>Resources</h2>
                    <ul>
                      <li><a href="#blog">Blog</a></li>
                      <li><a href="#faq">FAQ</a></li>
                      <li><a href="#support">Support</a></li>
                    </ul>
                  </div>
                  <div className="footer-column">
                    <h2>Newsletter</h2>
                    <p>Subscribe to our newsletter</p>
                    <div className="newsletter">
                      <input type="email" placeholder="Your email" />
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                  <div className="footer-column" style={{ flexBasis: "100%", textAlign: "center" }}>
                    <p>&copy; 2024 Uni Management System. All rights reserved.</p>
                  </div>
                </Footer>
            
        </div>
    );
};

export default Homepage;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
`;

const NavBrand = styled(Link)`
 
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin-top: 0;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding:0;
`;

const StyledPaper = styled.div`
  padding: 24px;
  margin-bottom: 30px; /* Adjust as needed */
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.p`
  font-size: 1.5rem;
 

  padding-top: 50px;
  padding-left:50px;
  letter-spacing: normal;
  line-height: normal;
  margin:0px;
   /* Adjust as needed */
`;
const StyledTitle1 = styled.h1`
  font-size: 2rem;
  color: #080a43;
  font-weight: bold;
  
  padding-left:50px;
  letter-spacing: normal;
  line-height: normal;
  margin:0px;
   /* Adjust as needed */
`;
const StyledText = styled.p`
  margin-top: 20px; /* Adjust as needed */
  margin-bottom: 10px; /* Adjust as needed */
  letter-spacing: normal;
  line-height: normal;
  padding-left:50px;
  text-align:justify;
  
  
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CoursesSection = styled.section`
  padding: 50px 0;
  text-align: center;

  h2{
    color: #080A43;
  }
`;

const TestimonialsSection = styled.section`
  padding: 50px 0;
  text-align: center;

  h2{
    color: #080A43;
  }
`;

const CoursesGrid = styled.div`
  display: flex;
  flex-wrap : wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  
  margin-top: 30px;
  padding:30px;
`;

const CourseCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, height 0.3s ease; /* Added height transition */
  background-size: cover;
  background-position: center;
  position: relative;
  height: 300px;
  width: 300px;
  display: flex; /* Use flexbox for centering */
  flex-direction: column; /* Arrange content vertically */
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  
  &:hover {
    transform: translateY(-5px);
  }

  /* Overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 1, 81, 0.7); /* Adjust overlay color and opacity */
    opacity: 0; /* Initially hidden */
    transition: opacity 0.3s ease; /* Smooth transition */
  }

  &:hover::after {
    opacity: 1; /* Show overlay on hover */
  }
  
  h3 {
    margin-bottom: 10px;
    color: #fff;
    background-color: #080A43;
    text-align: center; /* Center the text */
    position: absolute; /* Position at the top */
    top: 50%; /* Move to the middle vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Adjust for both horizontal and vertical centering */
    width: 100%; /* Take full width */
    transition: top 0.3s ease; /* Added transition for smooth movement */
    z-index: 1; /* Ensure it's above the overlay */
  }

  p {
    color: #fff; 
    font-weight: bold;
    display: none; /* Hide paragraph text by default */
    text-align: center; /* Center the text */
    z-index: 1; /* Ensure it's above the overlay */
  }

  &:hover h3 {
    top: 90px; /* Move to the top when hovered */
  }

  &:hover p {
    display: block; /* Display paragraph text on hover */
  }
`;


const FacultySection = styled.section`
  padding: 50px 0;
  text-align: center;

  h2{
    color: #080A43;
  }
`;

const FacultyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const FacultyCard = styled.div`
  text-align: center;
  border-radius: 8px;
 
  overflow: hidden;
  
  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 3px solid #080A43;
    padding: 10px;
  }
  
  h3 {
    margin: 10px 0;
    color: #333;
  }
  
  p {
    margin-bottom: 20px;
    color: #666;
  }
`;



const TestimonialSlider = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: auto;
  
  p {
    margin-bottom: 15px;
    color: #333;
  }
  
  cite {
    color: #666;
  }
`;

const ContactSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px;
  background-color: #f9f9f9;
  justify-content: center;
  align-items: center;
  
  .contact-column {
    flex: 1;
    min-width: 300px;
    margin: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    
    img {
      max-width: 100%;
      height: auto;
    
    }
    
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 40px 0;
      
      input, textarea {
        width: 100%;
        max-width: 500px;
        padding: 10px;
        margin-bottom: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #080A43;
        color: #fff;
        cursor: pointer;
      }
    }
  }
`;

const Footer = styled.footer`
  background-color: #080A43;
  color: #fff;
  padding: 30px 0;
  text-align: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
  .footer-column {
    flex: 1;
    min-width: 200px;
    padding: 0px 20px;
    margin: 10px;
    
    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 10px;
      font-size: 12px;
    }

    ul {
      list-style-type: none;
      padding: 0;
      
      li {
        margin-bottom: 5px;
      }
        a{
        color:#fff;}
    }
    
    .social-icons {
      display: flex;
      justify-content: center;
      
      a {
        margin: 0 5px;
        text-decoration: none;
        color: #fff;
        font-size: 20px;
      }
    }
    
    .newsletter {
      input {
        padding: 10px;
        margin-right: 5px;
        border: none;
        border-radius: 5px;
      }
      
      button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: black;
        color: #fff;
        cursor: pointer;
        
        &:hover {
          background-color: #d14e20;
        }
      }
    }
  }
`;



const SocialIcons = styled.div`
  margin-top: 20px;
  
  a {
    color: #fff;
    font-size: 24px;
    margin-right: 10px;
    transition: color 0.3s ease;
    
    &:hover {
      color: #007bff;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
`;
