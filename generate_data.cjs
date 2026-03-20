const fs = require('fs');

const studentsData = [
  {
    studentInfo: { student_id: "STU001", student_name: "Allen", batch: "2024-26", programme: "MBA", performance_band: "GREEN" },
    overallMetrics: { total_questions: 127, correct_answers: 98, accuracy_percentage: 77.2, average_time_taken: "142s", attention_count: 29 },
    domains: [
      { domain_name: "Cognitive Intelligence", questions_attempted: 21, correct_answers: 18, accuracy_percentage: 85.7, average_time_taken: "135s", status: "strength" },
      { domain_name: "Business Intelligence", questions_attempted: 20, correct_answers: 16, accuracy_percentage: 80.0, average_time_taken: "140s", status: "strength" },
      { domain_name: "Problem Solving", questions_attempted: 19, correct_answers: 14, accuracy_percentage: 73.7, average_time_taken: "150s", status: "improvement" },
      { domain_name: "Communication", questions_attempted: 14, correct_answers: 12, accuracy_percentage: 85.7, average_time_taken: "120s", status: "strength" },
      { domain_name: "Leadership", questions_attempted: 16, correct_answers: 11, accuracy_percentage: 68.8, average_time_taken: "160s", status: "improvement" },
      { domain_name: "Digital Business", questions_attempted: 17, correct_answers: 13, accuracy_percentage: 76.5, average_time_taken: "145s", status: "strength" },
      { domain_name: "Professional & Industry Readiness", questions_attempted: 20, correct_answers: 14, accuracy_percentage: 70.0, average_time_taken: "155s", status: "improvement" }
    ],
    summaryInsight: "Maintain high accuracy in Cognitive Intelligence while focusing on improving Professional & Industry Readiness by practicing more questions and reducing time taken."
  },
  {
    studentInfo: { student_id: "STU002", student_name: "Swetha", batch: "2024-26", programme: "MBA", performance_band: "GREEN" },
    overallMetrics: { total_questions: 127, correct_answers: 105, accuracy_percentage: 82.7, average_time_taken: "130s", attention_count: 15 },
    domains: [
      { domain_name: "Cognitive Intelligence", questions_attempted: 21, correct_answers: 19, accuracy_percentage: 90.5, average_time_taken: "125s", status: "strength" },
      { domain_name: "Business Intelligence", questions_attempted: 20, correct_answers: 17, accuracy_percentage: 85.0, average_time_taken: "130s", status: "strength" },
      { domain_name: "Problem Solving", questions_attempted: 19, correct_answers: 16, accuracy_percentage: 84.2, average_time_taken: "135s", status: "strength" },
      { domain_name: "Communication", questions_attempted: 14, correct_answers: 13, accuracy_percentage: 92.9, average_time_taken: "110s", status: "strength" },
      { domain_name: "Leadership", questions_attempted: 16, correct_answers: 12, accuracy_percentage: 75.0, average_time_taken: "140s", status: "improvement" },
      { domain_name: "Digital Business", questions_attempted: 17, correct_answers: 14, accuracy_percentage: 82.4, average_time_taken: "135s", status: "strength" },
      { domain_name: "Professional & Industry Readiness", questions_attempted: 20, correct_answers: 14, accuracy_percentage: 70.0, average_time_taken: "145s", status: "improvement" }
    ],
    summaryInsight: "Excellent overall performance. Focus on Leadership and Professional Readiness to achieve a fully balanced profile."
  },
  {
    studentInfo: { student_id: "STU003", student_name: "Aishwarya", batch: "2024-26", programme: "MBA", performance_band: "AMBER" },
    overallMetrics: { total_questions: 127, correct_answers: 85, accuracy_percentage: 66.9, average_time_taken: "155s", attention_count: 42 },
    domains: [
      { domain_name: "Cognitive Intelligence", questions_attempted: 21, correct_answers: 15, accuracy_percentage: 71.4, average_time_taken: "150s", status: "improvement" },
      { domain_name: "Business Intelligence", questions_attempted: 20, correct_answers: 14, accuracy_percentage: 70.0, average_time_taken: "155s", status: "improvement" },
      { domain_name: "Problem Solving", questions_attempted: 19, correct_answers: 12, accuracy_percentage: 63.2, average_time_taken: "165s", status: "improvement" },
      { domain_name: "Communication", questions_attempted: 14, correct_answers: 11, accuracy_percentage: 78.6, average_time_taken: "130s", status: "strength" },
      { domain_name: "Leadership", questions_attempted: 16, correct_answers: 10, accuracy_percentage: 62.5, average_time_taken: "170s", status: "improvement" },
      { domain_name: "Digital Business", questions_attempted: 17, correct_answers: 11, accuracy_percentage: 64.7, average_time_taken: "160s", status: "improvement" },
      { domain_name: "Professional & Industry Readiness", questions_attempted: 20, correct_answers: 12, accuracy_percentage: 60.0, average_time_taken: "165s", status: "improvement" }
    ],
    summaryInsight: "Communication is a key strength. Needs to improve speed and accuracy across analytical and problem-solving domains."
  },
  {
    studentInfo: { student_id: "STU004", student_name: "Thiganth", batch: "2024-26", programme: "MBA", performance_band: "RED" },
    overallMetrics: { total_questions: 127, correct_answers: 58, accuracy_percentage: 45.7, average_time_taken: "175s", attention_count: 65 },
    domains: [
      { domain_name: "Cognitive Intelligence", questions_attempted: 21, correct_answers: 10, accuracy_percentage: 47.6, average_time_taken: "170s", status: "improvement" },
      { domain_name: "Business Intelligence", questions_attempted: 20, correct_answers: 9, accuracy_percentage: 45.0, average_time_taken: "180s", status: "improvement" },
      { domain_name: "Problem Solving", questions_attempted: 19, correct_answers: 8, accuracy_percentage: 42.1, average_time_taken: "190s", status: "improvement" },
      { domain_name: "Communication", questions_attempted: 14, correct_answers: 8, accuracy_percentage: 57.1, average_time_taken: "150s", status: "improvement" },
      { domain_name: "Leadership", questions_attempted: 16, correct_answers: 7, accuracy_percentage: 43.8, average_time_taken: "185s", status: "improvement" },
      { domain_name: "Digital Business", questions_attempted: 17, correct_answers: 8, accuracy_percentage: 47.1, average_time_taken: "175s", status: "improvement" },
      { domain_name: "Professional & Industry Readiness", questions_attempted: 20, correct_answers: 8, accuracy_percentage: 40.0, average_time_taken: "180s", status: "improvement" }
    ],
    summaryInsight: "Requires significant intervention. Foundational concepts across all domains need to be revisited, with a focus on time management."
  },
  {
    studentInfo: { student_id: "STU005", student_name: "Rajakumaran", batch: "2024-26", programme: "MBA", performance_band: "GREEN" },
    overallMetrics: { total_questions: 127, correct_answers: 95, accuracy_percentage: 74.8, average_time_taken: "145s", attention_count: 32 },
    domains: [
      { domain_name: "Cognitive Intelligence", questions_attempted: 21, correct_answers: 16, accuracy_percentage: 76.2, average_time_taken: "140s", status: "strength" },
      { domain_name: "Business Intelligence", questions_attempted: 20, correct_answers: 15, accuracy_percentage: 75.0, average_time_taken: "145s", status: "strength" },
      { domain_name: "Problem Solving", questions_attempted: 19, correct_answers: 14, accuracy_percentage: 73.7, average_time_taken: "150s", status: "improvement" },
      { domain_name: "Communication", questions_attempted: 14, correct_answers: 11, accuracy_percentage: 78.6, average_time_taken: "135s", status: "strength" },
      { domain_name: "Leadership", questions_attempted: 16, correct_answers: 13, accuracy_percentage: 81.3, average_time_taken: "140s", status: "strength" },
      { domain_name: "Digital Business", questions_attempted: 17, correct_answers: 12, accuracy_percentage: 70.6, average_time_taken: "155s", status: "improvement" },
      { domain_name: "Professional & Industry Readiness", questions_attempted: 20, correct_answers: 14, accuracy_percentage: 70.0, average_time_taken: "150s", status: "improvement" }
    ],
    summaryInsight: "Strong performance in Leadership and Communication. Can further improve by focusing on Digital Business and Problem Solving."
  }
];

