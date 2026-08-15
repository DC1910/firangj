import React from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

export const WishlistButton = ({ prop, className, variant = "floating" }) => {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(prop.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(prop.id);
    toast(active ? "Removed from wishlist" : "Saved to wishlist", {
      description: prop.name,
    });
  };

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={handleClick}
      className={cn(
        "group/wish inline-flex items-center justify-center transition-colors duration-300",
        variant === "floating" &&
          "h-9 w-9 rounded-full bg-background/85 backdrop-blur-sm border border-border hover:bg-background",
        variant === "inline" && "h-11 w-11 rounded-sm border border-input hover:bg-secondary",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-300",
          active ? "fill-burgundy text-burgundy" : "text-foreground group-hover/wish:text-accent"
        )}
      />
    </button>
  );
};
