import Section, { SectionTitle } from './Section';
import { Play, CheckCircle2, ChevronDown, Workflow } from 'lucide-react';

const NOTEBOOKS = [
  { id: '01', name: '01_generate_data', desc: 'Synthetic footfall + billing data generation' },
  { id: '02', name: '02_bronze', desc: 'Raw-preserving ingestion with metadata' },
  { id: '03', name: '03_silver', desc: 'Cleaning, casting, deduplication, validation' },
  { id: '04', name: '04_gold', desc: 'Store-hour aggregation and analytics dataset' },
  { id: '05', name: '05_analysis', desc: 'Conversion analysis and CSV export' },
];

export default function Automation() {
  return (
    <Section id="automation">
      <SectionTitle subtitle="Databricks Job orchestration automating the complete pipeline.">
        Job Automation
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Notebook sequence */}
        <div className="space-y-2">
          {NOTEBOOKS.map((nb, i) => (
            <div key={nb.id}>
              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-lg p-4 hover:border-emerald/20 transition-colors">
                <div className="w-8 h-8 rounded-md bg-emerald/10 text-emerald flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {nb.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 font-mono">{nb.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{nb.desc}</div>
                </div>
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
              </div>
              {i < NOTEBOOKS.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ChevronDown size={12} className="text-slate-700" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Job status */}
        <div className="space-y-6">
          <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald/10">
                <CheckCircle2 size={20} className="text-emerald" />
              </div>
              <div>
                <div className="text-sm font-medium text-emerald">Scheduled Job Run — Success</div>
                <div className="text-xs text-slate-500">All 5 tasks completed successfully</div>
              </div>
            </div>
            <div className="space-y-2">
              {NOTEBOOKS.map(nb => (
                <div key={nb.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{nb.name}</span>
                  <span className="text-emerald font-medium">✓ Success</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Workflow size={16} className="text-accent" />
              <span className="text-sm font-medium text-slate-300">Orchestration Layer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The five notebooks were wrapped in a Databricks Job and executed in dependency order.
              This is an orchestration layer — it automates the end-to-end pipeline execution
              rather than introducing additional data processing logic.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
