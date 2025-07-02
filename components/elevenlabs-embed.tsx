"use client"
import { useEffect } from "react";

const ElevenLabsEmbed = () => {
  useEffect(() => {
    // Verifica si el script ya está agregado
    if (!document.getElementById("elevenlabs-convai-script")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      script.id = "elevenlabs-convai-script";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <elevenlabs-convai agent-id="agent_01jz675khgfjavc5st8gdybmwc"></elevenlabs-convai>
  );
};

export default ElevenLabsEmbed; 