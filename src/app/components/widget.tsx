

"use client";
import { useDashboard } from "./context/DashboardContext";
import AddWidget from "./AddWidget";
import { useState } from "react";

export default function Widget({
  widget,
  categoryId,
}: {
  widget: { id: string; title?: string; text?: string };
  categoryId: string;
}) {
  const { removeWidget } = useDashboard();
  const [addWidget, setAddWidget] = useState(false);
  const hasContent = widget.title && widget.text;

  return (
    <>
      <div className=" p-4 rounded-xl shadow-md relative bg-white flex flex-col items-center justify-center min-h-[150px]">
        {hasContent ? (
          <>
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => removeWidget(categoryId, widget.id)}
            >
              ✖
            </button>

            <h3 className="text-sm font-semibold text-black">{widget.title}</h3>
            <p className="text-gray-600 text-center">{widget.text}</p>
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 text-black"
            onClick={() => setAddWidget(true)}
          >
            + Add Widget
          </button>
        )}
      </div>

      {/* ✅ Sidebar Drawer */}
      {addWidget && (
        <div className="fixed top-0 right-0 w-[700px] h-full bg-white shadow-xl border-l border-gray-300 z-50 flex flex-col">
            <AddWidget setAddWidget={setAddWidget}  categoryId={categoryId}
      placeholderId={widget.id}/>
         
        </div>
      )}
    </>
  );
}

