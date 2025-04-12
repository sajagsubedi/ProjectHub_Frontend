import Header from "@/components/publicComponents/Header";
import Footer from "@/components/publicComponents/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
