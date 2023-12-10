import { extractNodes } from "./extract";
import { resolveNodes } from "./resolve";
import { computeNodes } from "./compute";
import { SourceDocument } from "./source";
import { TangramNode } from "./model";
import { self, x1 } from "./selectors";

const layoutDocument = (
  document: SourceDocument
): Array<TangramNode<number>> => {
  const { extractedNodes, documentGraph } = extractNodes(document);
  const { resolvedNodes, compositionGraph } = resolveNodes(
    extractedNodes,
    documentGraph
  );
  return computeNodes(resolvedNodes, compositionGraph);
};

const nodes = layoutDocument({
  type: "SourceDocument",
  children: [
    {
      type: "SourceView",
      x1: {
        deps: () => [],
        resolve: (deps) => 50
      },
      x2: {
        deps: () => [x1(self())],
        resolve: ([a]) => a + 100
      },
      children: []
    }
  ]
});

console.log(nodes);
