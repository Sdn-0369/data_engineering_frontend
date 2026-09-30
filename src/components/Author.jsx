import Section, { SectionTitle } from './Section';
import { User, GraduationCap, BookOpen, Calendar, Code2, Link2 } from 'lucide-react';

export default function Author() {
  return (
    <Section id="author" pattern>
      <SectionTitle subtitle="About the project author.">
        Author
      </SectionTitle>

      <div className="max-w-lg mx-auto bg-slate-900/60 border border-slate-800 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <User size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Subham Debnath</h3>
            <p className="text-sm text-slate-400">Data Engineering Capstone</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <InfoRow icon={GraduationCap} label="Roll Number" value="2306070" />
          <InfoRow icon={BookOpen} label="Batch" value="DATABRICKS And SNOWFLAKE 2026" />
          <InfoRow icon={User} label="Project" value="Store Footfall vs Sales Conversion" />
          <InfoRow icon={GraduationCap} label="Submitted to" value="Dr. Kanthi Kiran" />
          <InfoRow icon={Calendar} label="Submission Date" value="30 September 2026" />
        </div>

        {/* Social links — placeholder */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex gap-3">
          <a href="#" className="p-2 rounded-lg bg-slate-800/50 text-slate-500 hover:text-accent hover:bg-accent/10 transition-colors" aria-label="GitHub profile">
            <Code2 size={16} />
          </a>
          <a href="#" className="p-2 rounded-lg bg-slate-800/50 text-slate-500 hover:text-accent hover:bg-accent/10 transition-colors" aria-label="LinkedIn profile">
            <Link2 size={16} />
          </a>
        </div>
        <p className="text-xs text-slate-600 mt-2">Social links to be configured</p>
      </div>
    </Section>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-slate-500 shrink-0" />
      <span className="text-slate-500 w-28 shrink-0">{label}</span>
      <span className="text-slate-300">{value}</span>
    </div>
  );
}
