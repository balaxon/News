import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(/*'https://newsapi.org/v2/'*/ 'https://newsapi-redirect-production.up.railway.app/', {
      apiKey: 'ccca80d1846a4f7da7519f79d6c4c99b', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
