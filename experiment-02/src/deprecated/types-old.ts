// type FieldDeclaration = number;

// // abstract

// type TangramDocument<T> = {
//   type: "document";
//   children: Array<TangramChildNode<T>>;
// } & T;

// type TangramView<T> = {
//   type: "view";
//   children: Array<TangramChildNode<T>>;
// } & T;

// type TangramImage<T> = {
//   type: "image";
// } & T;

// type TangramNode<T> = TangramDocument<T> | TangramView<T> | TangramImage<T>;
// type TangramChildNode<T> = TangramView<T> | TangramImage<T>;

// // source

// type SourceIdentifiedNode = {
//   id?: string;
// };

// type SourcePositionedNode = {
//   x1?: FieldDeclaration;
//   y1?: FieldDeclaration;
//   x2?: FieldDeclaration;
//   y2?: FieldDeclaration;
//   width?: FieldDeclaration;
//   height?: FieldDeclaration;
// };

// type SourceDocument = TangramDocument & SourceIdentifiedNode;

// type SourceView = TangramDocument & SourceIdentifiedNode & SourcePositionedNode;

// type SourceImage = TangramImage &
//   SourceIdentifiedNode &
//   SourcePositionedNode & {
//     src: string;
//     fill?: "fit" | "stretch" | "crop" | "tile";
//   };

// // complete

// type CompleteIdentifiedNode = {
//   id?: string;
//   uuid: string;
// };

// type CompletePositionedNode = {
//   x1: FieldDeclaration;
//   y1: FieldDeclaration;
//   x2: FieldDeclaration;
//   y2: FieldDeclaration;
//   width: FieldDeclaration;
//   height: FieldDeclaration;
// };

// type CompleteDocument = TangramDocument &
//   CompleteIdentifiedNode &
//   CompletePositionedNode;

// type CompleteView = TangramDocument &
//   CompleteIdentifiedNode &
//   CompletePositionedNode;

// type CompleteImage = TangramImage &
//   CompleteIdentifiedNode &
//   CompletePositionedNode & {
//     src: string;
//     fill: "fit" | "stretch" | "crop" | "tile";
//   };

// //

// const traverseDocument = (
//   node: TangramNode,
//   visiter: (node: TangramNode) => void
// ): void => {
//   visiter(node);
//   if ("children" in node) {
//     for (let child of node.children) {
//       traverseDocument(child, visiter);
//     }
//   }
// };

// const a: CompleteDocument = {
//   type: "document",
//   uuid: "1",
//   x1: 0,
//   y1: 0,
//   x2: 0,
//   y2: 0,
//   width: 0,
//   height: 0,
//   children: [
//     {
//       type: "image",
//       uuid: "2",
//       x1: 0,
//       y1: 0,
//       x2: 0,
//       y2: 0,
//       width: 0,
//       height: 0,
//       src: "",
//       fill: "fit"
//     }
//   ]
// };

// // traverseDocument();
