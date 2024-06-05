import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { paperSchema } from "./papers/schema";
import data from "./papers/uphill_small.json";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
function getPapers() {
  const papers = data;
  return z.array(paperSchema).parse(papers);
}

export default function TaskPage() {
  const papers = getPapers();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2"> 
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              UPHILL
            </h2>
            <p className="text-muted-foreground md:hidden">
              Best used with a larger screen.
            </p>
            
          </div>
        </div>
        <DataTable data={papers} columns={columns} />
      </div>
    </>
  );
}
