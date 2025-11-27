import PerformancePageHeader from '@/components/modules/dashboard/performance/PerformancePageHeader';
import PerformanceTable from '@/components/modules/dashboard/performance/PerformanceTable';


const PerformancePage = () => {
  return (
    <div className='space-y-4'>
      <PerformancePageHeader />
      <PerformanceTable />
    </div>
  );
};

export default PerformancePage;