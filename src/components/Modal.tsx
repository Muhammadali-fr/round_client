// lucide 
import { X } from "lucide-react"

// react 
import { useEffect } from "react";

export default function Modal({ show, onClose, children }: { show: any, onClose: any, children: any }) {

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (show) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, [show, onClose])

    if (!show) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/30">

            {/* inside box  */}
            <div onClick={(e) => e.stopPropagation()} className="bg-white max-w-[400px] w-[95%] rounded-lg flex item-center justify-between flex-col overflow-hidden p-2 relative pt-5">

                {/* box head  */}
                <div onClick={onClose} className="p-1 rounded-full bg-[#e5e5e5] border border-gray-300 hover:bg-gray-200 cursor-pointer absolute top-2 right-2">
                    <X size={15} color="black" />
                </div>

                {/* box body  */}
                {children}
            </div>

            <div onClick={onClose} className="fixed top-5 right-5 p-2 cursor-pointer ">
                <X color="white" />
            </div>

        </div>
    )

}