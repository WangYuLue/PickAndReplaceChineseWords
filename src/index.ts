import { unique, getFiles } from './utils';
import { getWordsFormFile } from './get';

// 需要抽取的目录列表
// const dirList: string[] = ['/Users/erwang/Desktop/studio/src/console/render/containers/visual/core']
const dirList: string[] = ['/Users/erwang/Desktop/getChinese/testDir']

/* ----------------------------------------------------------- */

// 中文正则
// const chineseReg = /[\u4e00-\u9faf]+/g;
const chineseReg = /([\u4e00-\u9faf]+[\w\s，、。？?!、“‘\,\:\"\'\.]*)+/g



// 初始化
function init() {
  // 抓取到的中文列表
  const chineseWords: string[] = [];
  dirList.forEach(dirName => {
    const files = getFiles(dirName, {
      extList: ['.ts', '.tsx']
    })
    files.forEach(fileName => {
      const list = getWordsFormFile(fileName, chineseReg, {
        commentPreFix: '//',
        commentRange: ['/*', '*/']
      });
      console.log(`文件名:${fileName}；其中的中文有:${list}`);
      chineseWords.push(...list);
    })
  });
  console.log(unique(chineseWords));
}

init();

