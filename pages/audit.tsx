import { useEffect, useState } from "react"
import NDK, {
    NDKEvent, NDKPrivateKeySigner, NDKSubscription
} from "@nostr-dev-kit/ndk"
import { DocumentRowSkeleton } from "../components/Documents"
import { EventFeed } from "../components/EventFeed"
import { MarketingLayout } from "../layouts/Marketing"
import { RELAYS, useNDK } from "../lib/client/hooks/state"
import { Button } from "../primitives/Button"
import { Input } from "../primitives/Input"

import type { NostrEvent } from "@nostr-dev-kit/ndk";

export default function Audit() {
  const { ndk, setNDK } = useNDK();
  const [userInput, setUserInput] = useState<string>(
    "https://github.com/jeffthibault/python-nostr/issues/87"
  );
  const [eventFeed, setEventFeed] = useState<NDKEvent[]>([]);
  const [sub, setSub] = useState<NDKSubscription | null>(null);
  const [eventId, setEventId] = useState<string>("");

  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    console.log("hi");
    const storedEventId = localStorage.getItem("eventId");
    if (storedEventId) {
      setEventId(storedEventId);
    }
    const storedUserInput = localStorage.getItem("userInput");

    if (storedUserInput) {
      setUserInput(storedUserInput);
    }
  }, []);

  useEffect(() => {
    console.log("eventFeed", eventFeed);
  }, [eventFeed]);

  useEffect(() => {
    try {
      const signer = NDKPrivateKeySigner.generate();
      const ndk = new NDK({
        explicitRelayUrls: RELAYS,
        signer,
      });

      ndk.pool.on("relay:connect", async (r: any) => {
        console.log(`Connected to a relay ${r}`);
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
    console.log("submitting");
    setSubmitted(true);

    const event = new NDKEvent(ndk, {
      kind: 65123,
      // kind: 65005, // ??
      // kind: 65006,
      tags: [
        ["j", "code-review"], // This is what the existing code review bot is looking for
        // ["j", "issue-review"], // This is what we can do to avoid collision
        ["bid", "10000"],
      ],
      content: userInput,
    } as NostrEvent);

    await event.sign();

    setEventFeed([])
    setEventId(event.id);

    localStorage.setItem("userInput", userInput);
    localStorage.setItem("eventId", event.id);

    // await event.publish();
    // console.log("published");
    const publishedRelays = await event.publish();
    console.log("published to", publishedRelays);
  };

  useEffect(() => {
    // check if there is a subscription running here
    if (eventId) {
      if (sub !== null) {
        console.log("already subscribed");
        sub.stop();
      }

      // create a subscription
      const newSub = ndk?.subscribe(
        {
          "#e": [eventId],
        },
        { closeOnEose: false, groupable: false }
      );

      console.log("newSub", newSub);
      newSub!.on("event", (event: NDKEvent) => {
        // add event to event feed
        console.log("event", event);
        setEventFeed((prevEventFeed) => [event, ...prevEventFeed]);
      });
      setSub(newSub!);
    }
  }, [eventId]);

  const loading = eventFeed.length === 0 && submitted;

  return (
    <MarketingLayout hideFooter={true}>
      <div
        style={{
          backgroundColor: "#121215",
          minHeight: "100vh",
          height: "100%",
          width: "100vw",
          padding: 40,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "row",
            placeItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            placeholder="Enter a GitHub issue URL"
            style={{
              minWidth: 500,
              padding: 24,
              borderRadius: 8,
              marginRight: 12,
            }}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            type="submit"
            // icon={}
            style={{ padding: 24, borderRadius: 8 }}
            disabled={loading}
          >
            Submit
          </Button>
        </form>

        <EventFeed eventFeed={eventFeed} />

        {loading && (
          <div style={{ marginLeft: "35%", marginTop: 20 }}>
            <DocumentRowSkeleton />
            <DocumentRowSkeleton />
            <DocumentRowSkeleton />
          </div>
        )}
      </div>
    </MarketingLayout>
  );
}
