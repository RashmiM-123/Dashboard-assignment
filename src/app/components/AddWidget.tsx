
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDashboard } from "./context/DashboardContext";

const AddWidget = ({ setAddWidget, categoryId, placeholderId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { updateWidget } = useDashboard();

  // tabs list
  const tabs = ["CSPM", "CWPP", "Image", "Ticket"];
  const [activeTab, setActiveTab] = useState(tabs[0]); // default active tab

  const onSubmit = (data) => {
    updateWidget(categoryId, placeholderId, data.title, data.text);
    reset();
    setAddWidget(false);
  };

  return (
    <div className="flex flex-col h-full">

      <div className="bg-indigo-950 text-white flex justify-between p-3">
        <h2 className="font-bold">Add Widget</h2>
        <button onClick={() => setAddWidget(false)}>☓</button>
      </div>


      <div className="flex-1 overflow-y-auto">
        <h2 className="p-2">
          Personalize your dashboard by adding the following widget
        </h2>

        <ul className="flex gap-4  p-2">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer pb-1 ${
                activeTab === tab
                  ? "border-b-2 border-indigo-950 font-bold text-indigo-950"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="p-3 text-sm text-indigo-900">
          Currently selected: <span className="font-bold">{activeTab}</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-3 space-y-3">
          <input
            {...register("title")}
            placeholder="Widget Title"
            className="border p-2 border-gray-300 text-indigo-900 w-full"
          />
          <input
            {...register("text")}
            placeholder="Widget Text"
            className="border p-2 border-gray-300 text-indigo-900 w-full"
          />
        </form>
      </div>


      <div className="flex gap-2 justify-end items-center p-4  bg-white">
        <button
          type="button"
          onClick={() => setAddWidget(false)}
          className="rounded-md text-indigo-900 font-bold px-4 py-2 border border-indigo-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="rounded-md px-4 py-2 bg-indigo-950 text-white border border-indigo-900"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddWidget;
