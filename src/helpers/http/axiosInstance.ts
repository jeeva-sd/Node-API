import axios, { AxiosInstance, CancelTokenSource } from 'axios';

class Http {
    private instance: AxiosInstance;
    private pendingRequests: Map<string, CancelTokenSource>;

    constructor({ baseURL, timeOut }: any) {
        this.instance = axios.create({
            baseURL,
            timeout: timeOut ?? 20000,
        });
        this.pendingRequests = new Map<string, CancelTokenSource>();
        this.setupInterceptors();
    }

    protected setAuthToken(token: string) {
        this.instance.defaults.headers.common['x-key'] = token;
    }

    private addPendingRequest(config: any): void {
        const url = `${config.url}&${config.method}`;
        const source = axios.CancelToken.source();

        if (!this.pendingRequests.has(url)) {
            this.pendingRequests.set(url, source);
        }
    }

    private removePendingRequest(config: any): void {
        const url = `${config.url}&${config.method}`;

        if (this.pendingRequests.has(url)) {
            const source = this.pendingRequests.get(url);
            source?.cancel();
            this.pendingRequests.delete(url);
        }
    }

    private setupInterceptors(): void {
        this.instance.interceptors.request.use(
            (config: any) => {
                this.removePendingRequest(config);
                this.addPendingRequest(config);
                return config;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response: any) => {
                this.removePendingRequest(response.config);
                return response.data;
            },
            (error: any) => {
                this.removePendingRequest(error.config);
                return Promise.reject(error);
            }
        );
    }

    get(url: string, config?: any) {
        return this.instance({ ...config, method: 'get', url });
    }

    post(url: string, data?: any, config?: any) {
        return this.instance({ ...config, method: 'post', url, data });
    }

    put(url: string, data?: any, config?: any) {
        return this.instance({ ...config, method: 'put', url, data });
    }

    patch(url: string, data?: any, config?: any) {

        return this.instance({ ...config, method: 'put', url, data });
    }

    delete(url: string, data?: any, config?: any) {
        return this.instance({ ...config, method: 'delete', url, data });
    }

    public getInstance(): AxiosInstance {
        return this.instance;
    }
}

export default Http;