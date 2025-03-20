import "./globals.css";

export const metadata = {
  title: "Unhinged Chicks",
  description: "Your go-to source for the wildest, most outrageous stories of women breaking the law, causing chaos, and making headlines. From bizarre crimes to public meltdowns, we cover the most unhinged moments with no filter.",
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
