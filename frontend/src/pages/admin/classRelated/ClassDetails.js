import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Typography, Tab, IconButton, Divider, Card, CardContent
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import ClassRoomGif from '../classRelated/classgif/classroom.gif'; 
import bgpic from "../../../assets/classbg.png"; 

const ClassDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry, the delete function has been disabled for now.")
        setShowPopup(true)
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getClassStudents(classID));
                dispatch(resetSubjects())
                dispatch(getSubjectList(classID, "ClassSubjects"))
            })
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.sub_name,
            code: subject.sub_code,
            id: subject.id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <BlueButton
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </BlueButton>
                    </Box>
                    :
                    <Card sx={{ mt: 2 }} style={{marginTop:50}}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom style={{color:'#080a43'}}>
                                Subjects List:
                            </Typography>
                            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            <Divider sx={{ my: 2 }} />
                            <SpeedDialTemplate actions={subjectActions} />
                        </CardContent>
                    </Card>
                }
            </>
        )
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.roll_num,
            id: student.id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/students/student/attendance/" + row.id)
                    }
                >
                    Attendance
                </PurpleButton>
            </>
        );
    };

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <Card sx={{ mt: 2 }} >
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Students List:
                            </Typography>
                            <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            <Divider sx={{ my: 2 }} />
                            <SpeedDialTemplate actions={studentActions} />
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '66px' }}>
                            <BlueButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </BlueButton>
                        </Box>
                    </>
                )}
            </>
        )
    }

    const ClassTeachersSection = () => {
        return (
            <>
                Teachers
            </>
        )
    }

    // Import necessary modules and components

const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList.length;
    const numberOfStudents = sclassStudents.length;

    return (
        
        <div style={styles.container}>
        
        
            <div style={styles.details}>
                <h2 style={styles.heading}>Class Details</h2>
                <div style={styles.gifContainer}>
                    { <img src={ClassRoomGif} alt="User Profile GIF" style={styles.gif} /> }
                </div>
                <div style={styles.info}>
                    <div style={styles.field}>
                        <span style={styles.label}>Name:</span>
                        <span style={styles.value}>{sclassDetails && sclassDetails.sclass_name}</span>
                    </div>
                    <div style={styles.field}>
                        <span style={styles.label}> Number of Subjects: </span>
                        <span style={styles.value}>{numberOfSubjects}</span>
                    </div>
                    <div style={styles.field}>
                        <span style={styles.label}> Number of Students:</span>
                        <span style={styles.value}>{numberOfStudents}</span>
                    </div>
                </div>
            </div>
        </div>
        
        
        

                    
    );
}

       
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    <Tab label="Subjects" value="2" />
                                    <Tab label="Students" value="3" />
                                    <Tab label="Teachers" value="4" />
                                </TabList>
                            </Box>
                            
                            <TabPanel value="1" sx={{ p: 0 }}>
                       <ClassDetailsSection />
                             </TabPanel>
                       <TabPanel value="2" sx={{ p: 0 }}>
                                <ClassSubjectsSection />
                            </TabPanel>
                        <TabPanel value="3" sx={{ p: 0 }}>
                                <ClassStudentsSection />
                              </TabPanel>
                        <TabPanel value="4" sx={{ p: 0 }}>
                              <ClassTeachersSection />
                         </TabPanel>

                            
                        </TabContext>
                    </Box>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
const styles = {
    
    
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${bgpic})`,
            height: '100vh',
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
            color: '#333',
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
    