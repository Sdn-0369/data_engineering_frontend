export default function MetricCard({ value, label, icon: Icon, className = '' }) {
  return (
    <div className={`group relative bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-accent/30 hover:bg-slate-900/80 transition-all duration-300 ${className}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
            <Icon size={18} />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-xl md:text-2xl font-semibold text-slate-100 font-mono tracking-tight">{value}</div>
          <div className="text-sm text-slate-400 mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
}
