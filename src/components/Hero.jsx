import { ArrowDown, Database, Snowflake, Sparkles, Zap, Code2, LayoutDashboard, BarChart3 } from 'lucide-react';

const BADGES = [
  { label: 'Databricks', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  { label: 'Apache Spark', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  { label: 'PySpark', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  { label: 'Snowflake', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  { label: 'SQL', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { label: 'React', color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  { label: 'Vite', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
];

const METRICS = [
  { value: '12', label: 'Stores' },
  { value: '12,960', label: 'Gold Rows' },
  { value: '86,594', label: 'Valid Bills' },
  { value: '12,420', label: 'Usable Sensor Hours' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 section-pattern opacity-40" />
      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Project type tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8 animate-fade-in">
          <Database size={12} />
          Data Engineering Capstone
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight animate-fade-in-up">
          Store Footfall vs
          <br />
          <span className="text-accent-light">Sales Conversion</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          A Databricks + Snowflake data engineering pipeline for transforming raw footfall and billing data into actionable store-hour conversion analytics.
        </p>

        {/* Tech badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 animate-fade-in-up delay-300">
          {BADGES.map(b => (
            <span key={b.label} className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${b.color}`}>
              {b.label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-400">
          <a
            href="#analytics"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <BarChart3 size={16} />
            Explore Analytics
          </a>
          <a
            href="#pipeline"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/50"
          >
            <Zap size={16} />
            View Pipeline
          </a>
        </div>

        {/* Metrics row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto animate-fade-in-up delay-500">
          {METRICS.map(m => (
            <div key={m.label} className="text-center">
              <div className="text-2xl font-bold text-white font-mono">{m.value}</div>
              <div className="text-xs text-slate-500 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-pulse-soft">
          <a href="#overview" className="inline-flex flex-col items-center text-slate-500 hover:text-slate-300 transition-colors" aria-label="Scroll to overview">
            <span className="text-xs mb-1">Scroll</span>
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
