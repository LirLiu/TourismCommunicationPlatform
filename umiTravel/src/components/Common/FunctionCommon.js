import moment from 'moment'

const functionCommon = {
  delNbsp(testStr) {
    let resultStr = testStr.replace(/\ +/g, "").replace(/[ ]/g, "").replace(/[\r\n]/g, "");//去掉空格
    return resultStr
  },
  conversion(data) {
    let timestamp
    if (data) {
      timestamp = moment(Number(data)).format('YY-MM-DD HH:mm:ss')
    } else {
      timestamp = ''
    }
    return timestamp;
  },
  convers(data) {
    let timestamp
    if (data) {
      timestamp = moment(Number(data)).format('YY-MM-DD')
    } else {
      timestamp = ''
    }
    return timestamp;
  },
}
export default functionCommon;