export const helper = {
  /**
   * Get the last word in the string by passing the sentence to function.
   * @param {string} sentence
   */
  getLastWord: (sentence: string) => {
    // If sentence is not available or it's length is 0 return the emptry string.
    if (!sentence || !sentence.trim().length) {
      return '';
    }

    // Split the sentence separated by space.
    let words = sentence.split(' ');
    // If words array is not emptry return the last element of the array or empty string.
    if (!words.length || words.length - 2 < 0) {
      return '';
    } else {
      return words[words.length - 2];
    }
    // return words.length ? words[words.length - 1] : '';
  },

  /**
   * Debounce function for ignoring the continuous calls.
   *
   * @param {Function} func Function that needs to be executed.
   * @param {number} delay Delay between execution of the passed function.
   */
  debounce: (func: Function, delay: number) => {
    let debounceTimer: NodeJS.Timeout; // A variable for holding the setTimeout reference.
    return function () {
      const context = this;
      const args = arguments; // Get the parameters passed into the functions.
      clearTimeout(debounceTimer); // Clear the timeout for older setTimeout if presents.
      debounceTimer = setTimeout(() => func.apply(context, args), delay); // assign the setTimeout and run the passed function after 500 ms by applying the arguments.
    };
  },
};
