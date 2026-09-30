import Section, { SectionTitle } from './Section';
import { Download, Layers, ShieldCheck, GitMerge, BarChart3, Database, Workflow, Clock, Search, Snowflake as SnowflakeIcon } from 'lucide-react';

const OBJECTIVES = [
  { icon: Download, text: 'Ingest footfall and billing data' },
  { icon: Database, text: 'Preserve raw source information in Bronze' },
  { icon: ShieldCheck, text: 'Clean and validate operational data in Silver' },
  { icon: GitMerge, text: 'Handle duplicates and invalid records' },
  { icon: Layers, text: 'Build a reliable Gold dataset at store-hour grain' },
  { icon: BarChart3, text: 'Calculate sales conversion' },
  { icon: Clock, text: 'Analyze conversion across hours' },
  { icon: Search, text: 'Analyze conversion across different footfall levels' },
  { icon: SnowflakeIcon, text: 'Load the Gold dataset into Snowflake' },
  { icon: Workflow, text: 'Automate the Databricks pipeline using a scheduled Job' },
];

export default function Objectives() {
  return (
    <Section id="objectives">
      <SectionTitle subtitle="The ten objectives this capstone project set out to achieve.">
        Project Objectives
      </SectionTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OBJECTIVES.map((obj, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 bg-slate-900/40 border border-slate-800/60 rounded-lg p-4 hover:border-accent/20 hover:bg-slate-900/60 transition-all duration-300"
          >
            <div className="p-1.5 rounded-md bg-accent/10 text-accent shrink-0 mt-0.5">
              <obj.icon size={14} />
            </div>
            <div>
              <span className="text-xs text-slate-600 font-mono">#{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-slate-300 mt-0.5">{obj.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
