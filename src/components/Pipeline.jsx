import { useState } from 'react';
import Section, { SectionTitle } from './Section';
import { Database, Layers, ShieldCheck, Award, FileDown, Snowflake, ChevronRight } from 'lucide-react';

const STAGES = [
  {
    id: 'raw',
    icon: Database,
    label: 'Raw Data',
    color: 'text-slate-400 border-slate-600 bg-slate-800/50',
    activeColor: 'text-white border-accent bg-accent/10',
    detail: {
      title: 'Source Data',
      desc: 'Three original source datasets — footfall counter readings, billing system transactions, and store master data. All fields arrive as raw strings.',
    },
  },
  {
    id: 'bronze',
    icon: Layers,
    label: 'Bronze',
    color: 'text-amber-400 border-amber-700/40 bg-amber-900/10',
    activeColor: 'text-amber-300 border-amber-500 bg-amber-900/20',
    detail: {
      title: 'Bronze — Raw Preservation',
      desc: 'Every incoming column is initially treated as string/raw. Metadata columns (_source_file, _ingested_at, _row_hash) are added for lineage and deduplication. No transformations are applied — the raw data is faithfully preserved.',
    },
  },
  {
    id: 'silver',
    icon: ShieldCheck,
    label: 'Silver',
    color: 'text-slate-300 border-slate-500/40 bg-slate-700/10',
    activeColor: 'text-slate-100 border-slate-400 bg-slate-700/20',
    detail: {
      title: 'Silver — Cleaning & Validation',
      desc: 'Safe type casting, deduplication (130 duplicate bills removed), ERR/OFFLINE footfall handling (300 + 240 records), unknown-store rejection (75 bills), outside-trading-hours rejection (60 bills), and sensor_ok flag derivation.',
    },
  },
  {
    id: 'gold',
    icon: Award,
    label: 'Gold',
    color: 'text-yellow-400 border-yellow-600/40 bg-yellow-900/10',
    activeColor: 'text-yellow-300 border-yellow-500 bg-yellow-900/20',
    detail: {
      title: 'Gold — Analytical Dataset',
      desc: 'One row per store_id + trade_date + hour. Exactly 12,960 records covering 12 stores × 90 days × 12 hours. Contains footfall, bills, revenue, conversion_rate, and sensor_ok for each store-hour combination.',
    },
  },
  {
    id: 'csv',
    icon: FileDown,
    label: 'CSV Export',
    color: 'text-green-400 border-green-700/40 bg-green-900/10',
    activeColor: 'text-green-300 border-green-500 bg-green-900/20',
    detail: {
      title: 'CSV Export',
      desc: 'The Gold dataset and analytical query results are exported as CSV files for downstream consumption — enabling portability, version control, and direct loading into Snowflake.',
    },
  },
  {
    id: 'snowflake',
    icon: Snowflake,
    label: 'Snowflake',
    color: 'text-cyan-400 border-cyan-700/40 bg-cyan-900/10',
    activeColor: 'text-cyan-300 border-cyan-500 bg-cyan-900/20',
    detail: {
      title: 'Snowflake — Warehouse & Analytics',
      desc: 'CSV files are loaded via Snowflake Stage into the GOLD_STORE_HOUR table in STORE_FOOTFALL_DB.CAPSTONE schema. SQL analytics are run directly against the warehouse for validation and exploration.',
    },
  },
];

export default function Pipeline() {
  const [activeStage, setActiveStage] = useState('gold');
  const active = STAGES.find(s => s.id === activeStage);

  return (
    <Section id="pipeline" pattern>
      <SectionTitle subtitle="The medallion architecture transforming raw data into validated analytics.">
        Data Pipeline
      </SectionTitle>

      {/* Desktop horizontal pipeline */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between gap-2 mb-8">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStage(stage.id)}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer w-full ${
                  activeStage === stage.id ? stage.activeColor : stage.color
                } hover:scale-105`}
                aria-label={`View ${stage.label} details`}
              >
                <stage.icon size={22} />
                <span className="text-xs font-medium whitespace-nowrap">{stage.label}</span>
              </button>
              {i < STAGES.length - 1 && (
                <ChevronRight size={16} className="text-slate-600 mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical pipeline */}
      <div className="md:hidden space-y-2 mb-8">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
              activeStage === stage.id ? stage.activeColor : stage.color
            }`}
            aria-label={`View ${stage.label} details`}
          >
            <stage.icon size={18} />
            <span className="text-sm font-medium">{stage.label}</span>
            <ChevronRight size={14} className="ml-auto" />
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {active && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 animate-fade-in" key={active.id}>
          <h3 className="text-lg font-medium text-slate-200 mb-3">{active.detail.title}</h3>
          <p className="text-slate-400 leading-relaxed">{active.detail.desc}</p>
        </div>
      )}
    </Section>
  );
}
