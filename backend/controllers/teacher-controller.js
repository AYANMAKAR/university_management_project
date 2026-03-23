const bcrypt = require('bcrypt');

const teacherRegister = async (req, res) => {
    const { name, email, password, role, school, teachSubject, teachSclass } = req.body;
    try {
        const supabase = req.app.get('supabase');
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Check if email already exists
        const { data: existingTeacherByEmail } = await supabase
            .from('teacher')
            .select('*')
            .eq('email', email)
            .single();

        if (existingTeacherByEmail) {
            return res.send({ message: 'Email already exists' });
        }

        // Create new teacher
        const { data, error } = await supabase
            .from('teacher')
            .insert([{
                name,
                email,
                password: hashedPass,
                role,
                admin_id: school,
                teach_subject_id: teachSubject,
                teach_sclass_id: teachSclass
            }])
            .select()
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        // Update subject with teacher reference
        await supabase
            .from('subject')
            .update({ teacher_id: data.id })
            .eq('id', teachSubject);

        // Remove password from response
        const result = { ...data };
        delete result.password;

        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const teacherLogIn = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: teacher, error } = await supabase
            .from('teacher')
            .select(`
                *,
                teach_subject:teach_subject_id (sub_name, sessions),
                admin:admin_id (school_name),
                teach_sclass:teach_sclass_id (sclass_name)
            `)
            .eq('email', req.body.email)
            .single();

        if (teacher && !error) {
            const validated = await bcrypt.compare(req.body.password, teacher.password);
            if (validated) {
                const result = { ...teacher };
                delete result.password;
                res.send(result);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Teacher not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTeachers = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: teachers, error } = await supabase
            .from('teacher')
            .select(`
                *,
                teach_subject:teach_subject_id (sub_name),
                teach_sclass:teach_sclass_id (sclass_name)
            `)
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        if (teachers && teachers.length > 0) {
            const modifiedTeachers = teachers.map((teacher) => {
                const { password, ...teacherWithoutPassword } = teacher;
                return teacherWithoutPassword;
            });
            res.send(modifiedTeachers);
        } else {
            res.send({ message: "No teachers found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTeacherDetail = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: teacher, error } = await supabase
            .from('teacher')
            .select(`
                *,
                teach_subject:teach_subject_id (sub_name, sessions),
                admin:admin_id (school_name),
                teach_sclass:teach_sclass_id (sclass_name)
            `)
            .eq('id', req.params.id)
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        if (teacher) {
            const result = { ...teacher };
            delete result.password;
            res.send(result);
        } else {
            res.send({ message: "No teacher found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateTeacherSubject = async (req, res) => {
    const { teacherId, teachSubject } = req.body;
    try {
        const supabase = req.app.get('supabase');

        // Update teacher
        const { data: updatedTeacher, error: teacherError } = await supabase
            .from('teacher')
            .update({ teach_subject_id: teachSubject })
            .eq('id', teacherId)
            .select()
            .single();

        if (teacherError) {
            return res.status(500).json(teacherError);
        }

        // Update subject with teacher reference
        await supabase
            .from('subject')
            .update({ teacher_id: teacherId })
            .eq('id', teachSubject);

        res.send(updatedTeacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

        await Subject.updateOne(
            { teacher: deletedTeacher._id, teacher: { $exists: true } },
            { $unset: { teacher: 1 } }
        );

        res.send(deletedTeacher);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTeachers = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ school: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" });
            return;
        }

        const deletedTeachers = await Teacher.find({ school: req.params.id });

        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTeachersByClass = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ sclassName: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" });
            return;
        }

        const deletedTeachers = await Teacher.find({ sclassName: req.params.id });

        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

const teacherAttendance = async (req, res) => {
    const { status, date } = req.body;

    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.send({ message: 'Teacher not found' });
        }

        const existingAttendance = teacher.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            teacher.attendance.push({ date, status });
        }

        const result = await teacher.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    updateTeacherSubject,
    deleteTeacher,
    deleteTeachers,
    deleteTeachersByClass,
    teacherAttendance
};