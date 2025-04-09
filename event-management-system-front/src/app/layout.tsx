import type { Metadata } from "next";
import ThemeRegistry from '@/components/theme/ThemeRegistry';
import Layout from '@/components/layouts/Layout';
import QueryProvider from '@/components/providers/QueryProvider';
import { ToastContainer } from '@/components/containers/ToastContainer';
import GoogleMapsProvider from "@/components/providers/GoogleMapsProvider";

export const metadata: Metadata = {
  title: "Event Management System",
  description: "A system for managing and discovering events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <QueryProvider>
            <GoogleMapsProvider>
              <Layout>{children}</Layout>
              <ToastContainer />
            </GoogleMapsProvider>
          </QueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
