# 用 node 脚本抽取项目中的中文字符串

## 安装依赖

安装依赖：

```bash
yarn
```

安装 `ts-node` 来执行 `.ts` 文件

```bash
yarn global add ts-node
```

## 启动脚本

```bash
ts-node src/index.ts
```

注意：谨慎运行 `index.ts` 中的 `replaceWords` 方法， 他会改动你的目标文件。
