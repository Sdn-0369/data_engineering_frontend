import { useState, useMemo } from 'react';
import Section, { SectionTitle } from './Section';
import { useCSV, formatNumber, formatCurrency, formatPercent, formatHour } from '../utils/data';
import { Download, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

const PAGE_SIZE = 25;

export default function GoldExplorer() {
  const { data, columns, loading, error } = useCSV('/data/gold_store_hour.csv');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [filters, setFilters] = useState({ store_id: '', city: '', format: '', hour: '', sensor_ok: '' });

  // Unique filter options
  const filterOptions = useMemo(() => {
    if (!data.length) return {};
    return {
      store_id: [...new Set(data.map(r => r.store_id))].sort(),
      city: [...new Set(data.map(r => r.city))].sort(),
      format: [...new Set(data.map(r => r.format))].sort(),
      hour: [...new Set(data.map(r => r.hour))].sort((a, b) => a - b),
      sensor_ok: ['true', 'false'],
    };
  }, [data]);

  // Filter + search + sort
  const filteredData = useMemo(() => {
    let result = data;

    // Apply filters
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== '') {
        result = result.filter(r => String(r[key]) === val);
      }
    });

    // Apply search
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(r =>
        Object.values(r).some(v => String(v).toLowerCase().includes(s))
      );
    }

    // Apply sort
    if (sortCol) {
      result = [...result].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === 'number' && typeof bv === 'number') {
          return sortDir === 'asc' ? av - bv : bv - av;
        }
        return sortDir === 'asc'
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av));
      });
    }

    return result;
  }, [data, filters, search, sortCol, sortDir]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const pageData = filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Summary stats from data
  const usable = useMemo(() => data.filter(r => r.sensor_ok === true || r.sensor_ok === 'true').length, [data]);
  const unusable = useMemo(() => data.filter(r => r.sensor_ok === false || r.sensor_ok === 'false').length, [data]);

  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
    setPage(0);
  }

  function handleFilter(key, val) {
    setFilters(f => ({ ...f, [key]: val }));
    setPage(0);
  }

  function formatCell(col, val) {
    if (val == null || val === '') return <span className="text-slate-600">—</span>;
    if (col === 'revenue') return formatCurrency(val);
    if (col === 'conversion_rate') return formatPercent(val);
    if (col === 'hour') return formatHour(val);
    if (col === 'sensor_ok') {
      const ok = val === true || val === 'true';
      return ok
        ? <span className="inline-flex items-center gap-1 text-emerald text-xs"><CheckCircle2 size={12} /> TRUE</span>
        : <span className="inline-flex items-center gap-1 text-rose text-xs"><XCircle size={12} /> FALSE</span>;
    }
    if (col === 'footfall' || col === 'bills') return formatNumber(val);
    return String(val);
  }

  if (loading) {
    return (
      <Section id="gold-explorer">
        <SectionTitle>Gold Dataset Explorer</SectionTitle>
        <div className="text-center py-20 text-slate-500">Loading gold_store_hour.csv...</div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="gold-explorer">
        <SectionTitle>Gold Dataset Explorer</SectionTitle>
        <div className="bg-rose/10 border border-rose/30 rounded-xl p-6 text-center">
          <p className="text-rose">Unable to load gold_store_hour.csv.</p>
          <p className="text-slate-400 text-sm mt-2">{error}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="gold-explorer" pattern>
      <SectionTitle subtitle="Explore the complete Gold-layer analytical dataset.">
        Gold Dataset Explorer
      </SectionTitle>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-4 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-lg text-sm">
          <span className="text-slate-400">Rows:</span>
          <span className="font-mono text-white">{formatNumber(data.length)}</span>
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald/5 border border-emerald/20 rounded-lg text-sm">
          <CheckCircle2 size={14} className="text-emerald" />
          <span className="text-slate-400">Usable Sensor Hours:</span>
          <span className="font-mono text-emerald">{formatNumber(usable)}</span>
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose/5 border border-rose/20 rounded-lg text-sm">
          <XCircle size={14} className="text-rose" />
          <span className="text-slate-400">Unusable:</span>
          <span className="font-mono text-rose">{formatNumber(unusable)}</span>
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search across all columns..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Filter dropdowns */}
        {['store_id', 'city', 'format', 'hour', 'sensor_ok'].map(key => (
          <select
            key={key}
            value={filters[key]}
            onChange={e => handleFilter(key, e.target.value)}
            className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer"
            aria-label={`Filter by ${key}`}
          >
            <option value="">{key.replace('_', ' ')}</option>
            {(filterOptions[key] || []).map(v => (
              <option key={String(v)} value={String(v)}>{key === 'hour' ? formatHour(v) : String(v)}</option>
            ))}
          </select>
        ))}

        {/* Download */}
        <a
          href="/data/gold_store_hour.csv"
          download="gold_store_hour.csv"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-sm text-accent hover:bg-accent/20 transition-colors whitespace-nowrap"
        >
          <Download size={14} />
          Download CSV
        </a>
      </div>

      {/* Results count */}
      <div className="text-xs text-slate-500 mb-3">
        Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredData.length)} of {formatNumber(filteredData.length)} rows
        {filteredData.length !== data.length && ` (filtered from ${formatNumber(data.length)})`}
      </div>

      {/* Table */}
      <div className="table-container rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              {columns.map(col => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="px-3 py-2.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors whitespace-nowrap select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {col}
                    {sortCol === col ? (
                      sortDir === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />
                    ) : (
                      <ArrowUpDown size={10} className="opacity-30" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {pageData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                {columns.map(col => (
                  <td key={col} className="px-3 py-2 text-slate-300 whitespace-nowrap font-mono text-xs">
                    {formatCell(col, row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-slate-500">
            Page {page + 1} of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <PaginationBtn onClick={() => setPage(0)} disabled={page === 0}><ChevronsLeft size={14} /></PaginationBtn>
            <PaginationBtn onClick={() => setPage(p => p - 1)} disabled={page === 0}><ChevronLeft size={14} /></PaginationBtn>
            <PaginationBtn onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}><ChevronRight size={14} /></PaginationBtn>
            <PaginationBtn onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}><ChevronsRight size={14} /></PaginationBtn>
          </div>
        </div>
      )}
    </Section>
  );
}

function PaginationBtn({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      aria-label="Page navigation"
    >
      {children}
    </button>
  );
}
