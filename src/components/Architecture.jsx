import Section, { SectionTitle } from './Section';
import { Database, Layers, ShieldCheck, Award, FileDown, Snowflake, ArrowDown, Workflow } from 'lucide-react';

export default function Architecture() {
  return (
    <Section id="architecture" pattern>
      <SectionTitle subtitle="End-to-end technical architecture from source data to SQL analytics.">
        Technical Architecture
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Main architecture */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Data Flow</h3>
          <div className="space-y-2">
            <ArchNode icon={Database} label="Source Data" sublabel="Footfall + Billing + Store Master" color="text-slate-400" />
            <ArchArrow />
            <ArchNode icon={Layers} label="Databricks" sublabel="Spark / PySpark Processing" color="text-orange-400" />
            <ArchArrow />

            {/* Medallion layers */}
            <div className="grid grid-cols-3 gap-2">
              <ArchLayer label="Bronze" color="bg-amber-500/10 border-amber-500/20 text-amber-400" />
              <ArchLayer label="Silver" color="bg-slate-400/10 border-slate-400/20 text-slate-300" />
              <ArchLayer label="Gold" color="bg-yellow-500/10 border-yellow-500/20 text-yellow-400" />
            </div>

            <ArchArrow />
            <ArchNode icon={FileDown} label="CSV Export" sublabel="Gold + Analysis Outputs" color="text-green-400" />
            <ArchArrow />
            <ArchNode icon={Snowflake} label="Snowflake" sublabel="Stage → Table → SQL Analytics" color="text-cyan-400" />
          </div>
        </div>

        {/* Job architecture */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Databricks Job</h3>
          <div className="flex items-center gap-2 mb-6">
            <Workflow size={16} className="text-accent" />
            <span className="text-sm text-slate-300 font-medium">Scheduled Orchestration</span>
          </div>

          <div className="space-y-2">
            {[
              { id: '01', name: 'generate_data' },
              { id: '02', name: 'bronze' },
              { id: '03', name: 'silver' },
              { id: '04', name: 'gold' },
              { id: '05', name: 'analysis' },
            ].map((nb, i) => (
              <div key={nb.id}>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/40 border border-slate-700/40 rounded-lg">
                  <span className="text-xs font-mono text-accent font-bold">{nb.id}</span>
                  <span className="text-sm font-mono text-slate-300">{nb.name}</span>
                </div>
                {i < 4 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown size={10} className="text-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-slate-500 leading-relaxed">
            Tasks execute in dependency order. Each task corresponds to a Databricks notebook.
            The job runs as a single scheduled workflow.
          </div>
        </div>
      </div>
    </Section>
  );
}

function ArchNode({ icon: Icon, label, sublabel, color }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/40 border border-slate-700/30 rounded-lg">
      <Icon size={18} className={color} />
      <div>
        <div className="text-sm font-medium text-slate-200">{label}</div>
        <div className="text-xs text-slate-500">{sublabel}</div>
      </div>
    </div>
  );
}

function ArchArrow() {
  return (
    <div className="flex justify-center py-0.5">
      <ArrowDown size={14} className="text-slate-600" />
    </div>
  );
}

function ArchLayer({ label, color }) {
  return (
    <div className={`text-center px-3 py-2 rounded-lg border text-xs font-medium ${color}`}>
      {label}
    </div>
  );
}
