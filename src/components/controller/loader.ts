enum HttpStatusCode {
  CONTINUE = 100,
  OK = 200,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

class Loader {
  baseLink: string;

  options: object;

  constructor(baseLink: string, options: object) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: object },
    callback = () => {
      console.error('No callback for GET response');
    },
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(endpoint: string, options?: object) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    //keyof typeof Ответ, где 600+ лайков https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
    (Object.keys(urlOptions) as (keyof typeof urlOptions)[]).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: (data: object) => void, options = {}) {
    fetch(this.makeUrl(endpoint, options), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
