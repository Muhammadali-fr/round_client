"use client";

// react or next
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// component
import { Input } from "@/components/ui/input";

// lucide react
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function ShopPageSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setvalue] = useState(searchParams.get('query') || "");

  const handleChange = useDebouncedCallback((term: string) => {
    const param = new URLSearchParams(searchParams);
    if (term) {
      param.set("query", term);
    } else {
      param.delete("query");
    }
    replace(`${pathname}?${param.toString()}`);
  }, 300);

  const clearQuery = () => {
    setvalue("");
    const param = new URLSearchParams(searchParams);
    param.delete("query");
    replace(`${pathname}?${param.toString()}`);
  };

  return (
    <div>
      <label className="relative">
        <Search className="absolute -top-[2px] left-3 text-gray-400" />
        <Input
          onChange={(e) => { handleChange(e.target.value); setvalue(e.target.value) }}
          value={value}
          type="text"
          autoFocus
          className="border border-violet-400 w-full p-2 pl-10 rounded-lg outline-none outline-violet-700"
          placeholder="Search for products..."
        />

        {
          value &&
          <div onClick={clearQuery} className="bg-gray-500 p-1 rounded-full absolute top-0 right-2 cursor-pointer hover:bg-gray-400">
            <X className="font-bold" size={12} color="#FFFFFF" />
          </div>
        }

      </label>
    </div>
  );
}
