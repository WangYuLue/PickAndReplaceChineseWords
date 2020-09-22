import * as fs from 'fs';
import * as path from 'path';

interface getFilesOptions {
  extList?: string[]; // 表示需要抽取文件的后缀；如果不填，则抽取所有文件
}

/**
 * 数组去重
 * 
 * @param list 字符串列表
 */
export const unique = (list: string[]): string[] => {
  return Array.from(new Set(list));
}

/**
 * 递归获取要抽取的文列表
 * 
 * @param fileDir 需要抽取的项目目录
 * @param options 可选项
 * 
 * @return 文件列表
 */
export const getFiles = (fileDir: string, options: getFilesOptions = {}): string[] => {
  const fileList: string[] = [];
  const files = fs.readdirSync(fileDir);
  files.forEach(fileName => {
    //获取当前文件的绝对路径
    const filePath = path.join(fileDir, fileName);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filePath);
    const isFile = stats.isFile();
    const isDir = stats.isDirectory();
    if (isFile) {
      if (!options.extList || options.extList?.includes(path.extname(filePath))) {
        fileList.push(filePath);
      }
    }
    if (isDir) {
      //递归，如果是文件夹，就继续遍历该文件夹下面的文件
      fileList.push(...getFiles(filePath, options));
    }
  });
  return fileList;
};
