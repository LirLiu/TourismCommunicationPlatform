const helper = {
  /**
   * get random int
   * @param min
   * @param max
   * @returns {number}
   */
  getRandomInteger(min = 1, max = 99999) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  },
  /**
    * 将{ a: 1, b: 2 } => a=1&b=2
    * @param {object} query
    */
  queryToString(query = {}) {
    const encode = encodeURIComponent;
    return Object.keys(query).map(
      key => (`${encode(key)}=${encode(query[key])}`),
    ).join('&');
  },
}

export default helper;
