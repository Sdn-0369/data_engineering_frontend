import Section, { SectionTitle } from './Section';
import { Code2, FileText, Database, Snowflake, FolderOutput, ExternalLink } from 'lucide-react';

const ARTIFACTS = [
  { label: 'GitHub Repository', icon: Code2, href: '#', placeholder: true },
  { label: 'Databricks Pipeline', icon: Database, href: '#', placeholder: true },
  { label: 'Snowflake SQL', icon: Snowflake, href: '#', placeholder: true },
  { label: 'Final Report', icon: FileText, href: '#', placeholder: true },
  { label: 'Dataset Outputs', icon: FolderOutput, href: '#', placeholder: true },
];

export default function Artifacts() {
  return (
    <Section id="artifacts">
      <SectionTitle subtitle="Project deliverables and source material.">
        Project Artifacts
      </SectionTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ARTIFACTS.map(a => (
          <a
            key={a.label}
            href={a.href}
            target={a.placeholder ? undefined : '_blank'}
            rel={a.placeholder ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-3 bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-accent/20 hover:bg-slate-900/60 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
              <a.icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-200 group-hover:text-accent transition-colors">{a.label}</div>
              {a.placeholder && <div className="text-xs text-slate-600 mt-0.5">URL to be configured</div>}
            </div>
            <ExternalLink size={14} className="text-slate-600 group-hover:text-accent transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </Section>
  );
}
