"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getHeaderData } from "@/app/actions/headerActions";

import AuthModal from "@/components/auth/AuthModal";

interface CartWishlistState {
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  refresh: () => Promise<void>;
  openAuthModal: (mode?: "login" | "register") => void;
}

const CartWishlistContext = createContext<CartWishlistState>({
  cartCount: 0,
  wishlistCount: 0,
  isLoggedIn: false,
  refresh: async () => {},
  openAuthModal: () => {},
});

export function CartWishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const refresh = useCallback(async () => {
    const data = await getHeaderData();
    setCartCount(data.cartCount);
    setWishlistCount(data.wishlistCount);
    setIsLoggedIn(data.isLoggedIn);
  }, []);

  const openAuthModal = useCallback((mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Listen to custom events dispatched after mutations
  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("cart:updated", handler);
    window.addEventListener("wishlist:updated", handler);
    return () => {
      window.removeEventListener("cart:updated", handler);
      window.removeEventListener("wishlist:updated", handler);
    };
  }, [refresh]);

  return (
    <CartWishlistContext.Provider
      value={{ cartCount, wishlistCount, isLoggedIn, refresh, openAuthModal }}
    >
      {children}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  return useContext(CartWishlistContext);
}

/** Call this after any cart mutation to instantly update the header */
export function notifyCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:updated"));
  }
}

/** Call this after any wishlist mutation to instantly update the header */
export function notifyWishlistUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("wishlist:updated"));
  }
}
