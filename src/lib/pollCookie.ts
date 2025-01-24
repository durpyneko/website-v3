class CookiePoller {
  private cookieName: string;
  private lastCookie: string;
  private intervalId: number | null;
  private listeners: ((value: string | undefined) => void)[];

  constructor(cookieName: string) {
    this.cookieName = cookieName;
    this.lastCookie = "";
    this.intervalId = null;
    this.listeners = [];
  }

  private checkCookie() {
    const currentCookie = document.cookie;

    if (currentCookie !== this.lastCookie) {
      this.lastCookie = currentCookie;

      const cookieValue = currentCookie
        .split(";")
        .find((cookie) => cookie.includes(this.cookieName))
        ?.split("=")[1];

      this.listeners.forEach((listener) => listener(cookieValue));
    }
  }

  public start(interval: number = 100) {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => this.checkCookie(), interval);
    }
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public subscribe(listener: (value: string | undefined) => void) {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: (value: string | undefined) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public getCurrentValue(): string | undefined {
    const currentCookie = document.cookie;
    const cookieValue = currentCookie
      .split(";")
      .find((cookie) => cookie.includes(this.cookieName))
      ?.split("=")[1];
    return cookieValue;
  }
}

const pollers: { [key: string]: CookiePoller } = {};

export function pollCookie(cookieName: string) {
  if (!pollers[cookieName]) {
    pollers[cookieName] = new CookiePoller(cookieName);
  }
  return pollers[cookieName];
}
