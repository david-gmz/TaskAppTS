import { ButtonProps } from "../models";

export default function Button({
    label,
    variant = "primary",
    ...props
}: ButtonProps) {
    const primary =
        "px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100";
    const secondary =
        "px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950";
    const text = "text-stone-600 hover:text-stone-950";
    const classes =
        variant === "primary"
            ? primary
            : variant === "secondary"
            ? secondary
            : text;

    return (
        <button {...props} className={classes}>
            {label}
        </button>
    );
}
