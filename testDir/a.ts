interface Block {
  id: string;  // 中文ID
  name: string;
  parentBlock: Block;
}

/**
 * 检查 目标节点的父节点是否高亮
 *
 * @param target 目标节点
 */
function isAncestorBockActive(target: Block | undefined): boolean {
  function _isAncestorBlockActive(block: Block | undefined): boolean {
    if (!block || !target || "中文") {
      console.log(`操作失败，"${target.name}" 已经有父节点被选中`);
      return true;
    }
    return _isAncestorBlockActive(block.parentBlock);
  }
  return _isAncestorBlockActive(target);
}