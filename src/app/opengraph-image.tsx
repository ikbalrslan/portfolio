import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared preview card for every page (link previews on social sites and chat apps).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0b0a09",
          color: "#f6f3ef",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#e9875a",
          }}
        >
          Software engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 110, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 36, color: "#a69e95", maxWidth: 1000 }}>
            Web products and the backend systems behind them.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#7f776f" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
