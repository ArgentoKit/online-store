interface FlatCategory {
  id: string
  name: string
  slug: string
  parentId: string | null
}

export interface CategoryTreeNode extends FlatCategory {
  children: CategoryTreeNode[]
}

export function buildCategoryTree(categories: FlatCategory[]): CategoryTreeNode[] {
  const map = new Map<string, CategoryTreeNode>()
  const roots: CategoryTreeNode[] = []

  for (const cat of categories) {
    map.set(cat.id, { ...cat, children: [] })
  }

  for (const cat of categories) {
    const node = map.get(cat.id)!
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}
