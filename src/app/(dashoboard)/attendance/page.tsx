import AttendancePageHeader from "@/components/modules/dashboard/attendance/AttendancePageHeader";
import AttendanceTable from "@/components/modules/dashboard/attendance/AttendanceTable";


const AttendencePage = () => {
  return (
    <div className="space-y-4">
      <AttendancePageHeader />
      <AttendanceTable />
    </div>
  );
};

export default AttendencePage;