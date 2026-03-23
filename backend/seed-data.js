const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function seed() {
    console.log('🌱 Starting database seed...\n');

    // ─── STEP 1: Get existing admin ────────────────────────────────────────
    const { data: admin, error: adminErr } = await supabase
        .from('admin')
        .select('*')
        .eq('email', 'ayan@cemk.in')
        .single();

    if (adminErr || !admin) {
        console.error('❌ Admin not found. Run insert-admin.js first.', adminErr);
        process.exit(1);
    }
    const adminID = admin.id;
    console.log(`✅ Found admin: ${admin.name} (${adminID})\n`);

    // ─── STEP 2: Insert Classes ─────────────────────────────────────────────
    console.log('📚 Creating classes...');
    const classNames = ['Class 1A - CSE', 'Class 2B - IT', 'Class 3C - ECE', 'Class 4D - Mech'];
    const { data: sclasses, error: sclassErr } = await supabase
        .from('sclass')
        .insert(classNames.map(name => ({ sclass_name: name, admin_id: adminID })))
        .select();

    if (sclassErr) { console.error('❌ Class insert error:', sclassErr.message); process.exit(1); }
    console.log(`   ✅ Created ${sclasses.length} classes`);

    // ─── STEP 3: Insert Subjects per class ─────────────────────────────────
    console.log('📖 Creating subjects...');
    const subjectsByClass = [
        // Class 1A - CSE
        [
            { sub_name: 'Data Structures', sub_code: 'CS101', sessions: 40 },
            { sub_name: 'Mathematics I', sub_code: 'MA101', sessions: 36 },
            { sub_name: 'Physics', sub_code: 'PH101', sessions: 30 },
        ],
        // Class 2B - IT
        [
            { sub_name: 'Database Management', sub_code: 'IT201', sessions: 38 },
            { sub_name: 'Operating Systems', sub_code: 'IT202', sessions: 35 },
            { sub_name: 'Computer Networks', sub_code: 'IT203', sessions: 32 },
        ],
        // Class 3C - ECE
        [
            { sub_name: 'Digital Electronics', sub_code: 'EC301', sessions: 42 },
            { sub_name: 'Signal Processing', sub_code: 'EC302', sessions: 36 },
            { sub_name: 'Microprocessors', sub_code: 'EC303', sessions: 34 },
        ],
        // Class 4D - Mech
        [
            { sub_name: 'Thermodynamics', sub_code: 'ME401', sessions: 40 },
            { sub_name: 'Fluid Mechanics', sub_code: 'ME402', sessions: 38 },
            { sub_name: 'Machine Design', sub_code: 'ME403', sessions: 36 },
        ],
    ];

    const allSubjects = [];
    for (let i = 0; i < sclasses.length; i++) {
        const subs = subjectsByClass[i].map(s => ({ ...s, sclass_id: sclasses[i].id }));
        const { data: insertedSubs, error: subErr } = await supabase.from('subject').insert(subs).select();
        if (subErr) { console.error('❌ Subject insert error:', subErr.message); process.exit(1); }
        allSubjects.push(...insertedSubs);
    }
    console.log(`   ✅ Created ${allSubjects.length} subjects`);

    // ─── STEP 4: Insert Teachers ────────────────────────────────────────────
    console.log('👨‍🏫 Creating teachers...');
    const hashedPass = await bcrypt.hash('Teacher@123', 10);
    const teacherData = [
        { name: 'Dr. Suresh Kumar', email: 'suresh@cemk.in', teach_subject_id: allSubjects[0].id, teach_sclass_id: sclasses[0].id },
        { name: 'Prof. Anita Roy', email: 'anita@cemk.in', teach_subject_id: allSubjects[1].id, teach_sclass_id: sclasses[0].id },
        { name: 'Mr. Rahul Bose', email: 'rahul@cemk.in', teach_subject_id: allSubjects[3].id, teach_sclass_id: sclasses[1].id },
        { name: 'Ms. Priya Sharma', email: 'priya@cemk.in', teach_subject_id: allSubjects[4].id, teach_sclass_id: sclasses[1].id },
        { name: 'Dr. Amit Das', email: 'amit@cemk.in', teach_subject_id: allSubjects[6].id, teach_sclass_id: sclasses[2].id },
        { name: 'Prof. Nita Ghosh', email: 'nita@cemk.in', teach_subject_id: allSubjects[9].id, teach_sclass_id: sclasses[3].id },
    ].map(t => ({ ...t, password: hashedPass, admin_id: adminID }));

    const { data: teachers, error: teachErr } = await supabase.from('teacher').insert(teacherData).select();
    if (teachErr) { console.error('❌ Teacher insert error:', teachErr.message); process.exit(1); }
    console.log(`   ✅ Created ${teachers.length} teachers`);

    // ─── STEP 5: Insert Students ────────────────────────────────────────────
    console.log('🎓 Creating students...');
    const studentHashedPass = await bcrypt.hash('Student@123', 10);
    const studentData = [
        // Class 1A - CSE
        { name: 'Arjun Mehta', roll_num: 101, sclass_id: sclasses[0].id },
        { name: 'Sneha Patel', roll_num: 102, sclass_id: sclasses[0].id },
        { name: 'Kiran Joshi', roll_num: 103, sclass_id: sclasses[0].id },
        { name: 'Rahul Singh', roll_num: 104, sclass_id: sclasses[0].id },
        { name: 'Pooja Verma', roll_num: 105, sclass_id: sclasses[0].id },
        // Class 2B - IT
        { name: 'Deepak Thakur', roll_num: 201, sclass_id: sclasses[1].id },
        { name: 'Meena Rao', roll_num: 202, sclass_id: sclasses[1].id },
        { name: 'Sunil Kaur', roll_num: 203, sclass_id: sclasses[1].id },
        { name: 'Prati Nair', roll_num: 204, sclass_id: sclasses[1].id },
        // Class 3C - ECE
        { name: 'Vikram Iyer', roll_num: 301, sclass_id: sclasses[2].id },
        { name: 'Ananya Das', roll_num: 302, sclass_id: sclasses[2].id },
        { name: 'Rohan Sen', roll_num: 303, sclass_id: sclasses[2].id },
        // Class 4D - Mech
        { name: 'Farhan Qureshi', roll_num: 401, sclass_id: sclasses[3].id },
        { name: 'Divya Menon', roll_num: 402, sclass_id: sclasses[3].id },
        { name: 'Anil Tiwari', roll_num: 403, sclass_id: sclasses[3].id },
    ].map(s => ({ ...s, password: studentHashedPass, admin_id: adminID }));

    const { data: students, error: studErr } = await supabase.from('student').insert(studentData).select();
    if (studErr) { console.error('❌ Student insert error:', studErr.message); process.exit(1); }
    console.log(`   ✅ Created ${students.length} students`);

    // ─── STEP 6: Insert Notices ─────────────────────────────────────────────
    console.log('📢 Creating notices...');
    const noticeData = [
        { title: 'Mid-Semester Exam Schedule', details: 'Mid-semester exams will be held from April 10-20, 2024. All students are requested to check the detailed schedule on the notice board.', date: '2024-03-20', admin_id: adminID },
        { title: 'Annual Sports Day', details: 'Annual Sports Day is scheduled for April 5, 2024. Participation is encouraged for all students. Register with your class teacher by March 30.', date: '2024-03-22', admin_id: adminID },
        { title: 'Library New Arrivals', details: 'The library has received 200+ new books across all departments. Students can borrow up to 3 books at a time. Visit the library for the complete list.', date: '2024-03-18', admin_id: adminID },
        { title: 'Fee Payment Deadline', details: 'Last date for semester fee payment is March 31, 2024. Students with pending fees will not be allowed to sit for exams. Contact the accounts office for details.', date: '2024-03-15', admin_id: adminID },
        { title: 'Guest Lecture - Industry Expert', details: 'A guest lecture by Mr. Rajesh Agarwal, CTO of TechCorp India, is scheduled for April 2, 2024 in the Seminar Hall at 11 AM. Attendance is mandatory for final year students.', date: '2024-03-25', admin_id: adminID },
    ];
    const { data: notices, error: noticeErr } = await supabase.from('notice').insert(noticeData).select();
    if (noticeErr) { console.error('❌ Notice insert error:', noticeErr.message); process.exit(1); }
    console.log(`   ✅ Created ${notices.length} notices`);

    // ─── STEP 7: Insert Exam Results ────────────────────────────────────────
    console.log('📝 Creating exam results...');
    const examResults = [];
    // For each student in Class 1A - CSE, add marks for its 3 subjects
    const cseSubjects = allSubjects.slice(0, 3);
    const cseStudents = students.slice(0, 5);
    const sampleMarks = [[85,78,90],[72,88,65],[91,84,77],[68,73,82],[88,95,79]];
    for (let i = 0; i < cseStudents.length; i++) {
        for (let j = 0; j < cseSubjects.length; j++) {
            examResults.push({ student_id: cseStudents[i].id, subject_id: cseSubjects[j].id, marks_obtained: sampleMarks[i][j] });
        }
    }
    // Class 2B - IT students
    const itSubjects = allSubjects.slice(3, 6);
    const itStudents = students.slice(5, 9);
    const itMarks = [[80,74,88],[77,91,70],[85,68,83],[92,79,86]];
    for (let i = 0; i < itStudents.length; i++) {
        for (let j = 0; j < itSubjects.length; j++) {
            examResults.push({ student_id: itStudents[i].id, subject_id: itSubjects[j].id, marks_obtained: itMarks[i][j] });
        }
    }
    const { error: examErr } = await supabase.from('exam_result').insert(examResults);
    if (examErr) { console.error('❌ Exam result insert error:', examErr.message); process.exit(1); }
    console.log(`   ✅ Created ${examResults.length} exam results`);

    // ─── STEP 8: Insert Student Attendance ─────────────────────────────────
    console.log('📅 Creating student attendance...');
    const attendanceDates = ['2024-03-18', '2024-03-19', '2024-03-20', '2024-03-21', '2024-03-22'];
    const attendanceRecords = [];
    for (const student of cseStudents) {
        for (const date of attendanceDates) {
            for (const subject of cseSubjects) {
                attendanceRecords.push({
                    student_id: student.id,
                    subject_id: subject.id,
                    date,
                    status: Math.random() > 0.2 ? 'Present' : 'Absent'
                });
            }
        }
    }
    const { error: attErr } = await supabase.from('student_attendance').insert(attendanceRecords);
    if (attErr) { console.error('❌ Attendance insert error:', attErr.message); process.exit(1); }
    console.log(`   ✅ Created ${attendanceRecords.length} attendance records`);

    // ─── STEP 9: Insert Teacher Attendance ─────────────────────────────────
    console.log('🧑‍💼 Creating teacher attendance...');
    const teacherAttendance = [];
    for (const teacher of teachers) {
        for (const date of attendanceDates) {
            teacherAttendance.push({
                teacher_id: teacher.id,
                date,
                present_count: '6',
                absent_count: '0'
            });
        }
    }
    const { error: tAttErr } = await supabase.from('teacher_attendance').insert(teacherAttendance);
    if (tAttErr) { console.error('❌ Teacher attendance insert error:', tAttErr.message); process.exit(1); }
    console.log(`   ✅ Created ${teacherAttendance.length} teacher attendance records`);

    // ─── STEP 10: Insert Complaints ─────────────────────────────────────────
    console.log('📩 Creating complaints...');
    const complainData = [
        { user_type: 'student', user_id: students[0].id, complain: 'The classroom projector in Room 101 is not working properly for the past two weeks.', date: '2024-03-19', admin_id: adminID },
        { user_type: 'student', user_id: students[1].id, complain: 'The library books for Data Structures are always occupied. Please increase the number of copies.', date: '2024-03-20', admin_id: adminID },
        { user_type: 'teacher', user_id: teachers[0].id, complain: 'The lab computers in Lab 3 are very slow and need urgent upgrades for proper practical sessions.', date: '2024-03-21', admin_id: adminID },
        { user_type: 'student', user_id: students[3].id, complain: 'The canteen food quality has deteriorated. Requesting improvement in the meal quality and hygiene.', date: '2024-03-22', admin_id: adminID },
        { user_type: 'teacher', user_id: teachers[2].id, complain: 'Requesting a whiteboard replacement in Room 204 as the current one is worn out and difficult to write on.', date: '2024-03-18', admin_id: adminID },
    ];
    const { error: compErr } = await supabase.from('complain').insert(complainData);
    if (compErr) { console.error('❌ Complain insert error:', compErr.message); process.exit(1); }
    console.log(`   ✅ Created ${complainData.length} complaints`);

    // ─── SUMMARY ────────────────────────────────────────────────────────────
    console.log('\n🎉 Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log(`  📚 Classes:             ${sclasses.length}`);
    console.log(`  📖 Subjects:            ${allSubjects.length}`);
    console.log(`  👨‍🏫 Teachers:            ${teachers.length}`);
    console.log(`  🎓 Students:            ${students.length}`);
    console.log(`  📢 Notices:             ${notices.length}`);
    console.log(`  📝 Exam Results:        ${examResults.length}`);
    console.log(`  📅 Student Attendance:  ${attendanceRecords.length}`);
    console.log(`  🧑‍💼 Teacher Attendance:  ${teacherAttendance.length}`);
    console.log(`  📩 Complaints:          ${complainData.length}`);
    console.log('─────────────────────────────────');
    console.log('\n👤 Teacher Login:  any teacher email + password: Teacher@123');
    console.log('🎓 Student Login:  roll number + name + password: Student@123');
}

seed().catch(e => { console.error('Fatal error:', e); process.exit(1); });
