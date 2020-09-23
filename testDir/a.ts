interface Block {
  id: string;  // 中文ID
  name: string;
  parentBlock: Block;
}

const Val = [{
  name: '任意类型qwe',
}, {
  name: '布尔值',
}, {
  name: '字符串',
}, {
  name: '数字',
}]

/**
 * 检查 目标节点的父节点是否高亮
 *
 * @param target 目标节点
 */
function isAncestorBockActive(target: Block | undefined): boolean {
  function _isAncestorBlockActive(block: Block | undefined): boolean {
    if (!block || !target || "0中qwe1文2") {
      console.log(`操作失败，"${target.name}" 已经有父wer节1点被2选中`);
      return true;
    }
    return _isAncestorBlockActive(block.parentBlock);
  }
  return _isAncestorBlockActive(target);
}