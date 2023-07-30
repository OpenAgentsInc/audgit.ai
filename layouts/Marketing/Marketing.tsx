import clsx from "clsx"
import { ComponentProps } from "react"
import { MarketingFooter, MarketingHeader } from "../../components/Marketing"
import styles from "./Marketing.module.css"

export function MarketingLayout({
  children,
  className,
  hideFooter = false,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.layout)} {...props}>
      <MarketingHeader />
      <main>{children}</main>
      {!hideFooter && <MarketingFooter className={styles.footer} />}
    </div>
  );
}
