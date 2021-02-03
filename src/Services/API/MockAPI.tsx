const FAILURE_COEFF = 10;
const MAX_SERVER_LATENCY = 200;
const maxRandomCoeff = 1000;

const getRandomBool = (n: number) => {
  if (n > maxRandomCoeff) {
    n = maxRandomCoeff;
  }
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
};

async function getSuggestions(text: string) {
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

  // try {
  //   const response = await fetch(`https://jsfiddle.net/jasmeetjaggi/zk1mf9ga/`);
  //   console.log(response);
  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
}

const MockAPI = {
  getRandomBool,
  getSuggestions,
};

export {MockAPI};
