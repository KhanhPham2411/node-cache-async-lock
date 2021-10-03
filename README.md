# node-cache-async-lock

# Install

```bash
	git submodule add -b master https://github.com/KhanhPham2411/node-cache-async-lock.git
```



## Examples:

```js
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
```

```js
import { SignalDatabase, SignalCache} from './signal-cache';
import { Util } from './util';
import { LocalCache } from '../local-cache';

describe ("SignalCache.get", () => {
  let signalJest = jest.spyOn(SignalDatabase, "get");

  beforeEach(() => {
    signalJest = jest.spyOn(SignalDatabase, "get");
  })
  afterEach( () => {
    LocalCache.getInstance().clear();
    signalJest.mockClear();
  });

  it("Signal.get should be called 1", async () => {
    await SignalCache.get();
    await SignalCache.get();
  
    expect(SignalDatabase.get).toBeCalledTimes(1);
  });
  
  it("Time to leave should expire the cache", async () => {
    await SignalCache.get();
    await Util.sleep(6); // > readThrough('SignalCache.get', async () => {}, 5)
    await SignalCache.get();
  
    expect(SignalDatabase.get).toBeCalledTimes(2);
  }, 30000);
  
  it("Should lock concurrent request", async () => {
    const task1 = SignalCache.get();
    const task2 = SignalCache.get();
    const task3 = SignalCache.get();
    const allTasks = await Promise.all([task1, task2, task3]);
  
    expect(SignalDatabase.get).toBeCalledTimes(1);
  }, 30000);
  
})

```
