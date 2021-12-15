/***
 * 生成指定长度随机uuid
 * @param n
 */
export const randomByLength = (n: number) => {
  let rnd = '';
  for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
  return rnd;
};

/***
 * 生成指定范围随机数
 * @param start
 * @param end
 */
export const randomByRange = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

/***
 * 初始化GameObject的时候使用
 */
export const getInitPosition = () => {
  return {
    position: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0,
      y: 0,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  };
};

/***
 * 防抖
 * @param fn
 * @param ctx
 * @param delay
 */
export const throttle = (fn: Function, ctx: any, delay = 100) => {
  let flag: boolean = false;
  return function () {
    let args = arguments;
    if (flag) {
      return;
    }
    flag = true;
    fn.apply(ctx, args);
    setTimeout(() => {
      flag = false;
    }, delay);
  };
};

/***
 * 节流
 * @param fn
 * @param ctx
 * @param delay
 */
export const debounce = (fn: Function, ctx: any, delay = 1000) => {
  let timer: any = null;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(ctx, args);
      timer = null;
    }, delay);
  };
};
