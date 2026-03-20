import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crosshair,
  Info,
  Lightbulb,
  LineChart,
  Printer,
  ShieldCheck,
  Target,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import React from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  ZAxis,
  ReferenceLine,
  LabelList,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

// --- Utility ---
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- API Configuration ---
const API_URL = 'https://standaloneservice.onrender.com';



// --- Components ---

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void; key?: React.Key }) => (
  <div 
    className={cn('bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden', className)}
    onClick={onClick}
  >
    {children}
  </div>
);

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-8">
    <div className="flex items-center gap-4 mb-2">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.05em] text-[#0f172a] uppercase">{title}</h2>
        {description && <p className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#94a3b8] uppercase mt-1">{description}</p>}
      </div>
    </div>
  </div>
);

const ProgressBar = ({ percentage, colorClass = 'bg-red-600', heightClass = 'h-2' }: { percentage: number; colorClass?: string; heightClass?: string }) => (
  <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden', heightClass)}>
    <div
      className={cn('h-full rounded-full transition-all duration-1000 ease-out', colorClass)}
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'solid-green' | 'solid-red'; className?: string }) => {
  const variants = {
    default: 'bg-blue-600 text-white',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-red-600 text-white',
    'solid-green': 'bg-[#1e4620] text-white',
    'solid-red': 'bg-[#6b3030] text-white',
  };
  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0f172a] p-6 rounded-2xl shadow-xl border border-slate-800 min-w-[260px] max-w-[320px]">
        <p className="font-black tracking-[-0.05em] text-white text-lg mb-2">{data.name}</p>
        {data.description && (
          <p className="text-xs text-[#94a3b8] mb-4 pb-4 border-b border-slate-800 leading-relaxed font-medium">
            {data.description}
          </p>
        )}
        {!data.description && <div className="mb-4 pb-4 border-b border-slate-800" />}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#94a3b8] flex items-center gap-2 font-medium"><Target className="w-4 h-4" /> Score</span>
            <span className="font-bold text-white">{data.score} <span className="text-slate-500 font-medium">/ {data.max}</span></span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#94a3b8] flex items-center gap-2 font-medium"><Crosshair className="w-4 h-4" /> Accuracy</span>
            <span className="font-bold text-white">{data.percentage}%</span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#94a3b8] flex items-center gap-2 font-medium"><CheckCircle2 className="w-4 h-4" /> Correct/Total</span>
            <span className="font-bold text-white">{data.correct} <span className="text-slate-500 font-medium">/ {data.total}</span></span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#94a3b8] flex items-center gap-2 font-medium"><Clock className="w-4 h-4" /> Time Ratio</span>
            <Badge variant={data.ratio > 1 ? 'warning' : 'solid-green'} className="text-[10px] font-black tracking-[0.25em] uppercase">{data.ratio}x</Badge>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const ActionPlanCard = ({ priority, title, steps, color }: { priority: string, title: string, steps: string[], color: 'red' | 'amber' | 'emerald' }) => {
  const colorStyles = {
    red: { cardBorder: 'border-red-100', badgeBg: 'bg-red-600', badgeText: 'text-white', icon: 'text-red-500' },
    amber: { cardBorder: 'border-amber-100', badgeBg: 'bg-amber-500', badgeText: 'text-white', icon: 'text-amber-500' },
    emerald: { cardBorder: 'border-emerald-100', badgeBg: 'bg-emerald-600', badgeText: 'text-white', icon: 'text-emerald-500' },
  };
  const style = colorStyles[color];

  return (
    <div className={cn("bg-white border rounded-2xl p-6 shadow-sm", style.cardBorder)}>
      <div className="flex items-center gap-2 mb-4">
        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black tracking-[0.25em] uppercase", style.badgeBg, style.badgeText)}>
          {priority}
        </span>
      </div>
      <h5 className="text-sm font-bold text-[#0f172a] mb-3">{title}</h5>
      <ul className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-2">
            <ArrowRight className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", style.icon)} />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DomainCard = ({ domain }: { domain: import('./studentData').Domain; key?: React.Key }) => (
  <div className={cn("relative rounded-[2rem] border overflow-hidden bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]", `border-l-[6px] ${domain.border}`)}>
    {/* Header */}
    <div className={cn("p-8 border-b border-gray-100", domain.bgTint)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase">Exam held on {domain.date}</span>
          </div>
          <h3 className={cn("text-2xl font-black tracking-[-0.05em]", domain.text)}>{domain.name}</h3>
          <p className="text-sm text-slate-600 mt-2 font-medium">{domain.description}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl font-black tracking-[-0.05em] text-[#0f172a]">{domain.score}<span className="text-[#94a3b8] text-xl font-bold">/{domain.max}</span></div>
            <div className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mt-1">{domain.percentage}% Accuracy</div>
          </div>
          <Badge variant={domain.percentage >= 90 ? 'success' : domain.percentage >= 80 ? 'default' : 'warning'} className="text-[10px] font-black tracking-[0.25em] uppercase px-4 py-2">
            {domain.label}
          </Badge>
        </div>
      </div>
    </div>

    <div className="p-8 space-y-10">
      {/* Metrics Strip */}
      <div className="flex flex-wrap items-center gap-8 text-sm">
        <div className="flex items-center gap-3">
          <Crosshair className="w-5 h-5 text-[#94a3b8]" />
          <span className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase">Accuracy:</span>
          <span className="font-bold text-[#0f172a]">{domain.percentage}%</span>
        </div>
        <div className="w-px h-6 bg-gray-100 hidden sm:block" />
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#94a3b8]" />
          <span className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase">Time Taken:</span>
          <span className="font-bold text-[#0f172a]">{domain.time}</span>
        </div>
        <div className="w-px h-6 bg-gray-100 hidden sm:block" />
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-[#94a3b8]" />
          <span className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase">Time Ratio:</span>
          <span className="font-bold text-[#0f172a]">{domain.ratio}x</span>
        </div>
      </div>

      {/* Insights Callout */}
      <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-100 flex gap-5">
        <div className={cn("p-3 rounded-xl shrink-0 h-fit", domain.bgTint, domain.text)}>
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-2">Domain Insights</h4>
          <p className="text-sm text-[#0f172a] leading-relaxed font-medium">{domain.insights}</p>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Key Strengths
          </h4>
          <ul className="space-y-3">
            {domain.strengths.map((strength, i) => (
              <li key={i} className="text-sm text-[#0f172a] font-medium flex items-start gap-3">
                <span className="text-emerald-500 mt-0.5 font-bold">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Areas for Improvement
          </h4>
          <ul className="space-y-3">
            {domain.improvements.map((improvement, i) => (
              <li key={i} className="text-sm text-[#0f172a] font-medium flex items-start gap-3">
                <span className="text-amber-500 mt-0.5 font-bold">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sub-Skills Table */}
      <div>
        <h4 className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-6">Sub-Skill Breakdown</h4>
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8f9fa]">
              <tr className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase border-b border-gray-100">
                <th className="py-4 px-6">Skill Area</th>
                <th className="py-4 px-6">Accuracy</th>
                <th className="py-4 px-6">Time Efficiency</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {domain.subSkills.map((skill, i) => (
                <tr key={i} className="group hover:bg-[#f8f9fa] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0f172a]">{skill.skill}</td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{skill.accuracy}%</td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{skill.time}</td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.25em] uppercase text-white",
                      skill.status === 'Exceptional' ? 'bg-emerald-600' :
                      skill.status === 'Strong' ? 'bg-blue-600' :
                      skill.status === 'Average' ? 'bg-slate-600' :
                      'bg-amber-500'
                    )}>
                      {skill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Improve */}
      <div className="pt-8 border-t border-gray-100">
        <h4 className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D62027]" />
          Action Plan
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <ActionPlanCard priority="HIGH PRIORITY" title={domain.actionPlan.high.title} steps={domain.actionPlan.high.steps} color="red" />
          <ActionPlanCard priority="MEDIUM PRIORITY" title={domain.actionPlan.medium.title} steps={domain.actionPlan.medium.steps} color="amber" />
          <ActionPlanCard priority="LOW PRIORITY" title={domain.actionPlan.low.title} steps={domain.actionPlan.low.steps} color="emerald" />
        </div>
      </div>

    </div>
  </div>
);

// --- Main App ---

function ReportPage({ student, onBack }: { student: any, onBack: () => void }) {
  const [reportData, setReportData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_URL}/insights/${student.student_id}`)
      .then(res => res.json())
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch report:', err);
        setLoading(false);
      });
  }, [student.student_id]);

  if (loading || !reportData) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D62027] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#0f172a] font-bold uppercase tracking-widest text-sm">Generating AI Insights...</p>
        </div>
      </div>
    );
  }

  const STUDENT = reportData.studentInfo;
  const OVERALL = reportData.overallMetrics;
  const DOMAINS = reportData.domains;
  const SUMMARY_INSIGHT = reportData.summaryInsight;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans selection:bg-red-100 selection:text-red-900 pb-24">
      
      {/* --- Top Navigation / Branding --- */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="print:hidden flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <span className="text-3xl font-black tracking-[-0.05em]">
              <span className="text-[#D62027]">Grad</span>
              <span className="text-[#000000]">360&deg;</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="hidden sm:inline-block text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mt-1">Placement Readiness Platform</span>
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <span className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mt-1">Report ID: {STUDENT.id}</span>
            <button 
              onClick={() => window.print()}
              className="print:hidden ml-2 flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline-block">Print</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Profile Card */}
          <Card className="lg:col-span-1 p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center mb-6 border border-gray-100">
                <User className="w-8 h-8 text-[#94a3b8]" />
              </div>
              <h1 className="text-3xl font-black tracking-[-0.05em] text-[#0f172a] mb-1">{STUDENT.name}</h1>
              <p className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-6">{STUDENT.id} · {STUDENT.program}</p>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-[#94a3b8] uppercase">Batch</span>
                  <span className="font-medium text-[#0f172a]">{STUDENT.batch}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-[#94a3b8] uppercase">Institution</span>
                  <span className="font-medium text-[#0f172a] text-right">{STUDENT.school}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Exam Meta Card */}
          <Card className="lg:col-span-2 p-8 bg-white">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#D62027] text-white text-[10px] font-black tracking-[0.25em] uppercase rounded-full">
                    Official Report
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-white text-[10px] font-black tracking-[0.25em] uppercase rounded-full">
                    {STUDENT.date}
                  </span>
                </div>
                <h2 className="text-4xl font-black tracking-[-0.05em] text-[#0f172a] mb-4 uppercase leading-tight">
                  {STUDENT.examName}
                </h2>
                <p className="text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
                  This report provides a comprehensive analysis of your cognitive, business, and behavioral competencies. 
                  Use these insights to identify strengths and target areas for improvement in your placement journey.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-8">
                <div>
                  <p className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-1">Exam ID</p>
                  <p className="font-semibold text-[#0f172a]">{STUDENT.examId}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-1">Generated On</p>
                  <p className="font-semibold text-[#0f172a]">{STUDENT.generated}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* --- 2. OVERALL PERFORMANCE --- */}
        <section>
          <SectionHeader title="Placement Readiness Index" description="High-level summary of your placement readiness." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Hero Score */}
            <Card className="lg:col-span-5 bg-[#0f172a] text-white p-8 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D62027]/10 rounded-full blur-3xl" />
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <p className="text-[#94a3b8] font-black tracking-[0.25em] uppercase text-[10px] mb-2">PRI Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black tracking-[-0.05em]">{STUDENT.priScore}</span>
                    <span className="text-2xl text-[#94a3b8] font-bold">/ 100</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-4xl font-black tracking-[-0.05em] text-[#D62027]">{STUDENT.priScore}%</span>
                    <Badge variant={STUDENT.priScore >= 85 ? 'success' : STUDENT.priScore >= 75 ? 'default' : 'warning'} className="px-3 py-1 text-[10px] font-black tracking-[0.25em] uppercase">
                      {STUDENT.priScore >= 85 ? 'EXCEPTIONAL' : STUDENT.priScore >= 75 ? 'GOOD' : 'NEEDS WORK'}
                    </Badge>
                  </div>
                  <ProgressBar percentage={STUDENT.priScore} colorClass="bg-[#D62027]" heightClass="h-3 bg-slate-800" />
                </div>
              </div>
            </Card>

            {/* Key Stats Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Card className="p-6 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 text-[#94a3b8] mb-3">
                  <Crosshair className="w-4 h-4" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase">Accuracy</span>
                </div>
                <p className="text-3xl font-black tracking-[-0.05em] text-[#0f172a]">{OVERALL.accuracy}%</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{OVERALL.correctAnswers} / {OVERALL.totalQuestions} correct</p>
              </Card>
              
              <Card className="p-6 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 text-[#94a3b8] mb-3">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase">Time Taken</span>
                </div>
                <p className="text-3xl font-black tracking-[-0.05em] text-[#0f172a]">{OVERALL.timeTaken}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Est: {OVERALL.estTotalTime}</p>
              </Card>

              <Card className="p-6 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 text-[#94a3b8] mb-3">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase">Efficiency</span>
                </div>
                <p className="text-3xl font-black tracking-[-0.05em] text-[#0f172a]">{OVERALL.timeEfficiency}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Faster than average</p>
              </Card>

              <Card className="p-6 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 text-[#94a3b8] mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase">Needs Attention</span>
                </div>
                <p className="text-3xl font-black tracking-[-0.05em] text-amber-600">{OVERALL.needsAttention}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Items to review</p>
              </Card>

              <Card className="p-6 flex flex-col justify-center sm:col-span-2 bg-white">
                <div className="flex items-center gap-2 text-[#94a3b8] mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase">Psychometric Gate</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-black tracking-[-0.05em] text-emerald-600">PASSED</p>
                  <p className="text-sm text-slate-600 font-medium">All 5 Traits Cleared</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* --- 3. DOMAIN PERFORMANCE --- */}
        <section>
          <SectionHeader title="Speed vs. Accuracy Matrix" description="Meaningful insights into performance efficiency across core competencies." />
          <Card className="p-8 bg-white">
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 40, right: 60, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    type="number" 
                    dataKey="ratio" 
                    name="Time Ratio" 
                    domain={[0.85, 1.1]} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                    label={{ value: 'Speed (Time Ratio - Lower is Faster)', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="percentage" 
                    name="Accuracy" 
                    domain={[60, 100]} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                    label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                  />
                  <ZAxis type="number" range={[150, 150]} />
                  <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                  <ReferenceLine x={1.0} stroke="#cbd5e1" strokeDasharray="3 3" />
                  <ReferenceLine y={80} stroke="#cbd5e1" strokeDasharray="3 3" />
                  <Scatter name="Domains" data={DOMAINS}>
                    {DOMAINS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <LabelList dataKey="shortName" position="top" style={{ fontSize: '10px', fontWeight: 900, fill: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', stroke: 'white', strokeWidth: 4, paintOrder: 'stroke' }} offset={12} />
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6">
              {DOMAINS.map((domain: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${domain.color}`} />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{domain.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase flex flex-wrap items-center justify-center gap-8">
              <span>Top Left: Fast & Accurate</span>
              <span>Top Right: Slow & Accurate</span>
              <span>Bottom Left: Fast & Inaccurate</span>
              <span>Bottom Right: Slow & Inaccurate</span>
            </div>
          </Card>
        </section>

        {/* --- 4. DOMAIN DEEP DIVE --- */}
        <section className="space-y-12">
          <SectionHeader title="Domain Deep Dive" description="Comprehensive analysis and actionable insights for each core competency." />
          
          <div className="space-y-10">
            {DOMAINS.map((domain, idx) => (
              <DomainCard key={idx} domain={domain} />
            ))}
          </div>
        </section>

        {reportData.psychometric && (
          <section>
            <SectionHeader title="Psychometric Profile" description="Behavioral and personality traits assessment." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {reportData.psychometric.map((trait: any, idx: number) => (
                <Card key={idx} className="p-6 flex flex-col items-center justify-center bg-white text-center">
                  <p className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-6 h-8 flex items-center">{trait.trait}</p>
                  <div className="w-full">
                    <Badge variant={trait.status === 'PASS' ? 'solid-green' : 'solid-red'} className="w-full justify-center flex text-[10px] font-black tracking-[0.25em] uppercase py-2">
                      {trait.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* --- 6. FINAL SUMMARY --- */}
        <section className="pt-4">
          <Card className="p-8 bg-[#0f172a] text-white border-none shadow-md">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 text-[#D62027]" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-[-0.05em] text-white mb-3">Final Assessment Summary</h3>
                <p className="text-[#94a3b8] leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: SUMMARY_INSIGHT.replace(/<strong>/g,'<strong style="color:white">') }} />
              </div>
            </div>
          </Card>
        </section>

      </main>
    </div>
  );
}

export default function App() {
  const [selectedStudent, setSelectedStudent] = React.useState<any | null>(null);
  const [students, setStudents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_URL}/students`)
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch students:', err);
        setLoading(false);
      });
  }, []);

  if (selectedStudent) {
    return <ReportPage student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D62027] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#0f172a] font-bold uppercase tracking-widest text-sm">Loading Student Directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans selection:bg-red-100 selection:text-red-900 pb-24">
      {/* --- Top Navigation / Branding --- */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl font-black tracking-[-0.05em]">
              <span className="text-[#D62027]">Grad</span>
              <span className="text-[#000000]">360&deg;</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="hidden sm:inline-block text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mt-1">Placement Readiness Platform</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[#0f172a] mb-3">Student Directory</h1>
          <p className="text-slate-500 font-medium">Select a student to view their detailed Placement Readiness Index (PRI) report.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card 
              key={student.student_id} 
              className="p-6 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-transparent hover:border-slate-200 group"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-xl font-black text-slate-700">
                  {student.student_name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black tracking-[-0.05em] text-[#0f172a]">{student.overall_accuracy_pct}</div>
                  <div className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase">Accuracy</div>
                </div>
              </div>
              
              <h3 className="text-xl font-black tracking-[-0.05em] text-[#0f172a] mb-1 group-hover:text-[#D62027] transition-colors">{student.student_name}</h3>
              <p className="text-[10px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-4">{student.student_id} · {student.programme || 'MBA'}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">Infinitica Business School</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.batch === 'A' || student.batch === 'B' || student.batch === 'C' ? `Batch ${student.batch}` : student.batch}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 group-hover:text-[#D62027] transition-colors">View Full Report</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D62027] transition-colors group-hover:translate-x-1" />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
