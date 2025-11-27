
import UserManagementHeader from "@/components/modules/dashboard/user-management/UserManagementHeader";
import UserTable from "@/components/modules/dashboard/user-management/UserTable";



const UsersPage = () => {
  return (
    <div className="space-y-4">
      <UserManagementHeader />
      <UserTable />
    </div>
  );
};

export default UsersPage;