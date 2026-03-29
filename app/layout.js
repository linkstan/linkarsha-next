import "../styles/responsive.css";
import "react-easy-crop/react-easy-crop.css";
import "./globals.css";

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
