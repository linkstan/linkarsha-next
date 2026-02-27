export const metadata = {
  title: "Linkarsha",
  description: "Creator economy OS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background:"#0b0b0f",color:"white",fontFamily:"Arial"}}>
        {children}
      </body>
    </html>
  );
}
