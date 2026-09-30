import type { ReactNode } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import SupportChatWidget from "./_components/SupportChatWidget";

export default function WebsiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <main className="site-main flex-1 pt-16">{children}</main>
      <Footer />
      <SupportChatWidget />
    </>
  );
}
