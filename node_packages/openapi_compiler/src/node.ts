export class Node {
  head?: Node;
  children: Node[];
  name: string;

  constructor(name: string) {
    this.head = this;
    this.children = [];
    this.name = name;
  }

  addChild(node: Node) {
    // find duplicate
    const duplicate = this.children.find((child) => child.name === node.name);
    if (duplicate) {
      throw new Error(`Duplicate node name: ${node.name}`);
    }
    this.children.push(node);
    node.head = this;
  }

  getDepth(): number {
    let depth = 0;
    let current: Node | undefined = this;
    while (current?.head !== current) {
      current = current?.head;
      depth++;
    }
    return depth;
  }

  getChildren(): Node[] {
    return this.children;
  }

  /**
   * Get the head node of the tree
   */
  getHeadOfTree(): Node {
    let current: Node | undefined = this;
    while (current.head?.hasParent()) {
      current = current.head;
    }
    return current;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  hasParent(): boolean {
    return this.head !== this;
  }

  addChildren(nodes: Node[]) {
    // check for duplicate
    nodes.forEach((node) => {
      const duplicate = this.children.find((child) => child.name === node.name);
      if (!duplicate) {
        this.addChild(node);
      }
    });
  }
}
