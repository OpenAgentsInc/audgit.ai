// import styles from "./EventFeed.module.css"
import { Markdown } from "./Markdown"

export const EventFeed = ({ eventFeed }) => {
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

            <div style={{color: "white"}}>
            <Markdown markdown={event.content} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
