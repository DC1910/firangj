import "./globals.css";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Studio Frangipani | Prop Rental Studio",
  description:
    "A curated prop rental studio for photographers, filmmakers and stylists. Objects with character, styled for the frame.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
