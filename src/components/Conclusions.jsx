import Section, { SectionTitle } from './Section';
import { CheckCircle2 } from 'lucide-react';

const CONCLUSIONS = [
  'Conversion varies significantly across hours of the day.',
  'The lowest chain-wide hourly conversion rates occur at hours 15, 16, and 14.',
  'The highest-footfall daily decile has lower conversion than the lowest-footfall decile.',
  'In the analyzed dataset, conversion falls from 0.1829 in the lowest-footfall decile to 0.1566 in the highest-footfall decile.',
  'Strong data-quality controls were required to produce a reliable analytical Gold layer.',
  'The final Gold dataset preserves all 12,960 store-hour combinations while explicitly marking unusable sensor periods.',
  'Databricks provides the transformation/orchestration layer while Snowflake provides the downstream warehouse and SQL analytics layer.',
];

export default function Conclusions() {
  return (
    <Section id="conclusions">
      <SectionTitle subtitle="Key observations from the completed analysis.">
        Key Findings
      </SectionTitle>

      <div className="space-y-3 max-w-3xl">
        {CONCLUSIONS.map((text, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-slate-900/40 border border-slate-800/60 rounded-lg p-4 hover:border-accent/20 transition-colors"
          >
            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-6 max-w-2xl">
        These are observed patterns in the analyzed dataset. No causal claims are made.
        The data covers 12 stores from 2025-04-01 to 2025-06-29 across 12 daily trading hours.
      </p>
    </Section>
  );
}
