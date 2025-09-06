import Footer from "@/components/footer";
import TableBlock from "@/components/table";

export default function Table() {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar: Guidelines */}
        <div className="lg:w-1/3 p-6 bg-white rounded-lg lg:mr-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Book Your Tables</h1>
          <h2 className="mt-4 font-semibold mt-10">How to book? Here's a step-by-step guide.</h2>
          <ol className="list-decimal pl-6 mt-2">
            <li>Click on the floor drop-down menu and choose your desired floor.</li>
            <li>Choose your desired table and click on it.</li>
            <li>A <span className="font-extrabold">sidebar/form</span> should appear on the left side of your screen (in case it didn't, reload the page).</li>
            <li>Fill up the form, choose your time, and then click <span className="font-extrabold">Book</span>.</li>
            <li>Do not refresh the page now; it should automatically guide you to the payments page.</li>
            <li>After successful payments, you should receive a system-generated invoice. Show it to the staff or waiter.</li>
            <li><span className="font-extrabold">**IMPORTANT**</span> In case there is any problem in any of the steps, contact immediately.</li>
          </ol>
        </div>

        {/* Right Content: Table Selection */}
        <div className="lg:w-2/3 mt-8 lg:mt-20">
          <div className="bg-gray-400 rounded-4xl p-6 shadow-2xl">
            <div className="grid grid-cols-12 gap-6">
              {/* Table Blocks */}
              <div className="col-start-2 col-span-2 flex justify-center items-center">
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
          </div>
        </div>

      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
