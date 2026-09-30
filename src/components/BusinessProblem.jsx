import Section, { SectionTitle } from './Section';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export default function BusinessProblem() {
  return (
    <Section id="problem" pattern>
      <SectionTitle subtitle="The core business challenge that motivates this data engineering project.">
        Business Problem
      </SectionTitle>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <div className="p-2 rounded-lg bg-emerald/10 text-emerald w-fit mb-4">
            <TrendingUp size={20} />
          </div>
          <h3 className="font-medium text-slate-200 mb-2">Footfall Rising</h3>
          <p className="text-sm text-slate-400">Store traffic counters show increasing visitor numbers across the chain.</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <div className="p-2 rounded-lg bg-amber/10 text-amber w-fit mb-4">
            <TrendingDown size={20} />
          </div>
          <h3 className="font-medium text-slate-200 mb-2">Sales Flat</h3>
          <p className="text-sm text-slate-400">Despite more visitors, billing volumes remain relatively unchanged.</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <div className="p-2 rounded-lg bg-rose/10 text-rose w-fit mb-4">
            <AlertTriangle size={20} />
          </div>
          <h3 className="font-medium text-slate-200 mb-2">Gap Unknown</h3>
          <p className="text-sm text-slate-400">Raw footfall alone doesn't explain when and where conversion drops.</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
        <h3 className="text-lg font-medium text-slate-200 mb-4">The Key KPI</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-slate-800/60 rounded-lg px-6 py-4 font-mono text-center">
            <div className="text-accent text-lg font-semibold">Conversion Rate</div>
            <div className="text-slate-400 mt-1">=</div>
            <div className="text-slate-200 mt-1">
              <span className="text-emerald">Bills</span>{' '}
              <span className="text-slate-500">/</span>{' '}
              <span className="text-cyan">Footfall</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Conversion is calculated at the <span className="text-slate-300 font-medium">store + date + hour</span> grain,
            only when footfall data is usable (sensor OK and footfall &gt; 0). This gives a precise
            measure of how effectively each store converts foot traffic into transactions at each hour.
          </p>
        </div>
      </div>
    </Section>
  );
}
