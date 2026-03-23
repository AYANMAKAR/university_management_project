const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { createClient } = require('@supabase/supabase-js')
const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Fatal: SUPABASE_URL and SUPABASE_ANON_KEY are required in backend/.env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
supabase
    .from('admin')
    .select('*')
    .limit(1)
    .then(() => console.log("Connected to Supabase"))
    .catch((err) => console.error("Supabase connection error:", err))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

// Make supabase available in routes
app.set('supabase', supabase);

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})