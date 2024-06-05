"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import structuredFields from "../papers/structured_fields_uphill_small.json";
import otherFields from "../papers/other_fields_uphill_small.json";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const fieldAndCategory = structuredFields.reduce(
    (obj: Record<string, string>, field) => {
      obj[field.name] = field.category;
      return obj;
    },
    {}
  );

  otherFields.forEach(field => {
    fieldAndCategory[field.name] = field.category;
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Show/Hide Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[350px] h-64 overflow-auto">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column, index, arr) => {
            if (column.id === "ID") return null;
            return (
              <div key={column.id}>
                {fieldAndCategory[column.id] &&
                  fieldAndCategory[column.id] !==
                    fieldAndCategory[arr[index - 1]?.id] && (
                    <DropdownMenuLabel className="capitalize">{fieldAndCategory[column.id]} Columns</DropdownMenuLabel>
                  )}
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.replace(/_/g, " ")}
                </DropdownMenuCheckboxItem>
                {(!fieldAndCategory[column.id] ||
                  fieldAndCategory[column.id] !==
                    fieldAndCategory[arr[index + 1]?.id]) && (
                  <DropdownMenuSeparator />
                )}
              </div>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
