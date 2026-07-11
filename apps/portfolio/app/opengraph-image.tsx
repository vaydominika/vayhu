import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFCF6",
          color: "#3A3A3A",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "2px solid #DED8CA",
            background: "white",
            boxShadow: "14px 14px 0 #DDBCC7",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 104,
            top: 84,
            width: 170,
            height: 54,
            background: "#DDBCC7",
            transform: "rotate(-5deg)",
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 112,
            bottom: 82,
            width: 150,
            height: 48,
            background: "#B8C8B0",
            transform: "rotate(6deg)",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 164,
              lineHeight: 0.9,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            Vay Dominika
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.25,
              maxWidth: 720,
              color: "rgba(58,58,58,0.72)",
              fontFamily: "sans-serif",
            }}
          >
            A cozy scrapbook portfolio by Vay Dominika, frontend developer and UI/UX enthusiast.
          </div>
        </div>
      </div>
    ),
    size
  );
}
