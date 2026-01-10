import { cn } from "@/lib/utils";
import type { BaseProps } from "@/types";



//sirka obrazovky + phone padding
interface ContainerProps extends BaseProps {
  noPaddingMobile?: boolean
  fluid?: boolean
}

export function Container({ 
  children, 
  className,
  noPaddingMobile = false,
  fluid = false 
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        noPaddingMobile ? 'px-0 md:px-6 lg:px-8' : 'px-4 md:px-6 lg:px-8',
        !fluid && 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  )
}