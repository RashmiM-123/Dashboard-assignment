
"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import dashboard from "@/data/dashboard.json";
import { v4 as uuidv4 } from "uuid";

type Widget = {
  id: string;
  title?: string;
  text?: string;
};

type Category = {
  id: string;
  name: string;
  widgets: Widget[];
};

type DashboardContextType = {
  categories: Category[];
  hiddenCategories: string[]; 
  addWidget: (categoryId: string, widget: Widget) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  updateWidget: (
    categoryId: string,
    placeholderId: string,
    title: string,
    text: string
  ) => void;
  toggleCategory: (categoryId: string) => void; // ✅ show/hide categories
};

// 1. Create context
const DashBoardContext = createContext<DashboardContextType>({
  categories: [],
  hiddenCategories: [],
  addWidget: () => {},
  removeWidget: () => {},
  updateWidget: () => {},
  toggleCategory: () => {},
});

// 2. Create Provider component
export const DashBoardContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>(
    dashboard.categories
  );
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);

  const addWidget = (categoryId: string, widget: Widget) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      )
    );
  };

  const removeWidget = (categoryId: string, widgetId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              widgets: cat.widgets.filter((w) => w.id !== widgetId),
            }
          : cat
      )
    );
  };

  const updateWidget = (
    categoryId: string,
    placeholderId: string,
    title: string,
    text: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              widgets: cat.widgets.map((w) =>
                w.id === placeholderId ? { id: uuidv4(), title, text } : w
              ),
            }
          : cat
      )
    );
  };

  const toggleCategory = (categoryId: string) => {
    setHiddenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) 
        : [...prev, categoryId] 
    );
  };

  return (
    <DashBoardContext.Provider
      value={{
        categories,
        hiddenCategories,
        addWidget,
        removeWidget,
        updateWidget,
        toggleCategory,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};

// 3. Custom hook
export const useDashboard = () => useContext(DashBoardContext);
