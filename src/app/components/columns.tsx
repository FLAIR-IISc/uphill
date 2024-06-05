"use client";

import { ColumnDef } from "@tanstack/react-table";

import structuredFields from "../papers/structured_fields_uphill_small.json";
import otherFields from "../papers/other_fields_uphill_small.json";
import { Paper } from "../papers/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"
import Link from 'next/link'

import React, { useState } from 'react';

interface ModelResponseCellProps {
  value: string;
  width: string;
  expandText: string;
}

const ModelResponseCell: React.FC<ModelResponseCellProps> = ({ value, width, expandText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={width}>
      <div
        className={isExpanded ? "" : "truncate-text"}
        onClick={toggleExpand}
      >
        {value}
      </div>
      {!isExpanded && (
        <div className="expandable" onClick={toggleExpand}>
          {expandText}
        </div>
      )}
      {isExpanded && (
        <div className="expandable" onClick={toggleExpand}>
          Show less
        </div>
      )}
    </div>
  );
};

function capitalizeWords(input: string): string {
  return input.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const allDimensionColumns: ColumnDef<Paper>[] = structuredFields.map(
  (field) => {
    return {
      accessorKey: field.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={capitalizeWords(field.name.replace(/_/g, " "))} />
      ),
      cell: ({ row }) => {
        const writingStages = row.getValue(field.name) as string[];
        return (
          <div className="text-xs">
            {writingStages}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        const currentRow = row.getValue(id) as string[];
        return value.some((filterValue: string) =>
          currentRow.includes(filterValue)
        );
      },
    };
  }
);

const otherFieldsColumns: ColumnDef<Paper>[] = otherFields.map(
  (field) => {
    return {
      accessorKey: field.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={capitalizeWords(field.name.replace(/_/g, " "))} />
      ),
      cell: ({ row }) => {
        if (field.name === "prediction_reasoning") {
          return <ModelResponseCell value={row.getValue(field.name)} width="w-[400px]" expandText="⇩"/>;
        }
        else 
        return <div className="w-[200px]">
          {row.getValue(field.name)}
          </div>;
      },
      enableHiding: true,
    };
  }
);

const paperDataColumns: ColumnDef<Paper>[] = [
  // query_with_presupposition, claim_veracity, conversational_model, entailment_prediction
  {
    accessorKey: "query_with_presupposition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Query with Presupposition" />
    ),
    cell: ({ row }) => {
      return <div className="w-[400px]">
        {row.getValue("query_with_presupposition")}
        </div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "model_response",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model Response" />
    ),
    cell: ({ row }) => {
      return <ModelResponseCell value={row.getValue("model_response")} width="w-[600px]" expandText="Read More"/>;
    },
    enableHiding: false,
  },
  // {
  //   id: "Paper",
  //   accessorFn: (originalRow): Paper => originalRow,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Title" />
  //   ),
  //   cell: ({ row, cell }) => {
  //     return (
  //       <div className="flex space-x-2 justify-start">
  //         <div className="max-w-[640px] min-w-[480px]">
  //           <Accordion type="single" collapsible>
  //           <AccordionItem value={`${row.getValue("Paper")}`}>
  //             <AccordionTrigger>
  //               <span className="max-w-[640px] min-w-[480px] truncate font-medium">
  //               {(row.getValue("Paper") as any)?.Paper.replace(/\{([^}]+)\}/g, '$1')}
  //               </span>
  //             </AccordionTrigger>
  //             <AccordionContent>
  //                 {/* {
  //                   (row.getValue("Paper") as any)?.Authors && (
  //                     <div className="text-wrap pb-1">
  //                       <span className="pr-4 font-medium">  
  //                           Authors
  //                       </span>
  //                       <span className="text-stone-700">{(row.getValue("Paper") as any)?.Authors}</span>
  //                     </div>
  //                   )
  //                 }
  //                 {
  //                   (row.getValue("Paper") as any)?.Abstract && (
  //                     <div className="text-wrap pb-1">
  //                       <span className="pr-3 font-medium">  
  //                           Abstract
  //                       </span>
  //                       <span className="text-stone-700">{(row.getValue("Paper") as any)?.Abstract}</span>
  //                     </div>
  //                   )
  //                 }
  //                 <div className="pt-1">
  //                   <div className="text-wrap pb-1">
  //                       <span className="pr-3 font-medium">  
  //                           PDF
  //                       </span>
  //                       <span>
  //                         <Badge variant="outline">
  //                           <Link href={(row.getValue("Paper") as any).URL}>Link</Link>
  //                         </Badge>
  //                       </span>
  //                     </div>
  //                 </div> */}
  //                 <div className="pt-1 read-paper-icon">
  //                   <div className="text-wrap pb-4">
  //                       <span>
  //                         <Badge variant="outline">
  //                           <Link href={(row.getValue("Paper") as any).URL} target="_blank">Read paper</Link>
  //                         </Badge>
  //                       </span>
  //                     </div>
  //                 </div>
  //                 {
  //                   Object.keys(structuredFieldsGrouped).map((category) => {
  //                     const fields = structuredFieldsGrouped[category];
  //                     return (
  //                       <div key={category} className="py-1">
  //                         <div className="flex flex-row">
  //                           <div className="basis-2/12">
  //                             <Badge variant="secondary" className="capitalize">
  //                               {category}
  //                             </Badge>
  //                           </div>
  //                           <div className="basis-10/12">
  //                             <div className="flex flex-row flex-wrap gap-x-3 gap-y-1">
  //                             {fields
  //                               .filter((field) => row.getValue(field.name) && (row.getValue(field.name) as string).length > 0)
  //                               .map((field) => {
  //                                 const values: string[] = row.getValue(field.name);
  //                                 return values ? (
  //                                   <div className="flex-initial">
  //                                     <HoverCard key={field.name}>
  //                                     <HoverCardTrigger className="transition duration-[5ms] delay-[0ms]">
  //                                       <span className="hover:underline">
  //                                       {Array.isArray(values) ? values.join(", ") : values}
  //                                       </span>
  //                                     </HoverCardTrigger>
  //                                     <HoverCardContent className="transition duration-[5ms] delay-[0ms]">
  //                                       <span>
  //                                       {field.name}
  //                                       </span>
  //                                     </HoverCardContent>
  //                                   </HoverCard>
  //                                   </div>
  //                                 ) : null;
  //                               })
  //                             }
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     );
  //                   })
  //                 }
  //             </AccordionContent>
  //           </AccordionItem>
  //         </Accordion>
  //         </div>
  //       </div>
  //     );
  //   },
  //   enableHiding: false,
  // },
];

export const columns: ColumnDef<Paper>[] = [
  ...paperDataColumns,
  ...allDimensionColumns,
  ...otherFieldsColumns
];
