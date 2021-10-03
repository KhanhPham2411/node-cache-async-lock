export class Util {
  static async sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec*1000));
  }
}