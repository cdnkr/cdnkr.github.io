import { cn } from "@/utils/cn";

export default function Button({ children, onClick, className, outerClassName }) {
    return (
        <button
            onClick={onClick}
            className={cn("w-full relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-primary block", outerClassName)}
        >
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-lg bg-black/20" />
            <span className={cn("max-h-[52px] flex translate-y-[-6px] transform items-center justify-center gap-1 rounded-lg px-10 py-3 font-semibold active:translate-y-[-2px] border-2 border-primary bg-primary text-white", className)}>
                {children}
            </span>
        </button>
    )
}
