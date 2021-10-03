import { LocalCache } from '../local-cache';

export class SignalCache {
  static async get() {
    return LocalCache.getInstance().readThrough('SignalCache.get', async () => {
      return await Signal.get();
    }, 5)
  }
}
export class Signal {
  static get() {
    return 1;
  }
}
