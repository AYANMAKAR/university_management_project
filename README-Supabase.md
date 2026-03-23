# University Management System - Supabase Setup

## 🚀 Quick Start with Supabase

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Click **"New Project"**
4. Fill in:
   - **Name**: `university-management`
   - **Database Password**: Choose a strong password
   - **Region**: Select nearest region
5. Click **"Create new project"**
6. Wait for project setup (2-3 minutes)

### 2. Get Project Credentials
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**
   - **anon/public key**

### 3. Setup Database Schema
1. Go to **SQL Editor** (left sidebar)
2. Copy and paste the entire content from `backend/supabase-setup.sql`
3. Click **"Run"** to create all tables

### 4. Configure Environment Variables
Update `backend/.env`:
```env
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Install Dependencies & Start
```bash
cd backend
npm install
npm run start
```

**Expected Output:**
```
Connected to Supabase
Server started at port no. 5000
```

---

## 📊 Database Schema Overview

### Core Tables:
- **admin**: School administrators
- **sclass**: Class/Grade information
- **subject**: Subjects taught
- **teacher**: Teaching staff
- **student**: Students enrolled
- **exam_result**: Student marks per subject
- **student_attendance**: Daily attendance records
- **teacher_attendance**: Teacher attendance
- **notice**: School announcements
- **complain**: Student/Teacher complaints

### Relationships:
- Admin → Sclass (1:many)
- Sclass → Student (1:many)
- Sclass → Subject (1:many)
- Teacher → Subject (1:1)
- Student → Exam Result (1:many)
- Student → Attendance (1:many)

---

## 🔧 API Endpoints

### Admin Routes:
- `POST /AdminReg` - Register admin
- `POST /AdminLogin` - Admin login
- `GET /Admin/:id` - Get admin details

### Student Routes:
- `POST /StudentReg` - Register student
- `POST /StudentLogin` - Student login
- `GET /Students/:id` - Get all students by admin
- `GET /Student/:id` - Get student details

### Teacher Routes:
- `POST /TeacherReg` - Register teacher
- `POST /TeacherLogin` - Teacher login
- `GET /Teachers/:id` - Get all teachers by admin

### Class Routes:
- `POST /SclassCreate` - Create class
- `GET /SclassList/:id` - Get classes by admin
- `GET /Sclass/:id` - Get class details

### Subject Routes:
- `POST /SubjectCreate` - Create subject
- `GET /ClassSubjects/:id` - Get subjects by class

### Notice Routes:
- `POST /NoticeCreate` - Create notice
- `GET /NoticeList/:id` - Get notices by admin

### Complain Routes:
- `POST /ComplainCreate` - Create complain
- `GET /ComplainList/:id` - Get complains by admin

---

## 🎯 Key Changes from MongoDB

### 1. **Connection**
```javascript
// Old (MongoDB)
mongoose.connect(MONGO_URL)

// New (Supabase)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

### 2. **Queries**
```javascript
// Old (Mongoose)
const users = await User.find({ admin: adminId })

// New (Supabase)
const { data: users } = await supabase
    .from('user')
    .select('*')
    .eq('admin_id', adminId)
```

### 3. **Relationships**
```javascript
// Old (Populate)
.populate('admin', 'school_name')

// New (Join)
.select(`
    *,
    admin:admin_id (school_name)
`)
```

### 4. **Insert**
```javascript
// Old
const user = new User(data)
await user.save()

// New
const { data } = await supabase
    .from('user')
    .insert([data])
    .select()
    .single()
```

---

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **UUID primary keys** for better security
- **Environment variables** for sensitive data
- **Password hashing** with bcrypt

---

## 🚀 Deployment

### Backend (Railway/Vercel):
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Frontend (Vercel/Netlify):
```bash
npm install -g vercel
vercel --prod
```

---

## 🐛 Troubleshooting

### Connection Issues:
1. Check `.env` variables are correct
2. Verify Supabase project is active
3. Run SQL setup script again

### API Errors:
1. Check table names match exactly
2. Verify foreign key relationships
3. Check RLS policies if needed

### Port Issues:
- Backend runs on port 5000
- Update frontend `.env` accordingly

---

## 📝 Next Steps

1. ✅ Supabase project created
2. ✅ Database schema setup
3. ✅ Environment configured
4. ✅ Dependencies installed
5. 🔄 Test API endpoints
6. 🔄 Deploy to production

**Your app is now running on Supabase! 🎉**