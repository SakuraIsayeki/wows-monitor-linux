import * as Showdown from 'showdown';

const halfBold = () => {
  return {
    type: 'lang',
    regex: /(\|{2})(.+)(\|{2})/g,
    replace: '<span class="half-bold">$2</span>'
  }
}

export function getShowdownConverter(): Showdown.Converter{
  return new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    simpleLineBreaks: false,
    strikethrough: true,
    openLinksInNewWindow: true,
    tasklists: true,
    underline: true,
    extensions: [halfBold]
  });
}
