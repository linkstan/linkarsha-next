import "react-easy-crop/react-easy-crop.css";
import "./globals.css";

export const metadata = {
  title: "Linkarsha",
  description: "Creator economy OS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0,fontFamily:"Arial"}}>
        {children}
      </body>
    </html>
  );
}
