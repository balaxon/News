import './sources.css';

interface Data {
  name: string;
  id: string;
  author: string;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  source: { name: string };
  urlToImage: HTMLImageElement;
}

//////////////////////////////////////

class Sources {
  draw(data: Data[]) {
    const fragment = document.createDocumentFragment();
    //про HTMLTemplateElement https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      //про HTMLElement https://www.typescriptlang.org/docs/handbook/dom-manipulation.html;
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      sourceClone.querySelector('.source__item-name')!.textContent = item.name;
      sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')!.append(fragment); // ! позволяет обращаться к полю структуры, которое может быть null без проверки на null
  }
}

export default Sources;
