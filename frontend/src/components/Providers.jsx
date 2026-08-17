"use client";

import { WishlistProvider } from "@/context/WishlistContext";
import { RequestProvider } from "@/context/RequestContext";

export function Providers({ children }) {
  return (
    <WishlistProvider>
      <RequestProvider>{children}</RequestProvider>
    </WishlistProvider>
  );
}
