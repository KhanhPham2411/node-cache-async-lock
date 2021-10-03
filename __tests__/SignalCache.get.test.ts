import { Signal, SignalCache} from './signal-cache';
import { Util } from './util';

jest.spyOn(Signal, "get");

describe("SignalCache.get", () =>  {
  it("Signal.get should be called 1", async () => {

    await SignalCache.get();
    await SignalCache.get();

    expect(Signal.get).toBeCalledTimes(1);
  });

  it("Time to leave should expire the cache", async () => {
    await SignalCache.get();
    await Util.sleep(6); // > readThrough('SignalCache.get', async () => {}, 5)
    await SignalCache.get();

    expect(Signal.get).toBeCalledTimes(2);
  }, 30000);

  it("Should lock concurrent request", async () => {
    const task1 = SignalCache.get();
    const task2 = SignalCache.get();
    const task3 = SignalCache.get();
    const allTasks = await Promise.all([task1, task2, task3]);

    expect(Signal.get).toBeCalledTimes(1);
  }, 30000);
})

