import { useSelector } from 'react-redux';
import userProfileGif from '../admin/admingif/userProfile.gif'; // Import your GIF file
import bgpic from "../../assets/adminprofilebg.png"; 

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div style={styles.container}>
            <div style={styles.details}>
                <h2 style={styles.heading}>Admin Profile</h2>
                <div style={styles.gifContainer}>
                    <img src={userProfileGif} alt="User Profile GIF" style={styles.gif} />
                </div>
                <div style={styles.info}>
                    <div style={styles.field}>
                        <span style={styles.label}>Name:</span>
                        <span style={styles.value}>{currentUser.name}</span>
                    </div>
                    <div style={styles.field}>
                        <span style={styles.label}>Email:</span>
                        <span style={styles.value}>{currentUser.email}</span>
                    </div>
                    <div style={styles.field}>
                        <span style={styles.label}>University:</span>
                        <span style={styles.value}>{currentUser.schoolName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
 
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
        paddingLeft: '30px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '400px',
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
        maxWidth: '100%',
        height: 'auto',
    },
    info: {
        marginBottom: '20px',
    },
    field: {
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
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
