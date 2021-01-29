export const helper = {
  getLastWord: (sentence: string) => {
    if (!sentence || !sentence.trim().length) {
      return '';
    }
    let words = sentence.split(' ');
    return words.length ? words[words.length - 1] : '';
  },
  debounce: (func: Function) => {
    let debounceTimer: NodeJS.Timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), 1000);
    };
  },
};
