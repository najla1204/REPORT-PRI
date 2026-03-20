const fs = require('fs');

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
appTsx = `import { STUDENTS_DATA } from './data';\n` + appTsx;

// Replace ReportPage fetch
appTsx = appTsx.replace(
  /React\.useEffect\(\(\) => \{\s*fetch\(\`https:\/\/standaloneservice\.onrender\.com\/insights\/\$\{student\.student_id\}\`\)\s*\.then\(res => res\.json\(\)\)\s*\.then\(data => \{\s*setReportData\(data\);\s*setLoading\(false\);\s*\}\)\s*\.catch\(err => \{\s*console\.error\('Failed to fetch report:', err\);\s*setLoading\(false\);\s*\}\);\s*\}, \[student\.student_id\]\);/g,
  `React.useEffect(() => {
    const data = STUDENTS_DATA.find(s => s.studentInfo.id === student.student_id);
    if (data) {
      setReportData(data);
    } else {
      console.error('Failed to find report for:', student.student_id);
    }
    setLoading(false);
  }, [student.student_id]);`
);

// Replace App fetch
appTsx = appTsx.replace(
  /React\.useEffect\(\(\) => \{\s*fetch\('https:\/\/standaloneservice\.onrender\.com\/students'\)\s*\.then\(res => res\.json\(\)\)\s*\.then\(data => \{\s*setStudents\(data\.slice\(0, 5\)\);\s*setLoading\(false\);\s*\}\)\s*\.catch\(err => \{\s*console\.error\('Failed to fetch students:', err\);\s*setLoading\(false\);\s*\}\);\s*\}, \[\]\);/g,
  `React.useEffect(() => {
    const list = STUDENTS_DATA.map(s => ({
      student_id: s.studentInfo.id,
      student_name: s.studentInfo.name,
      overall_accuracy_pct: s.overallMetrics.percentage + '%',
      programme: s.studentInfo.program,
      batch: s.studentInfo.batch,
      pri_band: s.studentInfo.performanceBand
    }));
    setStudents(list);
    setLoading(false);
  }, []);`
);

fs.writeFileSync('src/App.tsx', appTsx);
