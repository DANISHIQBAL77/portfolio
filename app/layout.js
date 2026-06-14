import "./globals.css";

export const metadata = {
  title: "Danish's Portfolio",
  description: "MERN Stack & Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}