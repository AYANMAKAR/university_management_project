const bcrypt = require('bcrypt');

const studentRegister = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Check if roll number already exists for this school and class
        const { data: existingStudent } = await supabase
            .from('student')
            .select('*')
            .eq('roll_num', req.body.rollNum)
            .eq('admin_id', req.body.adminID)
            .eq('sclass_id', req.body.sclassName)
            .single();

        if (existingStudent) {
            return res.send({ message: 'Roll Number already exists' });
        }

        // Create new student
        const { data, error } = await supabase
            .from('student')
            .insert([{
                name: req.body.name,
                roll_num: req.body.rollNum,
                password: hashedPass,
                sclass_id: req.body.sclassName,
                admin_id: req.body.adminID
            }])
            .select()
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        // Remove password from response
        const result = { ...data };
        delete result.password;

        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const studentLogIn = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: student, error } = await supabase
            .from('student')
            .select(`
                *,
                admin:admin_id (school_name),
                sclass:sclass_id (sclass_name)
            `)
            .eq('roll_num', req.body.rollNum)
            .eq('name', req.body.studentName)
            .single();

        if (student && !error) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                const result = { ...student };
                delete result.password;
                delete result.exam_result;
                delete result.attendance;
                res.send(result);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudents = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: students, error } = await supabase
            .from('student')
            .select(`
                *,
                sclass:sclass_id (sclass_name)
            `)
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        if (students && students.length > 0) {
            const modifiedStudents = students.map((student) => {
                const { password, ...studentWithoutPassword } = student;
                return studentWithoutPassword;
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudentDetail = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: student, error } = await supabase
            .from('student')
            .select(`
                *,
                admin:admin_id (school_name),
                sclass:sclass_id (sclass_name),
                exam_result (
                    *,
                    subject:subject_id (sub_name)
                ),
                student_attendance (
                    *,
                    subject:subject_id (sub_name, sessions)
                )
            `)
            .eq('id', req.params.id)
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        if (student) {
            const result = { ...student };
            delete result.password;
            res.send(result);
        } else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteStudent = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('student')
            .delete()
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        res.send(data);
    } catch (err) {
        res.status(500).json(err);
    }
};


const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const subject = await Subject.findById(subName);

        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }

            student.attendance.push({ date, status, subName });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,

    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
};