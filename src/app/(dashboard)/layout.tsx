import AdminHeader from "@/components/AdminHeader";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "ProjectHub -User dashboard",
  description: "User dashboard for project hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>
          <AdminHeader />
          {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}
