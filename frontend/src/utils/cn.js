import clsx from "clsx";
import * as tailwindMerge from 'tailwind-merge';

export function cn(...inputs) {
    return tailwindMerge.twMerge(clsx(...inputs));
}

