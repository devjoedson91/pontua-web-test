import type { Metadata } from "next";
import { Inter, Epilogue } from "next/font/google";
import "./globals.css";
import FormTypesProvider from "@/hooks/useFormControl";
import MenuControlProvider from "@/hooks/useMenuControl";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/auth";

const inter = Inter({ subsets: ["latin"] });

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <body className={epilogue.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <FormTypesProvider>
              <MenuControlProvider>
                <div className="flex-1">{children}</div>
              </MenuControlProvider>
            </FormTypesProvider>
          </AuthProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
