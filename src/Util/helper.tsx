export const helper = {
  getLastWord: (sentence: string) => {
    if (!sentence || !sentence.trim().length) {
      return '';
    }
    let words = sentence.split(' ');
    return words.length ? words[words.length - 1] : '';
  },
};
