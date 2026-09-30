import Section, { SectionTitle } from './Section';
import { ArrowRight, Database, Filter, BarChart3 } from 'lucide-react';

const FLOW_STEPS = [
  { icon: Database, label: 'Raw Data', desc: 'Footfall counters + billing systems' },
  { icon: Filter, label: 'Clean Data', desc: 'Validated via Bronze → Silver → Gold' },
  { icon: BarChart3, label: 'Analytics', desc: 'Store-hour conversion insights' },
];

export default function Overview() {
  return (
    <Section id="overview">
      <SectionTitle subtitle="Understanding the data engineering pipeline that transforms raw operational data into validated analytics.">
        Project Overview
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            This project combines footfall-counter data and billing-system data at a common
            <span className="text-accent font-medium"> store + date + hour </span>
            grain to measure sales conversion and identify periods where traffic and purchasing behaviour diverge.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The system transforms raw operational data into a validated analytical dataset through a
            medallion architecture — Bronze, Silver, and Gold layers — implemented on Databricks
            with Apache Spark and PySpark. The final Gold dataset is then exported and loaded into
            Snowflake for downstream SQL analytics.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Across <span className="font-mono text-slate-300">12 stores</span>,{' '}
            <span className="font-mono text-slate-300">90 trading days</span>, and{' '}
            <span className="font-mono text-slate-300">12 hours per day</span>, the pipeline produces
            exactly <span className="font-mono text-accent">12,960</span> store-hour records in the
            Gold layer.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="space-y-4">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.label}>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent shrink-0">
                    <step.icon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">{step.label}</div>
                    <div className="text-sm text-slate-500">{step.desc}</div>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight size={14} className="text-slate-600 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
