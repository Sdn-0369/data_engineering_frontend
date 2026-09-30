import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import BusinessProblem from './components/BusinessProblem';
import Objectives from './components/Objectives';
import Pipeline from './components/Pipeline';
import DataQuality from './components/DataQuality';
import GoldExplorer from './components/GoldExplorer';
import AnalyticsTabs from './components/AnalyticsTabs';
import SnowflakeSection from './components/SnowflakeSection';
import Automation from './components/Automation';
import Architecture from './components/Architecture';
import Conclusions from './components/Conclusions';
import ProjectMetrics from './components/ProjectMetrics';
import Artifacts from './components/Artifacts';
import Author from './components/Author';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <BusinessProblem />
        <Objectives />
        <Pipeline />
        <DataQuality />
        <GoldExplorer />
        <AnalyticsTabs />
        <SnowflakeSection />
        <Automation />
        <Architecture />
        <Conclusions />
        <ProjectMetrics />
        <Artifacts />
        <Author />
      </main>
      <Footer />
    </div>
  );
}
