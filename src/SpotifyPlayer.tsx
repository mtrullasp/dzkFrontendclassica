import React, { useEffect } from "react";

const token =
  "BQBaoQJWqDDURtFzkgpR3auFw0x80bBwRRWg-FPeCiUKmifHx2iYHwaJ8hSMPDeTn-vaLwDFfF9EmwUXKLL5v4SP5NWPhevP46TBsUC-00fGL2SCyDKV6e-ATICRixCOckPfZZVs7Va4U1LBTc8ZuMmpHm3IWwAbK_oJHqk3G4gL1x6nKh94dE1SAsuLqe-5m_Yqq0BoSuYZZvMmqpYxOXriczc";

function SpotifyPlayer() {
  var Spotify: any;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  (window as any).onSpotifyWebPlaybackSDKReady = () => {
    const token = "[token]";
    const player = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb: any) => {
        cb(token);
      },
    });

    // Error handling
    player.addListener("initialization_error", ({ message }: any) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }: any) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }: any) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }: any) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener("player_state_changed", (state: any) => {
      console.log(state);
    });

    // Ready
    player.addListener("ready", ({ device_id }: any) => {
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }: any) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };

  return <h1>Spotify Player</h1>;
}

export default SpotifyPlayer;
