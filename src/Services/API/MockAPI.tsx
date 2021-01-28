const FAILURE_COEFF = 10;
const MAX_SERVER_LATENCY = 200;
const maxRandomCoeff = 1000;

const getRandomBool = (n: number) => {
  if (n > maxRandomCoeff) {
    n = maxRandomCoeff;
  }
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
};

const getSuggestions = (text: string) => {
  var pre = 'pre';
  var post = 'post';
  var results: Array<string> = [];

  if (getRandomBool(2)) {
    results.push(pre + text);
  }

  if (getRandomBool(2)) {
    results.push(text);
  }

  if (getRandomBool(2)) {
    results.push(text + post);
  }

  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }

  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
};

export {getRandomBool, getSuggestions};
