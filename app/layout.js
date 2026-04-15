import "../styles/responsive.css";
import "react-easy-crop/react-easy-crop.css";
import "./globals.css";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";

export const playfair = Playfair_Display({ subsets:["latin"] });
export const dancing = Dancing_Script({ subsets:["latin"] });
export const inter = Inter({ subsets:["latin"] });
export const metadata = {
  title: "Linkarsha",
  description: "Creator economy OS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
