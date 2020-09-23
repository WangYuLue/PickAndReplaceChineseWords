import * as fs from 'fs';
import * as path from 'path';
import { unique, getFiles } from './utils';
import { getWordsFormFile } from './get';
import { replaceWordsFormFile } from './replace';

// 需要抽取的目录列表
// const dirList: string[] = ['/Users/erwang/Desktop/studio/src/console/render/containers/visual/core']
const dirList: string[] = ['/Users/erwang/Desktop/getChinese/testDir']

/* ----------------------------------------------------------- */

// 中文正则
// const chineseReg = /[\u4e00-\u9faf]+/g;
const chineseReg = /(([\s，、。？?!、“‘\"\']*[\u4e00-\u9faf]+[\s，、。？?!、“‘\"\']*)+)/g

const rePlaceStr = '__($1)';

const getWordsOutFilePath = path.resolve(__dirname, '../out', 'out.txt');

/**
 * 从文件中获取中文单词
 * 
 * @param dirList 要替换的目录
 */
function getWords(dirList: string[]) {
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
  fs.writeFileSync(getWordsOutFilePath, unique(chineseWords).join('\n'))
}

/**
 * 替换文件中的中文
 * 
 * @param dirList 要替换的目录
 */
function replaceWords(dirList: string[]) {
  dirList.forEach(dirName => {
    const files = getFiles(dirName, {
      extList: ['.ts', '.tsx']
    })
    files.forEach(fileName => {
      const fileStr = replaceWordsFormFile(fileName, chineseReg, rePlaceStr, {
        commentPreFix: '//',
        commentRange: ['/*', '*/'],
        replaceFn: (str: string, regexp: RegExp, replace: string): string => {
          if (str.includes('`')) {
            return str.replace(regexp, "${__('$1')}");
          }
          return str.replace(regexp, replace);
        }
      })
      fs.writeFileSync(fileName, fileStr)
      console.log(fileStr);
    })
  });
}

function init() {
  getWords(dirList);
  // replaceWords(dirList);
}

init();


