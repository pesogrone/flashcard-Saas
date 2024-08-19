import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Footer"; // Adjust the path accordingly
import Header from "./Header"; // Adjust the path accordingly
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interviu",
  description: "Generate flashcards for effective learning",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
