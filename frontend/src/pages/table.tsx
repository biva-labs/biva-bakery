import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import TableBlock from "@/components/table";
import SeatForm from "@/components/seat-form";
import PayButton from "@/components/pay-button";
import { useFoodCourtEventFormStore } from "@/store/seat-form-store";
import { Button } from "@radix-ui/themes";

export default function Table() {
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const  { setField } = useFoodCourtEventFormStore();
  const body = useFoodCourtEventFormStore();

  // Update the store whenever selected tables change
  useEffect(() => {
    setField("table_id", selectedTables);
  }, [selectedTables, setField]);

  const handleTableSelect = (label: string) => {
    setSelectedTables(prev => {
      if (prev.includes(label)) {
        // Remove if already selected
        return prev.filter(table => table !== label);
      } else {
        // Add if not selected
        return [...prev, label];
      }
    });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between w-full px-4 lg:px-8">
        {/* Left column (Form & Guide) */}
        <div className="lg:w-1/3 p-6 rounded-lg lg:mr-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
            Book Your Tables
          </h1>

          {selectedTables.length > 0 && (
            <div className="mb-8">
              <SeatForm />
              <div className="mt-4">
                {/* <PayButton amount={1000} /> */}
                <Button onClick={() => console.log(body)}>cl</Button>
              </div>
            </div>
          )}

          <div className="rounded-lg p-5 border border-gray-200 shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-3">
              How to book? Quick guide:
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-700 leading-relaxed">
              <li>Select a floor from the drop-down menu.</li>
              <li>Pick your desired table and click on it.</li>
              <li>
                Fill the form, choose time, then click{" "}
                <span className="font-extrabold">Book</span>.
              </li>
              <li>Do not refresh — you’ll be guided to the payments page.</li>
              <li>
                After payment, you’ll receive an invoice. Show it to staff.
              </li>
              <li>
                <span className="font-extrabold">**IMPORTANT:**</span> If you
                face issues, contact support immediately.
              </li>
            </ol>
          </div>
        </div>

        {/* Right column (Table Map) */}
        <div className="lg:w-2/3 mt-8 lg:mt-12">
          {/*
            KEY CHANGE:
            - Added `min-h-[500px]` (or your desired height) to give it more vertical space.
            - `flex items-center justify-center` will center the table grid vertically within this new height.
          */}
          <div className="bg-gray-200 rounded-3xl p-6 shadow-2xl min-h-[500px] flex items-center justify-center">
            <div className="grid grid-cols-12 gap-x-4 gap-y-8 w-full max-w-3xl mx-auto">
              <div className="col-start-2 col-span-2 flex justify-center items-center">
                <div className="transform -rotate-25">
                  {/* Stage - bigger and unselectable */}
                  <div className="w-20 h-10 bg-gradient-to-br from-red-500 to-red-700 text-white border-red-800 shadow-lg flex items-center justify-center font-bold text-lg rounded-md">
                    STAGE
                  </div>
                </div>
              </div>
              <div className="col-start-1 row-start-2 row-span-4 flex flex-col justify-between items-center gap-3">
                {["T2", "T3", "T4", "T5"].map((label) => (
                  <TableBlock
                    key={`${label}-${selectedTables.includes(label)}`}
                    size="lg"
                    label={label}
                    initialState={selectedTables.includes(label) ? "selected" : "available"}
                    onSelect={handleTableSelect}
                  />
                ))}
              </div>
              <div className="col-start-12 row-start-2 row-span-4 flex flex-col justify-between items-center gap-3">
                {["T6", "T7", "T8", "T9"].map((label) => (
                  <TableBlock
                    key={`${label}-${selectedTables.includes(label)}`}
                    size="lg"
                    label={label}
                    initialState={selectedTables.includes(label) ? "selected" : "available"}
                    onSelect={handleTableSelect}
                  />
                ))}
              </div>
              <div className="col-start-4 col-span-6 row-start-2 row-span-4 relative flex justify-center items-center">
                {["T10", "T11", "T12", "T13", "T14"].map((label, i) => (
                  <div
                    key={label}
                    className={`absolute ${
                      i === 0
                        ? "top-0"
                        : i === 1
                        ? "left-0"
                        : i === 2
                        ? "right-0"
                        : i === 3
                        ? "bottom-0"
                        : "flex justify-center items-center"
                    }`}
                  >
                    <TableBlock
                      key={`${label}-${selectedTables.includes(label)}`}
                      shape="round"
                      size="lg"
                      label={label}
                      initialState={selectedTables.includes(label) ? "selected" : "available"}
                      onSelect={handleTableSelect}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}