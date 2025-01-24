import { pollCookie } from "@/lib/pollCookie";
import { useEffect, useState } from "react";

export default function useCookiePoller(
  cookieName: string,
  interval: number = 1000 // default would be 100
) {
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const poller = pollCookie(cookieName);
    poller.subscribe(setCookieValue);
    poller.start(interval);

    setCookieValue(poller.getCurrentValue());

    return () => {
      poller.unsubscribe(setCookieValue);
      poller.stop();
    };
  }, [cookieName, interval]);

  return cookieValue;
}
