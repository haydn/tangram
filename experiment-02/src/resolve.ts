import { Graph } from "graph-fns";

import { TangramNode, ResolvedField } from "./model";
import { SourceField } from "./source";
import { Hash } from "./utils";

export const resolveNodes = (
  extractedNodes: Hash<TangramNode<SourceField>>,
  documentGraph: Graph
): {
  resolvedNodes: Hash<TangramNode<ResolvedField>>;
  compositionGraph: Graph;
} => {
  return { resolvedNodes: {}, compositionGraph: {} };
};
