import { useEffect } from "react"
import { NDKPrivateKeySigner } from "@nostr-dev-kit/ndk"
import { LinkButton } from "../primitives/Button"

export default function Audit() {
  useEffect(() => {
    const key = NDKPrivateKeySigner.generate();
    console.log(key);
  }, []);
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
      <input
        placeholder="Enter a GitHub issue URL"
        defaultValue={"https://github.com/ArcadeLabsInc/arcade/issues/447"}
        style={{ width: 500, padding: 10, borderRadius: 8, marginTop: 10 }}
      />
      <button
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
    </div>
  );
}
