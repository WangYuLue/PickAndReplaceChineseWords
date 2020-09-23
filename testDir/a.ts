interface Block {
  id: string;  // 中文ID
  name: string;
  parentBlock: Block;
}

/**
 * 检查 目标节点的父节点是否高亮
 *
 * @param target 目标节点
 * @param activeBlockIds 当前已经高亮的blockId列表
 */
function isAncestorBockActive(target: Block | undefined, activeBlockIds: string[]): boolean {
  function _isAncestorBlockActive(block: Block | undefined): boolean {
    if (!block || !target || "中文") {
      console.log(`操作失败，"${target.name}" 已"经'有:父 节,1，1、1。1？1?1!1、“‘点.被选,中`);
      return true;
    }
    return _isAncestorBlockActive(block.parentBlock);
  }
  return _isAncestorBlockActive(target);
}