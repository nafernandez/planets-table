import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-[8px] py-[2px] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 leading-[16px] whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-[#D0D8E9] bg-[#F8F9FB] text-[#22283A]",
        destructive:
          "border-[#FFFFFF00] bg-[#E65959] text-[#ECEFF6]",
        terrain:
          "border-[#FFFFFF00] bg-[#F3EBFF] text-[#873AFF]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }

