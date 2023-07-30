export const EventFeed = ({ eventFeed }) => {
  return (
    <div style={{ marginTop: 30, maxWidth: 660 }}>
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
            <p
              style={{
                color: "#fff"
              }}            
            >{event.content}</p>
          </div>
        );
      })}
    </div>
  );
};
