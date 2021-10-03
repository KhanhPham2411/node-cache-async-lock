import { LocalCache } from '../local-cache';

export class SignalCache {
  static async get() {
    return LocalCache.getInstance().readThrough('SignalCache.get', async () => {
      return await SignalDatabase.get();
    }, 5)
  }
}
export class SignalDatabase {
  static get() {
    return 1;
  }
}
