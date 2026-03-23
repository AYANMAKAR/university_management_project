import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';
import logoutpic from "../assets/logoutimg.png"; 

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            
            <img src={logoutpic} alt="User Profile GIF" style={styles.image} />
    
            <h1>{currentUser.name}</h1>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
            <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </LogoutContainer>
    );
};

export default Logout;
const styles={
  image:{
    height:'250px',
    width:'200px',
  }
}

const LogoutContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #051650;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #FF0000;
  border-color:#FF0000;
  &:hover {
    color: #FF0000;
    background-color: #fff;
  }

`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #051650;
  border-color:#051650;
  &:hover {
    color: #051650;
    background-color: #fff;
  }
`;
