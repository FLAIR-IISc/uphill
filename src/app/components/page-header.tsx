import Balance from "react-wrap-balancer"

import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex flex-col items-start gap-3 px-4 pt-4 md:pt-4",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] text-center",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        "text-3xl leading-tight tracking-tighter md:text-xl lg:leading-[1.1] text-muted-foreground text-center",
        className
      )}
      {...props}
    />
  )
}

function PageSubHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Balance
      className={cn(
        "text-xl font-bold leading-tight tracking-tight md:text-2xl lg:leading-[1.1] text-center",
        className
      )}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, PageSubHeading}