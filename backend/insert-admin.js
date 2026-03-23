const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function insertAdmin() {
    const email = 'ayan@cemk.in';
    const password = 'Susanta@2021';
    const name = 'Ayan';
    const school_name = 'CEMK University';

    // Check if already exists
    const { data: existing } = await supabase
        .from('admin')
        .select('*')
        .eq('email', email)
        .single();

    if (existing) {
        console.log('Admin already exists:', existing.email);
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
        .from('admin')
        .insert([{ name, email, password: hashedPassword, school_name }])
        .select()
        .single();

    if (error) {
        console.error('Insert failed:', JSON.stringify(error, null, 2));
        console.log('\n⚠️  Supabase RLS is blocking inserts.');
        console.log('Please go to Supabase Dashboard → Table Editor → admin → RLS Policies');
        console.log('And either disable RLS or add an insert policy for anon role.');
    } else {
        console.log('✅ Admin inserted successfully!');
        console.log('ID:', data.id);
        console.log('Email:', data.email);
        console.log('Name:', data.name);
    }
}

insertAdmin();
