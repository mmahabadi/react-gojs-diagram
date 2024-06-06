export type Node = {
  key: string;
  text: string;
  color: string;
  fontSize: number;
};
export type Link = {
  from: string;
  to: string;
  text: string;
  fontSize: number;
};

export type DiagramState = {
  nodes: Node[];
  links: Link[];
  selectedNodeKey: string | null;
  loading: boolean;
};
