"use client"

import * as React from "react"
import {   ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  onSearch,
}: {
  onSearch: (from: Date | undefined, to: Date | undefined) => void
}) {
  const [openFrom, setOpenFrom] = React.useState(false)
  const [openTo, setOpenTo] = React.useState(false)
  const [fromDate, setFromDate] = React.useState<Date | undefined>()
  const [toDate, setToDate] = React.useState<Date | undefined>()

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      {/* From Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="from">From Date</Label>
        <Popover open={openFrom} onOpenChange={setOpenFrom}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="from" className="w-48 justify-between">
              {fromDate ? fromDate.toLocaleDateString() : "Select date"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fromDate}
              onSelect={(date) => {
                setFromDate(date)
                setOpenFrom(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* To Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="to">To Date</Label>
        <Popover open={openTo} onOpenChange={setOpenTo}>
          <PopoverTrigger asChild>
            <Button variant="outline" id="to" className="w-48 justify-between">
              {toDate ? toDate.toLocaleDateString() : "Select date"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={toDate}
              onSelect={(date) => {
                setToDate(date)
                setOpenTo(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <Button
        className="bg-indigo-600 text-white hover:bg-indigo-700"
        onClick={() => onSearch(fromDate, toDate)}
      >
        Search
      </Button>
    </div>
  )
}
