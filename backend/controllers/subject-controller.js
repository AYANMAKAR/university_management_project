const subjectCreate = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        // Check if subject code already exists
        const { data: existingSubject } = await supabase
            .from('subject')
            .select('*')
            .eq('sub_code', req.body.subjects[0].subCode)
            .eq('admin_id', req.body.adminID)
            .single();

        if (existingSubject) {
            return res.send({ message: 'Sorry this subcode must be unique as it already exists' });
        }

        // Prepare subjects for insertion
        const subjectsToInsert = req.body.subjects.map((subject) => ({
            sub_name: subject.subName,
            sub_code: subject.subCode,
            sessions: subject.sessions,
            sclass_id: req.body.sclassName,
            admin_id: req.body.adminID
        }));

        // Insert subjects
        const { data, error } = await supabase
            .from('subject')
            .insert(subjectsToInsert)
            .select();

        if (error) {
            return res.status(500).json(error);
        }

        res.send(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

const allSubjects = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: subjects, error } = await supabase
            .from('subject')
            .select(`
                *,
                sclass:sclass_id (sclass_name)
            `)
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        if (subjects && subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classSubjects = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: subjects, error } = await supabase
            .from('subject')
            .select('*')
            .eq('sclass_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        if (subjects && subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeSubjectList = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        // Get all subjects for the admin
        const { data: allSubjects, error: subjectsError } = await supabase
            .from('subject')
            .select('*')
            .eq('admin_id', req.params.id);

        if (subjectsError) {
            return res.status(500).json(subjectsError);
        }

        // Get subjects assigned to teachers
        const { data: assignedSubjects, error: assignedError } = await supabase
            .from('teacher')
            .select('teach_subject_id')
            .eq('admin_id', req.params.id)
            .not('teach_subject_id', 'is', null);

        if (assignedError) {
            return res.status(500).json(assignedError);
        }

        const assignedIds = assignedSubjects.map(t => t.teach_subject_id);

        // Filter out assigned subjects
        const freeSubjects = allSubjects.filter(subject =>
            !assignedIds.includes(subject.id)
        );

        res.send(freeSubjects);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: subject, error } = await supabase
            .from('subject')
            .select(`
                *,
                sclass:sclass_id (sclass_name)
            `)
            .eq('id', req.params.id)
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        if (subject) {
            res.send(subject);
        } else {
            res.send({ message: "No subject found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSubject = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('subject')
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

const deleteSubjects = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('subject')
            .delete()
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        res.send({ message: "Subjects deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSubjectsByClass = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('subject')
            .delete()
            .eq('sclass_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        res.send({ message: "Subjects deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { subjectCreate, freeSubjectList, classSubjects, getSubjectDetail, deleteSubjectsByClass, deleteSubjects, deleteSubject, allSubjects };