const mappedStudents = studentsData.map(s => {
  return {
    studentInfo: {
      name: s.studentInfo.student_name,
      id: s.studentInfo.student_id,
      program: s.studentInfo.programme,
      batch: s.studentInfo.batch,
      school: 'Infinitica Business School',
      examName: 'GRAD360 Placement Readiness Index',
      examId: 'PRI-2026-JAN-' + s.studentInfo.student_id,
      date: '15 Jan 2026',
      generated: '15 January 2026 · Report Generated',
      priScore: s.overallMetrics.accuracy_percentage,
      performanceBand: s.studentInfo.performance_band
    },
    overallMetrics: {
      score: s.overallMetrics.correct_answers,
      maxScore: s.overallMetrics.total_questions,
      percentage: s.overallMetrics.accuracy_percentage,
      band: s.studentInfo.performance_band,
      totalQuestions: s.overallMetrics.total_questions,
      correctAnswers: s.overallMetrics.correct_answers,
      accuracy: s.overallMetrics.accuracy_percentage,
      timeTaken: s.overallMetrics.average_time_taken,
      timeEfficiency: '1.0x avg',
      needsAttention: s.overallMetrics.attention_count,
      estTotalTime: '260m 0s'
    },
    domains: s.domains.map(d => {
      const isStrength = d.status === 'strength';
      return {
        name: d.domain_name,
        shortName: d.domain_name.split(' ')[0],
        score: d.correct_answers,
        max: d.questions_attempted,
        percentage: d.accuracy_percentage,
        correct: d.correct_answers,
        total: d.questions_attempted,
        time: d.average_time_taken,
        ratio: 1.0,
        color: isStrength ? 'bg-emerald-500' : 'bg-rose-500',
        fill: isStrength ? '#10b981' : '#f43f5e',
        border: isStrength ? 'border-emerald-500' : 'border-rose-500',
        bgTint: isStrength ? 'bg-emerald-50/50' : 'bg-rose-50/50',
        text: isStrength ? 'text-emerald-700' : 'text-rose-700',
        date: '15 Jan 2026',
        description: 'Assesses ' + d.domain_name,
        label: isStrength ? 'EXCEPTIONAL' : 'NEEDS WORK',
        insights: isStrength ? 'Strong performance in this domain.' : 'Needs improvement in this domain.',
        strengths: isStrength ? [d.domain_name + ' Skills'] : [],
        improvements: isStrength ? [] : [d.domain_name + ' Skills'],
        actionPlan: {
          high: { title: 'Focus on ' + d.domain_name, steps: ['Practice more questions'] },
          medium: { title: 'Review Concepts', steps: ['Read study material'] },
          low: { title: 'Maintain Performance', steps: ['Take mock tests'] }
        },
        subSkills: [
          { skill: 'General ' + d.domain_name, accuracy: d.accuracy_percentage, time: 'Avg', status: isStrength ? 'Strong' : 'Needs Work' }
        ]
      };
    }),
    summaryInsight: s.summaryInsight
  };
});

fs.writeFileSync('src/data.ts', `export const STUDENTS_DATA = ${JSON.stringify(mappedStudents, null, 2)};\n`);
