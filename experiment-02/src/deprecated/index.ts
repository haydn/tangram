// import { v4 as generateId } from "uuid";
// import { create, topologicalSort } from "graph-fns";
// import {
//   DeclaredField,
//   ResolvedField,
//   FieldSelector,
//   FieldIdentifier,
//   NodeSelector,
//   SourceDocument,
//   SourceView,
//   SourceImage,
//   SourceNode,
//   TangramDocument,
//   TangramView,
//   TangramImage,
//   TangramNode
// } from "./types";
// import { self, id, x1, y1, x2, y2, width, height } from "./selectors";

// const createNode = (source: SourceNode): TangramNode => {
//   switch (source.type) {
//     case "view": {
//       return {
//         source,
//         type: "view",
//         uuid: generateId(),
//         x1:
//           source.x1 || source.x2
//             ? {
//                 deps: () => [x2(self()), width(self())],
//                 resolve: ([x2, width]) => x2 - width
//               }
//             : {
//                 deps: () => [],
//                 resolve: () => 0
//               },
//         x2: source.x2 || {
//           deps: () => [x1(self()), width(self())],
//           resolve: ([x1, width]) => x1 + width
//         },
//         width:
//           source.width || (source.x1 && source.x2)
//             ? {
//                 deps: () => [x2(self()), x1(self())],
//                 resolve: ([x2, x1]) => x2 - x1
//               }
//             : {
//                 deps: () => [],
//                 resolve: () => 0
//               },
//         y1:
//           source.y1 || source.y2
//             ? {
//                 deps: () => [y2(self()), height(self())],
//                 resolve: ([y2, height]) => y2 - height
//               }
//             : {
//                 deps: () => [],
//                 resolve: () => 0
//               },
//         y2: source.y2 || {
//           deps: () => [y1(self()), height(self())],
//           resolve: ([y1, height]) => y1 + height
//         },
//         height:
//           source.height || (source.y1 && source.y2)
//             ? {
//                 deps: () => [y2(self()), y1(self())],
//                 resolve: ([y2, y1]) => y2 - y1
//               }
//             : {
//                 deps: () => [],
//                 resolve: () => 0
//               },
//         children: source.children
//           ? source.children.map((child) => createNode(child))
//           : []
//       };
//     }
//     case "image": {
//       return {
//         source,
//         type: "image",
//         uuid: generateId(),
//         src: source.src,
//         fill: source.fill ? source.fill : "fit"
//       };
//     }
//   }
// };

// const createDocument = (source: SourceDocument): TangramDocument => {
//   return {
//     source,
//     type: "document",
//     uuid: generateId(),
//     children: source.children
//       ? source.children.map((child) => createNode(child))
//       : []
//   };
// };

// //

// const resolveField = (
//   field: DeclaredField,
//   node: TangramNode<DeclaredField>,
//   document: TangramDocument<DeclaredField>
// ): ResolvedField => ({
//   ...field,
//   deps: field
//     .deps()
//     .reduce<Array<FieldIdentifier>>(
//       (result, fn) => [...result, ...fn(node, document)],
//       []
//     )
// });

// const resolveNodeDependencies = (
//   node: TangramNode<DeclaredField>,
//   document: TangramDocument<DeclaredField>
// ): TangramNode<ResolvedField> => {
//   switch (node.type) {
//     case "view": {
//       return {
//         ...node,
//         x1: resolveField(node.x1, node, document),
//         y1: resolveField(node.y1, node, document),
//         x2: resolveField(node.x2, node, document),
//         y2: resolveField(node.y2, node, document),
//         width: resolveField(node.width, node, document),
//         height: resolveField(node.height, node, document),
//         children: node.children.map((child) =>
//           resolveNodeDependencies(child, document)
//         )
//       };
//     }
//     case "image": {
//       return {
//         ...node
//         // TODO: x1, y1, etc…
//       };
//     }
//   }
// };

// const resolveDocumentDependencies = (
//   document: TangramDocument<DeclaredField>
// ): TangramDocument<ResolvedField> => {
//   return {
//     ...document,
//     // TODO: x1, y1, etc…
//     children: document.children.map((child) =>
//       resolveNodeDependencies(child, document)
//     )
//   };
// };

// //

// const resolveNodes = (
//   document: TangramDocument<ResolvedField>
// ): Array<TangramNode<ResolvedField>> => {
//   // let graph = create(
//   //   items.length * FIELDS.length,
//   //   (i) =>
//   //     `${items[Math.floor(i / FIELDS.length)].uuid}.${
//   //       FIELDS[i % FIELDS.length]
//   //     }`
//   // );
//   // return topologicalSort(graph).map((compositeId) => {
//   //   const [uuid, field] = compositeId.split(".");
//   //   //
//   // });
//   return [];
// };

// //

// const computeNodes = (
//   nodes: Array<TangramNode<ResolvedField>>
// ): Array<TangramNode<number>> => {
//   // switch (node.type) {
//   //   case "view": {
//   //     return {
//   //       ...node,
//   //       x1: 0,
//   //       y1: 0,
//   //       x2: 0,
//   //       y2: 0,
//   //       width: 0,
//   //       height: 0,
//   //       children: node.children.map((child) => computeNode(child, document))
//   //     };
//   //   }
//   //   case "image": {
//   //     return {
//   //       ...node
//   //       // TODO: x1, y1, etc…
//   //     };
//   //   }
//   // }
//   return [];
// };

// //

// const declaredDoc = createDocument({
//   type: "document",
//   children: [
//     {
//       type: "view",
//       id: "a",
//       x1: {
//         deps: () => [x2(id("A"))],
//         resolve: ([A]) => A
//       },
//       y1: {
//         deps: () => [y2(id("A"))],
//         resolve: ([A]) => A
//       },
//       x2: {
//         deps: () => [x1(self())],
//         resolve: ([a]) => a + 200
//       },
//       y2: {
//         deps: () => [y1(self())],
//         resolve: ([a]) => a + 100
//       }
//     },
//     {
//       type: "view",
//       id: "b",
//       x1: {
//         deps: () => [x1(id("a"))],
//         resolve: ([a]) => a + 10
//       },
//       y1: {
//         deps: () => [y2(id("a"))],
//         resolve: ([a]) => a + 10
//       },
//       x2: {
//         deps: () => [x2(id("a"))],
//         resolve: ([a]) => a - 10
//       },
//       height: {
//         deps: () => [],
//         resolve: () => 300
//       }
//     },
//     {
//       type: "view",
//       x1: {
//         deps: () => [x2(id("a")), x2(id("b"))],
//         resolve: ([a, b]) => Math.max(a, b) + 10
//       },
//       y1: {
//         deps: () => [y1(id("a")), y2(id("b")), height(self())],
//         resolve: ([a, b, h]) => a + (b - a) / 2 - h / 2
//       },
//       width: {
//         deps: () => [],
//         resolve: () => 80
//       },
//       height: {
//         deps: () => [],
//         resolve: () => 250
//       }
//     },
//     {
//       type: "view",
//       id: "A",
//       width: {
//         deps: () => [],
//         resolve: () => 200
//       },
//       height: {
//         deps: () => [],
//         resolve: () => 100
//       }
//     }
//   ]
// });

// const resolvedDoc = resolveDocumentDependencies(declaredDoc);

// const resolvedNodes = resolveNodes(resolvedDoc);

// const computedNodes = computeNodes(resolvedNodes);

// console.log(computedNodes);

// // document.getElementById("app").innerHTML = `
// // <h1>Hello Parcel!</h1>
// // <div>
// //   Look
// //   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
// //   for more info about Parcel.
// // </div>
// // `;
