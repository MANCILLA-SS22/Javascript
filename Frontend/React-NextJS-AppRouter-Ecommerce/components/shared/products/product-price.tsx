import { cn } from "@/lib/utils";

function ProductPrice({ value, className }: { value: number; className?: string }) {
    const stringValue: string = value.toFixed();
    const [intVaue, floatValue] = stringValue.split('.');

    return (
        <p className={cn('text-2xl', className)}>
            <span className="text-xs align-super">$</span>
            <span className="text-xs align-super">.{floatValue}</span>
        </p>
    );
}

export default ProductPrice;