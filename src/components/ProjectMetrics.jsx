import Section, { SectionTitle } from './Section';
import MetricCard from './MetricCard';
import { Store, Database, FileCheck, FileX, Copy, Clock, AlertCircle, WifiOff, CheckCircle2, XCircle, IndianRupee, Layers } from 'lucide-react';

const METRICS = [
  { value: '12', label: 'Stores', icon: Store },
  { value: '12,960', label: 'Gold Rows', icon: Layers },
  { value: '86,859', label: 'Bronze Bills', icon: Database },
  { value: '86,594', label: 'Valid Bills', icon: FileCheck },
  { value: '130', label: 'Duplicates Removed', icon: Copy },
  { value: '75', label: 'Unknown Store Rejections', icon: FileX },
  { value: '60', label: 'Outside-Hours Rejections', icon: Clock },
  { value: '300', label: 'ERR Footfall Values', icon: AlertCircle },
  { value: '240', label: 'OFFLINE Records', icon: WifiOff },
  { value: '12,420', label: 'Usable Sensor Hours', icon: CheckCircle2 },
  { value: '540', label: 'Unusable Sensor Hours', icon: XCircle },
  { value: '₹44,766,657.04', label: 'Total Revenue', icon: IndianRupee },
];

export default function ProjectMetrics() {
  return (
    <Section id="metrics" pattern>
      <SectionTitle subtitle="Complete project metrics across the data pipeline.">
        Key Project Metrics
      </SectionTitle>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {METRICS.map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </Section>
  );
}
