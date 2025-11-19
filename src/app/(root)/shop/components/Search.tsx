
'use client'

// react or next 
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'

// component 
import { Input } from "@/components/ui/input";

// lucide react 
import { Search } from "lucide-react";

export default function ShopPageSearch() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((term: string) => {
        const param = new URLSearchParams(searchParams);
        if (term) {
            param.set('query', term);
        } else {
            param.delete('query');
        };
        replace(`${pathname}?${param.toString()}`);
    }, 300);

    return (
        <div>
            <label className="relative">
                <Search className="absolute -top-[2px] left-3 text-gray-400" />
                <Input onChange={e => handleChange(e.target.value)} defaultValue={searchParams.get('query')?.toString()} type="text" autoFocus className="border border-violet-400 w-full p-2 pl-10 rounded-lg outline-none outline-violet-700" placeholder="Search for products..." />
            </label>
        </div>
    )
};