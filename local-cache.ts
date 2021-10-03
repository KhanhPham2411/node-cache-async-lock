
const NodeCache = require( "node-cache" );


export class LocalCache {
  private static _instance: LocalCache;
  private cache;

  private constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    })
  }
  
  public static getInstance(): LocalCache {
    if (!LocalCache._instance) {
      LocalCache._instance = new LocalCache(0);
    }
    return LocalCache._instance
  }

  public async readThrough(key, func, ttl=0) {
    let value = this.cache.get(key);
    if(value == null){
      value = await func();
      this.cache.set(key, value, ttl);
    }
    return value;
  }
}