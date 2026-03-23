const sclassCreate = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        // Check if class name already exists for this admin
        const { data: existingSclassByName } = await supabase
            .from('sclass')
            .select('*')
            .eq('sclass_name', req.body.sclassName)
            .eq('admin_id', req.body.adminID)
            .single();

        if (existingSclassByName) {
            return res.send({ message: 'Sorry this class name already exists' });
        }

        // Create new class
        const { data, error } = await supabase
            .from('sclass')
            .insert([{
                sclass_name: req.body.sclassName,
                admin_id: req.body.adminID
            }])
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

const sclassList = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: sclasses, error } = await supabase
            .from('sclass')
            .select('*')
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        if (sclasses && sclasses.length > 0) {
            res.send(sclasses);
        } else {
            res.send({ message: "No sclasses found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSclassDetail = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: sclass, error } = await supabase
            .from('sclass')
            .select(`
                *,
                admin:admin_id (school_name)
            `)
            .eq('id', req.params.id)
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        if (sclass) {
            res.send(sclass);
        } else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSclassStudents = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: students, error } = await supabase
            .from('student')
            .select('*')
            .eq('sclass_id', req.params.id);

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

const deleteSclass = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('sclass')
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

const deleteSclasses = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('sclass')
            .delete()
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        res.send({ message: "Sclasses deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents };