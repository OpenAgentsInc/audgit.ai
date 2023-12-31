// import styles from "./EventFeed.module.css"
import { Button } from "../primitives/Button"
import { Markdown } from "./Markdown"
import { useState } from 'react'
export const EventFeed = ({ eventFeed }) => {
  const [paid, setPaid] = useState("")
  
  return (
    <div
      style={{
        paddingLeft: "5%",
        paddingRight: "5%",
        marginTop: 30,
        width: "100%",
        // backgroundColor: "blue",
      }}
    >
      {eventFeed.map((event) => {
        let date = "unknown";
        console.log(event);

        const amountTag = event.tags.find((tag) => tag[0] === "amount");

        let invoice: string | null = null;
        let amount: number | null = null;

        if (amountTag) {
          amount = parseFloat(amountTag[1]) / 1000;
          invoice = amountTag[2];
        }

        if (event.created_at) {
          const timeOptions = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };

          date = new Date(event.created_at * 1000).toLocaleString(
            "en-US",
            // @ts-ignore
            timeOptions
          );
        }

        return (
          <div
            key={event.id}
            style={{
              backgroundColor: "#444",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            {amount && event.id != paid && (
              <Button
                style={{
                  padding: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 8,
                  position: "absolute",
                  textAlign: "left",
                  marginBottom: 2,
                  marginTop: 6,
                  color: "#999",
                  fontSize: 14,
                }}
                onClick={async () => {
                  if (!window.webln) {
                    alert("Please install a Lightning wallet like Alby");
                    return;
                  }
                  await window.webln.enable();
                  const {preimage} = await window.webln.sendPayment(invoice);
                  if (!!preimage) {
                    setPaid(event.id)
                  }
                }}
              >
                Pay {amount} {amount === 1 ? "sat" : "sats"}
              </Button>
            )}

            <p
              style={{
                textAlign: "right",
                marginBottom: 2,
                color: "#999",
                fontSize: 14,
              }}
            >
              {date}
            </p>

            <div style={{ marginTop: amount ? 28 : -14, color: "white" }}>
              <Markdown markdown={event.content} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
