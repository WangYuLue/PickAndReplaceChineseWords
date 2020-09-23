import * as fs from 'fs';
import { unique } from './utils';

interface replaceWordsFormFileOptions {
  commentPreFix?: string; // 表示注释的前缀； 例如在 js 中，为 //，添加后会过滤注释中的匹配
  commentRange?: [string, string]; // 表示范围注释； 例如在 js 中，为 /* 和 */，添加后会过滤注释中的匹配
}

/**
 * 替换文中的关键字
 * 
 * @param fileName 文件名
 * @param regexp 正则表达式 （！！！注意，这里的正则表达式需要加 global 标志， 例如：/[\u4e00-\u9faf]+/g ）
 * @param replace 要替换的字符串
 * @param options 可选项
 */
export const replaceWordsFormFile = (fileName: string, regexp: RegExp, replace: string, options: replaceWordsFormFileOptions = {}): string => {
  const strList: string[] = [];
  const { commentPreFix, commentRange } = options;
  let isInComment = false;
  fs.readFileSync(fileName)
    .toString()
    .split('\n')
    .forEach(function (line) {
      let isRangeComment = false;
      let commentLine = '';
      if (commentRange) {
        let blockCommontStartIndex = line.indexOf(commentRange[0]);
        let blockCommontEndIndex = line.indexOf(commentRange[1]);
        // 这里做了简化处理
        // 如果当前行有 /* 或者 */，则认为这一行都是注释
        if (blockCommontStartIndex >= 0 || blockCommontEndIndex >= 0) {
          isRangeComment = true;
        }
        // 以JS为例，如果是注释开头，例如 /* ，走下面的逻辑
        if (blockCommontStartIndex >= 0) {
          isInComment = true;
        }
        // 以JS为例，如果是注释结尾，例如 */ ，走下面的逻辑
        else if (blockCommontEndIndex >= 0) {
          isInComment = false;
        }
      }
      if (isRangeComment || isInComment) {
        strList.push(line)
        return;
      };

      if (commentPreFix) {
        let commentIndex = line.indexOf(commentPreFix);
        if (commentIndex >= 0) {
          line = line.slice(0, commentIndex);
          commentLine = line.slice(commentIndex)
        }
      }
      strList.push(replaceWordsFormString(line, regexp, replace) + commentLine);
    });
  return strList.join('\n')
}

/**
 * 从字符串中 抽取正则匹配的单词
 * 
 * @param str 需要抽取的字符串
 * @param regexp 正则表达式 （！！！注意，这里的正则表达式需要加 global 标志， 例如：/[\u4e00-\u9faf]+/g ）
 */
export const replaceWordsFormString = (str: string, regexp: RegExp, replace: string): string => {
  // 基于特定业务的逻辑定制
  if (str.includes('`')) {
    return str.replace(regexp, "${__('$1')}");
  }
  return str.replace(regexp, replace);
}