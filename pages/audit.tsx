import { useEffect, useState } from "react"
// import { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk"
import NDK, {
    NDKEvent, NDKPrivateKeySigner, NDKSubscription
} from "@nostr-dev-kit/ndk"
import { RELAYS, useNDK } from "../lib/client/hooks/state"
import { LinkButton } from "../primitives/Button"

export default function Audit() {
  const { ndk, setNDK } = useNDK();
  const [userInput, setUserInput] = useState<string>(
    "https://github.com/ArcadeLabsInc/arcade/issues/447"
  );
  useEffect(() => {
    try {
      const signer = NDKPrivateKeySigner.generate();
      const ndk = new NDK({
        explicitRelayUrls: RELAYS,
        signer,
      });

      ndk.pool.on("relay:connect", async (r: any) => {
        // setStatus("Connected");
        console.log(`Connected to a relay ${r.url}`);
      });

      ndk.pool.on("connect", async () => {
        console.log("connected to something", ndk.pool.stats());
      });

      ndk.connect(2500);

      setNDK(ndk);
    } catch (e) {
      console.log("error", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userInput || !ndk) return;
    e.preventDefault();
    console.log("userInput", userInput);
  };

  return (
    <div
      style={{
        backgroundColor: "#121215",
        height: "100vh",
        width: "100vw",
        padding: 40,
      }}
    >
      <div style={{ maxWidth: 70 }}>
        <LinkButton href="/" variant="secondary">
          Home
        </LinkButton>
      </div>
      <h1 style={{ marginTop: 30 }}>AUDIT A GITHUB ISSUE</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a GitHub issue URL"
          style={{ width: 500, padding: 10, borderRadius: 8, marginTop: 10 }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "turquoise",
            color: "black",
            padding: 10,
            borderRadius: 12,
            marginLeft: 14,
          }}
        >
          START BASIC AUDIT
        </button>
      </form>
    </div>
  );
}
