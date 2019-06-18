declare const window: { [key: string]: any };

export namespace GlobalUtil {
  const rootWindowKey = '@xmess/binder';
  window[rootWindowKey] = {};

  export function set (key: string, value: any) {
    window[rootWindowKey][key] = value;
  }

  export function get (key: any) {
    return window[rootWindowKey][key];
  }
}
