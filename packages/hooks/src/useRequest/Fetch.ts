import { Ref, reactive, isReactive } from "vue";
import type {
  FetchState,
  Options,
  PluginReturn,
  Service,
  Subscribe,
} from "./types";

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] | undefined;

  count: number = 0;

  state:  FetchState<TData, TParams> = ({
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  });

  constructor(
    public serviceRef: Ref<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    // public subscribe: Subscribe,
    public setUpdataData:(s: any) => void,
    public initState: Partial<FetchState<TData, TParams>> = {}
  ) {
   
    this.state = ({
      ...this.state,
      loading: !options.manual,
      ...initState,
    });
    
  }

  // 设置state
  setState(s: Partial<FetchState<TData, TParams>> = {}) { 
    this.state = {
      ...this.state,
      ...s,
    };
    console.log("this.state",this.state);
    
    this.setUpdataData(this.state)
    // this.subscribe();
  }

  // 遍历需要运行的插件，是一个回调函数，供插件获取fetch实例和在对应节点执行插件逻辑
  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  // 异步请求
  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    const currentCount = this.count;
    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler("onBefore", params);
   
    // 是否停止请求
    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    // 是否立刻返回
    if (returnNow) {
      return Promise.resolve(state.data);
    }

    // 请求前返回
    this.options.onBefore?.(params);

    try {
      // replace service 开始请求，如果含有onRequest事件名
      let { servicePromise } = this.runPluginHandler(
        "onRequest",
        this.serviceRef.value,
        params
      );

      if (!servicePromise) {
        servicePromise = this.serviceRef.value(...params);
      }

      const res = await servicePromise;
      
      // 取消了请求，count将与currentCount不一致，将发送空请求
      if (currentCount !== this.count) {
        return new Promise(() => {});
      }

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      });
      // 请求成功
      this.options.onSuccess?.(res, params);

      this.runPluginHandler("onSuccess", res, params);

      // 无论请求成功还是失败都执行
      this.options.onFinally?.(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandler("onFinally", params, res, undefined);
      }

      return res;
    } catch (error: any) {
      if (currentCount !== this.count) {
        return new Promise(() => {});
      }

      this.setState({
        error,
        loading: false,
      });

      this.options.onError?.(error, params);
      this.runPluginHandler("onError", error, params);

      // 无论请求成功还是失败都执行
      this.options.onFinally?.(params, undefined, error);

      if (currentCount === this.count) {
        this.runPluginHandler("onFinally", params, undefined, error);
      }

      throw error;
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }

  cancel() {
    this.count += 1;
    this.setState({
      loading: false,
    });

    this.runPluginHandler("onCancel");
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    // @ts-ignore
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    let targetData: TData | undefined;
    if (typeof data === "function") {
      // @ts-ignore
      targetData = data(this.state.data);
    } else {
      targetData = data;
    }

    this.runPluginHandler("onMutate", targetData);

    this.setState({
      data: targetData,
    });
  }
}
