

export function wrapConsole(method: keyof Console, hook: ((methodName: string, args: any[]) => void)) {
    const oldMethod = console[method];
    console[method] = (...args: any[]) => {
      hook(method, args);
      oldMethod.apply(console, args);
    }
  }