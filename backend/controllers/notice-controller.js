const noticeCreate = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('notice')
            .insert([{
                title: req.body.title,
                details: req.body.details,
                date: req.body.date,
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

const noticeList = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data: notices, error } = await supabase
            .from('notice')
            .select('*')
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        if (notices && notices.length > 0) {
            res.send(notices);
        } else {
            res.send({ message: "No notices found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateNotice = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('notice')
            .update({
                title: req.body.title,
                details: req.body.details,
                date: req.body.date
            })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        res.send(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteNotice = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('notice')
            .delete()
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            return res.status(500).json(error);
        }

        res.send(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteNotices = async (req, res) => {
    try {
        const supabase = req.app.get('supabase');

        const { data, error } = await supabase
            .from('notice')
            .delete()
            .eq('admin_id', req.params.id);

        if (error) {
            return res.status(500).json(error);
        }

        res.send({ message: "Notices deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };