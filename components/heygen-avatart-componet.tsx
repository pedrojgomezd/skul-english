'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface HeyGenAvatarProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function HeyGenAvatar({ 
  className = '', 
  width = '100%', 
  height = 'auto' 
}: HeyGenAvatarProps) {
  useEffect(() => {
    // Clean up function to remove the embed when component unmounts
    return () => {
      const existingEmbed = document.getElementById('heygen-streaming-embed');
      if (existingEmbed) {
        existingEmbed.remove();
      }
    };
  }, []);

  return (
    <div className={`heygen-avatar-container ${className}`}>
      <Script id="heygen-embed" strategy="afterInteractive">
        {`
          (function(window){
            const host="https://labs.heygen.com",
            url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJQZWRyb19DaGFpcl9TaXR0aW5nX3B1YmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzkyZGU3OWU1MzNhODQyMWJiODZkYTYzYTBlNWViMTJmXzU3MDEwL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImE4NGU0ZGE0NzZmYzRiYzc4ZGY1ZDM5MWI2YjQzZDVjIiwidXNlcm5hbWUiOiJmMjBhMTEwNThkMjA0NDgxYjUwMjEyYTdjNDZiYTVjZiJ9&inIFrame=1",
            wrapDiv=document.createElement("div");

            wrapDiv.id="heygen-streaming-embed";
            const container=document.createElement("div");
            container.id="heygen-streaming-container";
            const stylesheet=document.createElement("style");

            stylesheet.innerHTML=\`
              .heygen-avatar-container {
                position: relative;
                width: ${width};
                height: ${height};
                aspect-ratio: 16/9;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
                border: 2px solid #fff;
                transition: all 0.3s ease-in-out;
              }

              #heygen-streaming-embed {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
              }

              #heygen-streaming-container {
                width: 100%;
                height: 100%;
              }

              #heygen-streaming-container iframe {
                width: 100%;
                height: 100%;
                border: 0;
                border-radius: 6px;
              }

              /* Responsive design */
              @media (max-width: 768px) {
                .heygen-avatar-container {
                  width: 280px;
                  height: 157.5px;
                }
              }

              @media (max-width: 480px) {
                .heygen-avatar-container {
                  width: 240px;
                  height: 135px;
                }
              }
            \`;

            const iframe=document.createElement("iframe");
            iframe.allowFullscreen=false;
            iframe.title="Streaming Embed";
            iframe.role="dialog";
            iframe.allow="microphone";
            iframe.src=url;

            container.appendChild(iframe);
            wrapDiv.appendChild(stylesheet);
            wrapDiv.appendChild(container);
            
            // Find the container and append to it instead of body
            const avatarContainer = document.querySelector('.heygen-avatar-container');
            if (avatarContainer) {
              avatarContainer.appendChild(wrapDiv);
            } else {
              document.body.appendChild(wrapDiv);
            }
          })(window);
        `}
      </Script>
    </div>
  );
}
