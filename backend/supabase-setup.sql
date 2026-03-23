-- Supabase SQL Setup for University Management System
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin table
CREATE TABLE admin (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Admin',
    school_name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class/Sclass table
CREATE TABLE sclass (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sclass_name VARCHAR(255) NOT NULL,
    admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subject table
CREATE TABLE subject (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sub_name VARCHAR(255) NOT NULL,
    sub_code VARCHAR(50) UNIQUE,
    sclass_id UUID REFERENCES sclass(id) ON DELETE CASCADE,
    sessions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teacher table
CREATE TABLE teacher (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Teacher',
    admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
    teach_subject_id UUID REFERENCES subject(id),
    teach_sclass_id UUID REFERENCES sclass(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student table
CREATE TABLE student (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_num INTEGER NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Student',
    sclass_id UUID REFERENCES sclass(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exam Result table (junction table for student-subject marks)
CREATE TABLE exam_result (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES student(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subject(id) ON DELETE CASCADE,
    marks_obtained INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, subject_id)
);

-- Student Attendance table
CREATE TABLE student_attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES student(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Present', 'Absent')),
    subject_id UUID REFERENCES subject(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, date, subject_id)
);

-- Teacher Attendance table
CREATE TABLE teacher_attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    teacher_id UUID REFERENCES teacher(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    present_count VARCHAR(10),
    absent_count VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(teacher_id, date)
);

-- Notice table
CREATE TABLE notice (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    details TEXT,
    date DATE NOT NULL,
    admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Complain table
CREATE TABLE complain (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_type VARCHAR(50) NOT NULL, -- 'student' or 'teacher'
    user_id UUID NOT NULL, -- Reference to student or teacher id
    complain TEXT NOT NULL,
    date DATE NOT NULL,
    admin_id UUID REFERENCES admin(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_admin_email ON admin(email);
CREATE INDEX idx_admin_school_name ON admin(school_name);
CREATE INDEX idx_teacher_email ON teacher(email);
CREATE INDEX idx_student_roll_num ON student(roll_num);
CREATE INDEX idx_student_sclass ON student(sclass_id);
CREATE INDEX idx_subject_sclass ON subject(sclass_id);
CREATE INDEX idx_exam_result_student ON exam_result(student_id);
CREATE INDEX idx_student_attendance_student ON student_attendance(student_id);
CREATE INDEX idx_student_attendance_date ON student_attendance(date);
CREATE INDEX idx_teacher_attendance_teacher ON teacher_attendance(teacher_id);
CREATE INDEX idx_teacher_attendance_date ON teacher_attendance(date);
CREATE INDEX idx_notice_admin ON notice(admin_id);
CREATE INDEX idx_complain_admin ON complain(admin_id);

-- Enable Row Level Security (RLS)
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE sclass ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher ENABLE ROW LEVEL SECURITY;
ALTER TABLE student ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_result ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE notice ENABLE ROW LEVEL SECURITY;
ALTER TABLE complain ENABLE ROW LEVEL SECURITY;