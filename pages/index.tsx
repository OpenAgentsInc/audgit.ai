import clsx from "clsx"
import { GetServerSideProps } from "next"
import { signIn } from "next-auth/react"
import { ComponentProps, ReactNode } from "react"
import { DASHBOARD_URL } from "../constants"
import { SignInIcon } from "../icons"
import { MarketingLayout } from "../layouts/Marketing"
import * as Server from "../lib/server"
import { Button, LinkButton } from "../primitives/Button"
import { Container } from "../primitives/Container"
import styles from "./index.module.css"

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </div>
  );
}

export default function Index() {
  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>Audit any GitHub repo.</h1>
          <p className={styles.heroLead}>Code auditing done right</p>
        </div>
        <div className={styles.heroActions}>
          <Button icon={<SignInIcon />} onClick={() => signIn()}>
            Sign in
          </Button>
          <LinkButton
            href="https://liveblocks.io/docs/guides/nextjs-starter-kit"
            target="_blank"
            variant="secondary"
          >
            Learn more
          </LinkButton>
        </div>
      </Container>
      <Container className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <Feature
            description={
              <>
                AudGit integrates directly with GitHub to access repos for
                auditing. No need to copy/paste code.
              </>
            }
            title="GitHub Integration"
          />
          <Feature
            description={
              <>
                Connect your Replit projects for deeper analysis by granting
                code and runtime access to AudGit.
              </>
            }
            title="Replit Integration"
          />
          <Feature
            description={
              <>
                Leverages NIP-90 Data Vending Machines for an open audit
                marketplace. Customers request audits, providers fulfill.
              </>
            }
            title="Nostr Integration"
          />
          <Feature
            description={
              <>
                Auditors can specialize and innovate with niche audits like
                security, performance, best practices etc.
              </>
            }
            title="Specialization"
          />
          <Feature
            description={
              <>
                Monetization through nostr incentivizes high quality audits
                through competition and reputation building.
              </>
            }
            title="Incentives"
          />
          <Feature
            description={
              <>
                Easy to build new audits using Replit templates. Publish them to
                AudGit's marketplace.
              </>
            }
            title="Developer Platform"
          />
        </div>
      </Container>
    </MarketingLayout>
  );
}

// If logged in, redirect to dashboard
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await Server.getServerSession(req, res);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: DASHBOARD_URL,
      },
    };
  }

  return {
    props: {},
  };
};
