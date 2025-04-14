import { cn } from "@/lib/utils";

function ProductPrice({ value, className }: { value: number; className?: string }) {
    const stringValue: string = value.toFixed(2);
    const [intVaue, floatValue] = stringValue.split('.');

    return (
        <p className={cn('text-2xl', className)}>
            <span className="text-xs align-super">$</span>{intVaue}
            <span className="text-xs align-super">.{floatValue}</span>
        </p>
    );
}

export default ProductPrice;