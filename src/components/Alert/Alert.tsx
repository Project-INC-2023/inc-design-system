"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck, Info, XCircle, XIcon } from "lucide-react";

const alertVariants = cva("p-3 rounded-lg w-full flex items-center px-2 justify-between", {
    variants: {
        variant: {
            info: "bg-info-accent text-info",
            danger: "bg-danger-accent text-danger",
            warning: "bg-warning-accent text-warning",
            success: "bg-success-accent text-success",
        },
    },
    defaultVariants: {
        variant: "info",
    },
});

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    showIcon?: boolean;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant, children, dismissible = false, showIcon = true, onDismiss, ...props }, ref) => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    let icon: React.ReactElement<any, any> = <Info />;
    if (variant === "info") {
        icon = <Info size={24} className="fill-info stroke-info-accent" />;
    } else if (variant === "danger") {
        icon = <XCircle size={24} className="fill-danger stroke-danger-accent" />;
    } else if (variant === "warning") {
        icon = <CircleAlert size={24} className="fill-warning stroke-warning-accent" />;
    } else if (variant === "success") {
        icon = <CircleCheck size={24} className="fill-success stroke-success-accent" />;
    }

    const handleDismiss = () => {
        setDismissed(true);
        if (dismissible && onDismiss) onDismiss();
    };

    return (
        <>
            {!dismissed && (
                <div className={cn(alertVariants({ variant, className }))} ref={ref} {...props}>
                    <div className="flex">
                        {showIcon && <div className="mr-2">{icon}</div>}
                        <div className="flex flex-col space-y-2">{children}</div>
                    </div>
                    {dismissible && (
                        <button onClick={handleDismiss} className="">
                            <XIcon size={24} className="stroke-gray-400" />
                        </button>
                    )}
                </div>
            )}
        </>
    );
});

Alert.displayName = "Alert";

export { Alert, alertVariants };
