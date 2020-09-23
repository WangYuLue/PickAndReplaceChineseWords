import * as fs from 'fs';
import { unique } from './utils';


interface getWordsFormFileOptions {
  commentPreFix?: string; // 表示注释的前缀； 例如在 js 中，为 //，添加后会过滤注释中的匹配
  commentRange?: [string, string]; // 表示范围注释； 例如在 js 中，为 /* 和 */，添加后会过滤注释中的匹配
}

/**
 * 从文件中抽取正则匹配的单词
 * 
 * @param fileName 文件名
 * @param regexp 正则表达式 （！！！注意，这里的正则表达式需要加 global 标志， 例如：/[\u4e00-\u9faf]+/g ）
 * @param options 可选项
 */
export const getWordsFormFile = (fileName: string, regexp: RegExp, options: getWordsFormFileOptions = {}): string[] => {
  const strList: string[] = [];
  const { commentPreFix, commentRange } = options;
  let isInComment = false;
  fs.readFileSync(fileName)
    .toString()
    .split('\n')
    .forEach(function (line) {
      let commentStatus = false;
      if (commentRange) {
        let blockCommontStartIndex = line.indexOf(commentRange[0]);
        let blockCommontEndIndex = line.indexOf(commentRange[1]);
        // 以JS为例，如果是行内注释，例如： /* 这是注释 */ ，走下面的逻辑
        if (blockCommontStartIndex >= 0 && blockCommontEndIndex >= 0) {
          line = line.slice(0, blockCommontStartIndex) + line.slice(blockCommontEndIndex);
        }
        // 以JS为例，如果是注释开头，例如 /* ，走下面的逻辑
        else if (blockCommontStartIndex >= 0) {
          line = line.slice(0, blockCommontStartIndex);
          commentStatus = true;
        }
        // 以JS为例，如果是注释结尾，例如 */ ，走下面的逻辑
        else if (blockCommontEndIndex >= 0) {
          line = line.slice(blockCommontEndIndex);
          isInComment = false;
        }
        // 另外有些极端情况处理起来比较麻烦，所以没有处理，
        // 例如：
        // （1）、const a = '/*中文*/'
        // （2）、const a = '中文' /**
        //       */ const b = '中文' /* 中文 */
        //
      }
      if (commentPreFix) {
        let commentIndex = line.indexOf(commentPreFix);
        if (commentIndex >= 0) {
          line = line.slice(0, commentIndex);
        }
      }
      if (isInComment) return;
      if (commentStatus) {
        isInComment = true;
      }
      strList.push(...getWordsFormString(line, regexp));
    });
  return unique(strList);
}

/**
 * 从字符串中 抽取正则匹配的单词
 * 
 * @param str 需要抽取的字符串
 * @param regexp 正则表达式 （！！！注意，这里的正则表达式需要加 global 标志， 例如：/[\u4e00-\u9faf]+/g ）
 */
export const getWordsFormString = (str: string, regexp: RegExp): string[] => {
  const list = str.match(regexp);
  if (list) {
    return list;
  }
  return [];
}