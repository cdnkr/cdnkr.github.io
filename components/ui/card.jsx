import { cn } from "@/utils/cn"
import { ChevronLeft } from "./icons";

function Card__Pushable({ children, id, className }) {
    return (
        <div
            className={cn("w-full group relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-primary block mb-6", className)}
        >
            <ChevronLeft className="size-[35px] absolute top-0 -left-[21px] stroke-primary fill-[#fff] z-[1] group-active:translate-y-[2px]" />
            <div id={id} className="w-full p-4 bg-[#fff] rounded-lg border-2 border-primary translate-y-[-6px] transform active:translate-y-[-2px]">
                {children}
            </div>
        </div>
    )
}

function Card({ children, id, className }) {
    return (
        <div id={id} className={cn("w-full p-4 bg-card-background-secondary rounded-r-lg border-l-4 border-primary mb-6", className)}>
            {children}
        </div>
    )
}


export default Card;