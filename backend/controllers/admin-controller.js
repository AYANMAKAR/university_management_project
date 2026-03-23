const bcrypt = require('bcrypt');

const adminRegister = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Check if email already exists
        const { data: existingAdminByEmail } = await supabase
            .from('admin')
            .select('*')
            .eq('email', req.body.email)
            .single();

        if (existingAdminByEmail) {
            return res.send({ message: 'Email already exists' });
        }

        // Check if school name already exists
        const { data: existingSchool } = await supabase
            .from('admin')
            .select('*')
            .eq('school_name', req.body.schoolName)
            .single();

        if (existingSchool) {
            return res.send({ message: 'School name already exists' });
        }

        // Create new admin
        const { data, error } = await supabase
            .from('admin')
            .insert([{
                name: req.body.name,
                email: req.body.email,
                password: hashedPass,
                school_name: req.body.schoolName
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

const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        const supabase = req.app.get('supabase');

        const { data: admin, error } = await supabase
            .from('admin')
            .select('*')
            .eq('email', req.body.email)
            .single();

        if (admin && !error) {
            const validated = await bcrypt.compare(req.body.password, admin.password);
            if (validated) {
                const result = { ...admin };
                delete result.password;
                res.send(result);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getAdminDetail = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');
        const { data, error } = await supabase
            .from('admin')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        if (data) {
            const result = { ...data };
            delete result.password;
            res.send(result);
        } else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { adminRegister, adminLogIn, getAdminDetail };
//         await Complain.deleteMany({ school: req.params.id });

//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// const updateAdmin = async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10)
//             res.body.password = await bcrypt.hash(res.body.password, salt)
//         }
//         let result = await Admin.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })

//         result.password = undefined;
//         res.send(result)
//     } catch (error) {
//         res.status(500).json(err);
//     }
// }

// module.exports = { adminRegister, adminLogIn, getAdminDetail, deleteAdmin, updateAdmin };

module.exports = { adminRegister, adminLogIn, getAdminDetail };
