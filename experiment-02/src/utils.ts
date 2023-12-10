import { Graph } from "graph-fns";

export type Hash<T> = { [uuid: string]: T };

export const mergeGraphs = (a: Graph, b: Graph) => {
  const result: Graph = {};
  for (let u in a) {
    result[u] = {};
    for (let v in a[u]) {
      result[u][v] = a[u][v];
    }
  }
  for (let u in b) {
    if (!result[u]) result[u] = {};
    for (let v in b[u]) {
      if (!result[u][v]) result[u][v] = b[u][v];
    }
  }
  return result;
};
