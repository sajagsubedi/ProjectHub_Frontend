// app/dashboard/layout.tsx
import DashboardSideBar from "@/components/dashboardComponents/DashboardSideBar";
import { ConfirmProvider } from "@/context/ConfirmProvider";
import ProtectedRoute from "@/components/Wrapper/ProtectedRoute";

export const metadata = {
  title: "ProjectHub - User dashboard",
  description: "User dashboard for project hub",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ConfirmProvider>
        <DashboardSideBar />
        {children}
      </ConfirmProvider>
    </ProtectedRoute>
  );
}
