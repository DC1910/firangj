import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categoryName, formatINR } from "@/data/firangi";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { WishlistButton } from "./WishlistButton";

export const ProductCard = ({ prop, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      className="group flex flex-col"
    >
      <Link to={`/product/${prop.id}`} className="block">
        <div className="relative overflow-hidden bg-muted aspect-[4/5]">
          <img
            src={prop.images[0]}
            alt={prop.name}
            loading="lazy"
            className="editorial-img h-full w-full object-cover transition-transform [transition-duration:900ms] ease-editorial group-hover:scale-[1.05]"
          />
          {prop.images[1] && (
            <img
              src={prop.images[1]}
              alt={`${prop.name} alternate`}
              loading="lazy"
              className="editorial-img absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <div className="absolute right-3 top-3 z-10">
            <WishlistButton prop={prop} />
          </div>
        </div>
      </Link>

      <div className="mt-4 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-muted-foreground">{categoryName(prop.category)}</span>
          <AvailabilityBadge status={prop.availability} />
        </div>
        <Link to={`/product/${prop.id}`}>
          <h3 className="mt-2 font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-accent">
            {prop.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-baseline gap-1 pt-3">
          <span className="text-sm font-medium text-foreground">{formatINR(prop.pricePerDay)}</span>
          <span className="text-xs text-muted-foreground">/ day</span>
        </div>
      </div>
    </motion.article>
  );
};
