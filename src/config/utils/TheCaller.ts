import PeerConnection4Call from './PeerConnection4Call';

export default class TheCaller {
  private static _instance: TheCaller;
  private _current: PeerConnection4Call | null;

  private constructor() {
    this._current = null;
  }

  public static get instance() {
    return this._instance || (this._instance = new TheCaller());
  }

  public get current() {
    if (!this._current) {
      this._current = new PeerConnection4Call();
    }
    return this._current;
  }

  public new() {
    this._current = new PeerConnection4Call();
  }

  public delete() {
    this._current = null;
  }
}
