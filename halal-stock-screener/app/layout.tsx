import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Navbar from '../_components/navbar.tsx'
import Footer from "../_components/footer.tsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Halal Stonks",
  description: "halal stocks screener for personal use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}