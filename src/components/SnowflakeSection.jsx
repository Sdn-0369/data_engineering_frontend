import Section, { SectionTitle } from './Section';
import { Snowflake, Database, Table, BarChart3, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/data';

const FLOW = [
  { icon: Database, label: 'Gold CSV', desc: 'Exported from Databricks Gold layer' },
  { icon: Snowflake, label: 'Snowflake Stage', desc: 'File staged in cloud storage' },
  { icon: Table, label: 'GOLD_STORE_HOUR', desc: 'Loaded into structured table' },
  { icon: BarChart3, label: 'SQL Analytics', desc: 'Queries run against warehouse' },
];

const VALIDATION = [
  { label: 'Rows', value: '12,960' },
  { label: 'Bills', value: '86,594' },
  { label: 'Revenue', value: '₹44,766,657.04' },
  { label: 'sensor_ok = TRUE', value: '12,420', ok: true },
  { label: 'sensor_ok = FALSE', value: '540', ok: false },
];

export default function SnowflakeSection() {
  return (
    <Section id="snowflake" pattern>
      <SectionTitle subtitle="Snowflake serves as the cloud data warehouse and analytics destination.">
        Snowflake Integration
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pipeline flow */}
        <div className="space-y-3">
          {FLOW.map((step, i) => (
            <div key={step.label}>
              <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-lg p-4">
                <div className="p-2 rounded-lg bg-cyan/10 text-cyan shrink-0">
                  <step.icon size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{step.label}</div>
                  <div className="text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>
              {i < FLOW.length - 1 && (
                <div className="flex justify-center py-1">
                  <ChevronDown size={14} className="text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Table name */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="text-xs text-slate-500 mb-2">Snowflake Table</div>
            <code className="text-sm text-cyan font-mono break-all">STORE_FOOTFALL_DB.CAPSTONE.GOLD_STORE_HOUR</code>
          </div>

          {/* Validation metrics */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <div className="text-xs text-slate-500 mb-4">Validation Metrics</div>
            <div className="space-y-3">
              {VALIDATION.map(v => (
                <div key={v.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 flex items-center gap-2">
                    {v.ok === true && <CheckCircle2 size={12} className="text-emerald" />}
                    {v.ok === false && <XCircle size={12} className="text-rose" />}
                    {v.label}
                  </span>
                  <span className="font-mono text-sm text-white">{v.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            The website currently uses the exported CSV outputs — it does not directly query Snowflake.
            Snowflake was used as the warehouse/analytics destination for the Gold dataset during the project.
          </p>
        </div>
      </div>
    </Section>
  );
}
