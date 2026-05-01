"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CompareContextType {
  selectedIds: number[];
  toggle: (id: number) => void;
  clear: () => void;
  isSelected: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  selectedIds: [],
  toggle: () => {},
  clear: () => {},
  isSelected: () => false,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };

  const clear = () => setSelectedIds([]);
  const isSelected = (id: number) => selectedIds.includes(id);

  return (
    <CompareContext.Provider value={{ selectedIds, toggle, clear, isSelected }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);