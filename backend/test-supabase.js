const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ SUPABASE_URL or SUPABASE_ANON_KEY not found in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        console.log('🔄 Testing Supabase connection...');

        // Test basic connection
        const { data, error } = await supabase
            .from('admin')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Connection failed:', error.message);
            return;
        }

        console.log('✅ Supabase connection successful!');
        console.log('📊 Tables accessible:', data ? 'Yes' : 'No data yet (normal for new setup)');

    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
}

testConnection();