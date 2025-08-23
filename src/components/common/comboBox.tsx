"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GetListOfSiteName } from "@/api/Bill"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SiteItem {
  label: string
  value: string
}

export interface ComboboxRef {
  reset: () => void
}

interface ComboboxProps {
  onSelect: (value: SiteItem) => void
}

export const ComboboxDemo = React.forwardRef<ComboboxRef, ComboboxProps>(
  ({ onSelect }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState("")
    const [items, setItems] = React.useState<SiteItem[]>([])
    const [selected, setSelected] = React.useState<SiteItem | null>(null)

    const fetchData = React.useCallback(async (query: string) => {
      try {
        const { options } = await GetListOfSiteName(query)
        const formatted: SiteItem[] = options.map((opt: string) => ({
          label: opt,
          value: opt
        }))
        setItems(formatted)
      } catch (error) {
        console.error("Error fetching site names:", error)
      }
    }, [])

    React.useEffect(() => {
      fetchData("")
    }, [fetchData])

    const handleInputChange = (value: string) => {
      setInput(value)
      fetchData(value)
    }

    const handleSelect = (item: SiteItem) => {
      setSelected(item)
      setOpen(false)
      onSelect(item)
    }

    // Expose reset function to parent
    React.useImperativeHandle(ref, () => ({
      reset: () => {
        setSelected(null)
        setInput("")
      }
    }))

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selected ? selected.label : "Select site..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search site..."
              value={input}
              onValueChange={handleInputChange}
            />
            <CommandList>
              <CommandEmpty>No site found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected?.value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

ComboboxDemo.displayName = "ComboboxDemo"
