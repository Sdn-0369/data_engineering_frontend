import { useInView } from '../utils/hooks';

export default function Section({ id, children, className = '', pattern = false }) {
  const [ref, isInView] = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${pattern ? 'section-pattern' : ''} ${className}`}
    >
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 tracking-tight">{children}</h2>
      {subtitle && <p className="mt-3 text-slate-400 text-lg max-w-2xl">{subtitle}</p>}
      <div className="mt-4 h-0.5 w-12 bg-accent rounded-full" />
    </div>
  );
}
