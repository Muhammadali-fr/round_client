
// icons 
import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <div>
            <label className="relative">
                <Search className="absolute -top-[2px] left-3 text-gray-400"/>
                <input type="text" autoFocus className="border border-violet-400 w-full p-2 pl-10 rounded-lg" placeholder="Search for products..." />
            </label>
        </div>
    )
}