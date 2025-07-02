"use client"
import React, { useRef, useEffect, useState } from 'react';

// Instala el SDK con: npm install @heygen/streaming-avatar
// Importa el SDK
// @ts-ignore
import StreamingAvatar, { AvatarQuality, StreamingEvents } from '@heygen/streaming-avatar';

const DEFAULT_TOKEN = "ZjIwYTExMDU4ZDIwNDQ4MWI1MDIxMmE3YzQ2YmE1Y2YtMTc1MTM5MzgwNg==";
const DEFAULT_AVATAR_ID = "Alessandra_Chair_Sitting_public";

interface HeygenAvatarProps {
  token?: string; // Ahora es opcional
  avatarId?: string; // Ahora es opcional
  voiceId?: string;
  quality?: 'Low' | 'Medium' | 'High';
  language?: string;
}

const HeygenAvatar: React.FC<HeygenAvatarProps> = ({
  token = DEFAULT_TOKEN,
  avatarId = DEFAULT_AVATAR_ID,
  voiceId,
  quality = 'Low',
  language = 'es',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<string>('idle');
  const streamingAvatarRef = useRef<any>(null);

  useEffect(() => {
    let streamingAvatar: any;
    if (token && avatarId && videoRef.current) {
      streamingAvatar = new StreamingAvatar({ token });
      streamingAvatarRef.current = streamingAvatar;

      streamingAvatar.on(StreamingEvents.STREAM_READY, (event: any) => {
        setStatus('ready');
        if (videoRef.current) {
          videoRef.current.srcObject = event.stream;
        }
      });
      streamingAvatar.on(StreamingEvents.AVATAR_START_TALKING, () => setStatus('talking'));
      streamingAvatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => setStatus('ready'));
      streamingAvatar.on(StreamingEvents.STREAM_DISCONNECTED, () => setStatus('disconnected'));

      streamingAvatar.createStartAvatar({
        quality: AvatarQuality[quality],
        avatarName: avatarId,
        voice: { voiceId },
        language,
      });
    }
    return () => {
      if (streamingAvatarRef.current) {
        streamingAvatarRef.current.stopAvatar();
      }
    };
  }, [token, avatarId, voiceId, quality, language]);

  // Ejemplo de función para hablar (puedes exponerla vía ref o botón)
  const speak = (text: string) => {
    if (streamingAvatarRef.current) {
      streamingAvatarRef.current.speak({ text });
    }
  };

  return (
    <div>
      {/* Video del avatar */}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: 12 }} />
      <div>Status: {status}</div>
      {/* Ejemplo de input para enviar texto al avatar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          const text = (e.target as any).elements.text.value;
          speak(text);
        }}
      >
        <input name="text" type="text" placeholder="Habla con el avatar..." />
        <button type="submit">Enviar</button>
      </form>
      {/*
        Instrucciones:
        - Debes pasar el token de acceso (ver README del repo HeyGen Interactive Avatar NextJS Demo).
        - El avatarId y voiceId se obtienen desde labs.heygen.com/interactive-avatar y docs.heygen.com.
        - Puedes personalizar la calidad y el idioma.
        - El SDK requiere conexión a internet y permisos de reproducción de video.
      */}
    </div>
  );
};

export default HeygenAvatar; 