/***
 * 泛型单例模式接口
 */
export default abstract class Singleton {
  private static _instance: any = null;

  public static GetInstance<T>(type: new () => T) {
    if (this._instance === null) {
      this._instance = new type();
    }
    return this._instance;
  }
}
