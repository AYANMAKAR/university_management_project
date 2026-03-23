import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import bgpic from "../../assets/teacher_bg.png";

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <div style={styles.container}>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText>Name: {currentUser.name}</ProfileText>
          <ProfileText>Email: {currentUser.email}</ProfileText>
          <ProfileText>Batch: {teachSclass.sclassName}</ProfileText>
          <ProfileText>Cou: {teachSubject.subName}</ProfileText>
          <ProfileText>School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </div>
  )
}

export default TeacherProfile
const styles = {
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${bgpic})`,
      height: '100vh',
      backgroundSize: 'cover',
  },}
const ProfileCard = styled(Card)`
  align-item: center;
  justify-content: center;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;