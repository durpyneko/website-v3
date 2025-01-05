import { useEffect, useState } from "react";

interface SpotifyActivity {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
}

interface DiscordUser {
  id: number;
  username: string;
  avatar: string;
  display_name: string;
}

interface DiscordActivity {
  type: number;
  name: string;
  details: string;
  state: string;
  application_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  assets: {
    large_image: string;
    large_text: string;
    small_image: string;
    small_text: string;
  };
}

export interface Presence {
  discord_user: DiscordUser;
  listening_to_spotify: boolean;
  discord_status: string;
  spotify?: SpotifyActivity;
  activities?: DiscordActivity[];
}

const userId = "763864687481323620";

export function useDiscordPresence() {
  const [presence, setPresence] = useState<Presence | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://api.lanyard.rest/socket");

    socket.onopen = () => {
      console.log("WebSocket connection opened");

      // Send Opcode 2: Initialize
      socket.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: userId,
          },
        })
      );
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.op === 1) {
        // Opcode 1: Hello
        const heartbeatInterval = message.d.heartbeat_interval;
        setInterval(() => {
          socket.send(JSON.stringify({ op: 3 }));
        }, heartbeatInterval);
      } else if (
        message.t === "INIT_STATE" ||
        message.t === "PRESENCE_UPDATE"
      ) {
        // Handle presence updates
        setPresence(message.d);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return presence;
}
