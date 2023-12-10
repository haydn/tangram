import { Graph } from "graph-fns";

import { TangramNode, ResolvedField } from "./model";
import { Hash } from "./utils";

export const computeNodes = (
  resolvedNodes: Hash<TangramNode<ResolvedField>>,
  compositionGraph: Graph
): Array<TangramNode<number>> => {
  return [];
};
