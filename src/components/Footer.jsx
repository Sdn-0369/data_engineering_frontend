import { BarChart3 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-500">
          <BarChart3 size={16} className="text-accent" />
          <span className="text-sm">Store Footfall vs Sales Conversion</span>
        </div>
        <div className="text-xs text-slate-600">
          Data Engineering Capstone · Subham Debnath · 2026
        </div>
      </div>
    </footer>
  );
}
