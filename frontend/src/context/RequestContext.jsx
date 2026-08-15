import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const RequestContext = createContext(null);
const STORAGE_KEY = "firangi_request_cart";

const readInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { items: parsed.items || [], range: parsed.range || { start: null, end: null } };
    }
  } catch (e) { /* ignore */ }
  return { items: [], range: { start: null, end: null } };
};

export const RequestProvider = ({ children }) => {
  const initial = readInitial();
  const [items, setItems] = useState(initial.items); // array of prop ids
  const [range, setRangeState] = useState(initial.range); // ISO strings

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, range }));
    } catch (e) { /* ignore */ }
  }, [items, range]);

  const add = useCallback((id, newRange) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
    if (newRange && (newRange.start || newRange.end)) {
      setRangeState((prev) => ({
        start: newRange.start || prev.start,
        end: newRange.end || prev.end,
      }));
    }
  }, []);

  const addMany = useCallback((ids) => {
    setItems((prev) => Array.from(new Set([...prev, ...ids])));
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => { setItems([]); setRangeState({ start: null, end: null }); }, []);
  const has = useCallback((id) => items.includes(id), [items]);

  const setRange = useCallback((start, end) => {
    setRangeState({
      start: start ? new Date(start).toISOString() : null,
      end: end ? new Date(end).toISOString() : null,
    });
  }, []);

  return (
    <RequestContext.Provider value={{ items, range, count: items.length, add, addMany, remove, clear, has, setRange }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest must be used within RequestProvider");
  return ctx;
};
