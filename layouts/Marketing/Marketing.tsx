import clsx from "clsx"
import { MarketingFooter, MarketingHeader } from "../../components/Marketing"
import styles from "./Marketing.module.css"

export function MarketingLayout({
  children,
  className,
  hideFooter = false,
  ...props
}: any) {
  return (
    <div className={clsx(className, styles.layout)} {...props}>
      <MarketingHeader />
      <main>{children}</main>
      {!hideFooter && <MarketingFooter className={styles.footer} />}
    </div>
  );
}
