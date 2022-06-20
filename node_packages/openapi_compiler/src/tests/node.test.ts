import { Node } from "../node";

describe("Given a tree node environment", () => {
  test("Given a simple tree", () => {
    const node = new Node("root");
    node.addChild(new Node("child"));
    expect(node.children.length).toBe(1);
    expect(node.children[0].name).toBe("child");
  });

  test("Given a tree with multiple children", () => {
    const node = new Node("root");
    node.addChild(new Node("child1"));
    node.addChild(new Node("child2"));
    node.addChild(new Node("child3"));
    expect(node.children.length).toBe(3);
    expect(node.children[0].name).toBe("child1");
    expect(node.children[1].name).toBe("child2");
    expect(node.children[2].name).toBe("child3");
    expect(node.children[0].head?.name).toBe(node.name);
  });

  test("Given a tree with multiple children and grandchildren", () => {
    const node = new Node("root");
    node.addChild(new Node("child1"));
    node.addChild(new Node("child2"));
    node.addChild(new Node("child3"));
    node.children[0].addChild(new Node("grandchild1"));
    node.children[1].addChild(new Node("grandchild2"));
    node.children[2].addChild(new Node("grandchild3"));
    expect(node.children.length).toBe(3);
    expect(node.children[0].children.length).toBe(1);
    expect(node.children[1].children.length).toBe(1);
    expect(node.children[2].children.length).toBe(1);
    expect(node.children[0].children[0].name).toBe("grandchild1");
    expect(node.children[1].children[0].name).toBe("grandchild2");
    expect(node.children[2].children[0].name).toBe("grandchild3");

    expect(node.children[0].children[0].getHeadOfTree().name).toBe(
      node.children[0].name
    );
  });
});
