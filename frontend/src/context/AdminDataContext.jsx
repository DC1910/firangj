"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  props as seedProps, rentalRequests as seedRequests, customers as seedCustomers,
  categories as seedCategories, getPropsByCategory,
} from "@/data/firangi";

const AdminDataContext = createContext(null);

// Enrich seed requests with fields the admin detail drawer expects.
const cities = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad"];
const enrichRequest = (r, i) => ({
  phone: `+91 9${(8200000000 + i * 111111).toString().slice(0, 9)}`,
  delivery: i % 2 === 0 ? "Studio delivery" : "Self pickup",
  location: `${cities[i % cities.length]} \u00B7 Studio floor`,
  notes: "Neutral palette, soft daylight. Please steam textiles before dispatch.",
  ...r,
  status: r.status === "completed" ? "returned" : r.status,
});

export const AdminDataProvider = ({ children }) => {
  const [props, setProps] = useState(() => seedProps.map((p) => ({ ...p, quantity: 1 + (p.rentalCount % 4) })));
  const [requests, setRequests] = useState(() => seedRequests.map(enrichRequest));
  const [customers] = useState(() => seedCustomers);
  const [categories, setCategories] = useState(() =>
    seedCategories.map((c) => ({ ...c, count: getPropsByCategory(c.slug).length })));

  const addProp = useCallback((data) => {
    setProps((prev) => {
      const id = `fr-${String(prev.length + 1).padStart(3, "0")}-${Date.now().toString().slice(-4)}`;
      const prop = {
        id,
        slug: (data.name || "new-prop").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: data.name || "Untitled Prop",
        category: data.category || "decor",
        description: data.description || "",
        pricePerDay: Number(data.pricePerDay) || 500,
        images: data.images && data.images.length ? data.images : [seedProps[0].images[0]],
        color: data.color || "Neutral",
        material: data.material || "\u2014",
        dimensions: data.dimensions || "\u2014",
        condition: data.condition || "Excellent",
        style: data.style || "Contemporary",
        shootTypes: data.shootTypes && data.shootTypes.length ? data.shootTypes : ["Product Photography"],
        availability: data.availability || "available",
        rentalCount: 0,
        featured: false,
        tags: [],
        quantity: Number(data.quantity) || 1,
      };
      return [prop, ...prev];
    });
  }, []);

  const updateProp = useCallback((id, patch) => {
    setProps((prev) => prev.map((p) => (p.id === id
      ? { ...p, ...patch, pricePerDay: patch.pricePerDay != null ? Number(patch.pricePerDay) : p.pricePerDay }
      : p)));
  }, []);

  const deleteProp = useCallback((id) => setProps((prev) => prev.filter((p) => p.id !== id)), []);

  const updateRequestStatus = useCallback((id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const addCategory = useCallback((data) => {
    setCategories((prev) => {
      const slug = (data.name || "new-category").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return [{
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        name: data.name || "Untitled Category",
        description: data.description || "",
        image: data.image || seedCategories[0].image,
        count: 0,
      }, ...prev];
    });
  }, []);

  const updateCategory = useCallback((slug, patch) => {
    setCategories((prev) => prev.map((c) => (c.slug === slug ? { ...c, ...patch } : c)));
  }, []);

  const deleteCategory = useCallback((slug) => {
    setCategories((prev) => prev.filter((c) => c.slug !== slug));
  }, []);

  const value = useMemo(() => ({
    props, requests, customers, categories,
    addProp, updateProp, deleteProp, updateRequestStatus,
    addCategory, updateCategory, deleteCategory,
  }), [props, requests, customers, categories, addProp, updateProp, deleteProp, updateRequestStatus, addCategory, updateCategory, deleteCategory]);

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
};
