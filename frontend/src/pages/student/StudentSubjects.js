import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import bgpic from "../../assets/classbg.png";

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser.id, "Student"));
    }, [dispatch, currentUser.id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclass_id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclass_id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Subject Marks
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.sub_name || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.sub_name.sub_name}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

   const renderClassDetailsSection = () => {
    return (
        <div style={styles.container}>
            <div style={styles.details}>
                <h2 style={styles.heading}>Class Details</h2>
                <div style={styles.info}>
                    <div style={styles.field}>
                        <span style={styles.label}>You are currently in Class</span>
                        <span style={styles.value}>{sclassDetails && sclassDetails.sclass_name}</span>
                    </div>
                    <div style={styles.field}>
                        <span style={styles.label}>And these are the subjects:</span>
                        <span style={styles.value}>
                            {subjectsList &&
                                subjectsList.map((subject, index) => (
                                    <Typography variant="subtitle1" key={index}>
                                        {subject.sub_name} ({subject.sub_code})
                                    </Typography>
                                ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </>
    );
};

export default StudentSubjects;
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
        paddingLeft: '0px',
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
        color: '#080a43',
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
       
        alignItems: 'center',
        marginLeft: '30px', // Adjusted marginLeft to reduce space
    },
    label: {
        fontWeight: 'bold',
        color: 'green',
        marginRight: '10px',
        flexBasis: '30%',
    },
    value: {
        flexBasis: '70%',
        color: '#333',
    },
};
