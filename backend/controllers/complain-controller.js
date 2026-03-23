const complainCreate = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('complain')
            .insert([{
                complain: req.body.complain,
                date: req.body.date || new Date().toISOString().substring(0, 10),
                user_id: req.body.user,
                user_type: req.body.user_type || 'student',
                admin_id: req.body.school
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

const complainList = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: complains, error } = await supabase
            .from('complain')
            .select('*')
            .eq('admin_id', req.params.id)
            .order('date', { ascending: false });

        if (error) {
            return res.status(500).json(error);
        }

        if (complains && complains.length > 0) {
            res.send(complains);
        } else {
            res.send({ message: "No complains found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { complainCreate, complainList };
