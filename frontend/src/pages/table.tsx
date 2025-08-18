import TableBlock from "@/components/table";

export default function Table() {
  return (
    <div className="w-screen h-screen bg-gray-500 grid grid-cols-12 grid-rows-6 gap-6 p-6">
      <div className="col-start-2 col-span-2 row-start-1 flex justify-center items-center">
        <div className="transform -rotate-25">
          <TableBlock shape="rectangle" size="lg" label="T1" />
        </div>
      </div>

      <div className="col-start-1 row-start-2 row-span-4 flex flex-col justify-between items-center gap-4">
        <TableBlock size="lg" label="T2" />
        <TableBlock size="lg" label="T3" />
        <TableBlock size="lg" label="T4" />
        <TableBlock size="lg" label="T5" />
      </div>

      <div className="col-start-12 row-start-2 row-span-4 flex flex-col justify-between items-center gap-4">
        <TableBlock size="lg" label="T6" />
        <TableBlock size="lg" label="T7" />
        <TableBlock size="lg" label="T8" />
        <TableBlock size="lg" label="T9" />
      </div>

      <div className="col-start-4 col-span-6 row-start-2 row-span-4 relative flex justify-center items-center">
        <div className="absolute top-0 flex justify-center">
          <TableBlock shape="round" size="lg" label="T10" />
        </div>

        <div className="absolute left-0 flex items-center">
          <TableBlock shape="round" size="lg" label="T11" />
        </div>

        <div className="absolute right-0 flex items-center">
          <TableBlock shape="round" size="lg" label="T12" />
        </div>

        <div className="absolute bottom-0 flex justify-center">
          <TableBlock shape="round" size="lg" label="T13" />
        </div>

        <div className="flex justify-center items-center">
          <TableBlock shape="round" size="lg" label="T14" />
        </div>
      </div>
    </div>
  );
}
