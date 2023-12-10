// import {
//   TangramDocument,
//   TangramNode,
//   NodeSelector,
//   FieldSelector,
//   FieldName
// } from "./types";

// const searchDocument = (
//   node: TangramDocument | TangramNode,
//   predicate: (node: TangramDocument | TangramNode) => boolean
// ): TangramDocument | TangramNode | null => {
//   if (predicate(node)) {
//     return node;
//   }
//   switch (node.type) {
//     case "document":
//     case "view": {
//       for (let child of node.children) {
//         return searchDocument(child, predicate);
//       }
//     }
//   }
//   return null;
// };

// const factory = (
//   field: FieldName
// ): ((nodes: NodeSelector) => FieldSelector) => (
//   selector: NodeSelector
// ): FieldSelector => (node, document) =>
//   selector(node, document).map((uuid) => ({ uuid, field }));

// export const self = (): NodeSelector => (node) => [node.uuid];
// export const id = (id: string): NodeSelector => (_, document) => {
//   const result = searchDocument(document, (node) => node.id === id);
//   return result ? [result.uuid] : [];
// };

// export const x1 = factory(FieldName.X1);
// export const y1 = factory(FieldName.Y1);
// export const x2 = factory(FieldName.X2);
// export const y2 = factory(FieldName.Y2);
// export const width = factory(FieldName.WIDTH);
// export const height = factory(FieldName.HEIGHT);
