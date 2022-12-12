import AppLoader from './appLoader';

//https://www.typescriptlang.org/docs/handbook/2/generics.html, https://learn.microsoft.com/ru-ru/training/modules/typescript-generics/3-use-methods-properties-generic-type?ns-enrollment-type=learningpath&ns-enrollment-id=learn.build-javascript-applications-typescript
interface Node<T> {
  addEventListener(type: T, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  dispatchEvent(event: Event): boolean;
  removeEventListener(type: T, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  classList: DOMTokenList;
  getAttribute(attribute: T): T;
  setAttribute(attribute: T, id: T): T;
  parentNode: Node<string>;
}

/////////////////////////////////////////////

class AppController extends AppLoader {
  getSources(callback: (data?: { articles: []; sources: [] }) => void) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: (data?: { articles: []; sources: [] }) => void) {
    let target = e.target as Node<string>;
    const newsContainer = e.currentTarget as Node<string>;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item') as boolean) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode;
    }
  }
}

export default AppController;
