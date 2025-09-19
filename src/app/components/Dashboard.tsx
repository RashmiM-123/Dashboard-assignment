

"use client";

import { useState } from "react";
import { useDashboard } from "./context/DashboardContext";
import Widget from "./widget";
import { Search } from "lucide-react";

export default function Dashboard() {
  const { categories, hiddenCategories, toggleCategory } = useDashboard();
  const [query, setQuery] = useState("");

  return (
    <div className="p-7 h-screen bg-[#F0F5FB]">
      
      <h2 className="text-xl font-bold  text-indigo-950   rounded-2xl">CNAPP Dashboard</h2>


      <div className="flex gap-2 m-3 justify-between ">
       
        {categories.map((category) => (
          <label key={category.id} className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              checked={!hiddenCategories.includes(category.id)}
              onChange={() => toggleCategory(category.id)}

            />
            {category.name}
          </label>
          
        ))}
           <div className="border relative flex w-full max-w-sm p-1 items-center gap-2 rounded-md bg-[#F0F5FB] m-3">
        <Search className="text-gray-500 ml-2" size={18} />
        <input
          type="text"
          placeholder="Search anything"
          className="border-none outline-none flex-1 "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      </div>

 
      {categories
        .filter((cat) => !hiddenCategories.includes(cat.id)) // hide unchecked
        .map((category) => {
       
          const filteredWidgets = category.widgets.filter(
            (widget) =>
              widget.title?.toLowerCase().includes(query.toLowerCase()) ||
              widget.text?.toLowerCase().includes(query.toLowerCase())
          );

          return (
            <div key={category.id} className="mb-6 ">
              <h2 className="text-xl font-bold mb-4 text-black">
                {category.name}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {query
                  ? filteredWidgets.length > 0
                    ? filteredWidgets.map((widget) => (
                        <Widget
                          key={widget.id}
                          widget={widget}
                          categoryId={category.id}
                        />
                      ))
                    : (
                      <p className="text-gray-400 col-span-3 text-center">
                        No widgets found
                      </p>
                    )
                  : category.widgets.map((widget) => (
                      <Widget
                        key={widget.id}
                        widget={widget}
                        categoryId={category.id}
                      />
                    ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
