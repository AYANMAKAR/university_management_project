import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import bgpic from "../../../assets/teacherbg.png"; // Assuming you already have imported Container and Typography elsewhere
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import TeacherGif from '../teacherRelated/teachergif/teacher.gif';

// Import or define styles and ClassRoomGif if not done elsewhere

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teach_subject_id?.sub_name;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teach_sclass_id?.id}/${teacherDetails?.id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={styles.container}>
                    
                    <div style={styles.details}>
                    <h2 style={styles.heading}>Teacher Details</h2>
                    <div style={styles.gifContainer}>
                    { <img src={TeacherGif} alt="teacher Profile GIF" style={styles.gif} /> }
                        </div>
                        <div style={styles.info}>
                            <div style={styles.field}>
                                <span style={styles.label}>Teacher Name: </span>
                                <span style={styles.value}>{teacherDetails?.name}</span>
                            </div>
                            <div style={styles.field}>
                                <span style={styles.label}>Class Name: </span>
                                <span style={styles.value}>{teacherDetails?.teach_sclass_id?.sclass_name}</span>
                            </div>
                            {isSubjectNamePresent ? (
                                <>
                                    <div style={styles.field}>
                                        <span style={styles.label}> Subject Name: </span>
                                        <span style={styles.value}>{teacherDetails?.teach_subject_id?.sub_name}</span>
                                    </div>
                                    <div style={styles.field}>
                                        <span style={styles.label}> Subject Sessions:  </span>
                                        <span style={styles.value}>{teacherDetails?.teach_subject_id?.sessions}</span>
                                    </div>
                                </>
                            ) : (
                                <Button variant="contained" onClick={handleAddSubject}>
                                    Add Subject
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeacherDetails;
const styles = {
    
    
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${bgpic})`,
        backgroundSize: 'cover',
    },
    details: {
        backgroundColor: '#f9f9f9',
        paddingLeft: '80px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '700px',
        width: '100%',
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#051650',
    },
    gifContainer: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    gif: {
        maxWidth: '15%',
        height: 'auto',
    },
    info: {
        marginBottom: '20px',
        textAlign: 'center', 
        justifyContent: 'space-between',
    },
    field: {
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '30px', // Adjusted marginLeft to reduce space
    },
    label: {
        fontWeight: 'bold',
        color: '#555',
        marginRight: '10px',
        flexBasis: '30%',
    },
    value: {
        flexBasis: '70%',
        color: '#333',
    },
};

