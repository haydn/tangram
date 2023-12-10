// type DeclaredField = {
//   deps: () => Array<FieldSelector>;
//   resolve: (deps: Array<number>) => number;
// };

// type ResolvedField = {
//   deps: Array<FieldIdentifier>;
//   resolve: (deps: Array<number>) => number;
// };

// type FieldSelector = (
//   node: TangramNode,
//   document: TangramDocument
// ) => Array<FieldIdentifier>;

// type FieldIdentifier = {
//   uuid: string;
//   field: FieldName;
// };

// enum FieldName {
//   X1 = "x1",
//   Y1 = "y1",
//   X2 = "x2",
//   Y2 = "y2",
//   WIDTH = "width",
//   HEIGHT = "height"
// }

// type NodeSelector = (
//   node: TangramNode,
//   document: TangramDocument
// ) => Array<string>;

// //

// type SourceDocument = {
//   type: "document";
//   id?: string;
//   children?: Array<SourceNode>;
// };

// type SourceView = {
//   type: "view";
//   id?: string;
//   x1?: DeclaredField;
//   y1?: DeclaredField;
//   x2?: DeclaredField;
//   y2?: DeclaredField;
//   width?: DeclaredField;
//   height?: DeclaredField;
//   children?: Array<SourceNode>;
// };

// type SourceImage = {
//   type: "image";
//   id?: string;
//   src: string;
//   fill?: "fit" | "stretch" | "crop" | "tile";
//   x1?: DeclaredField;
//   y1?: DeclaredField;
//   x2?: DeclaredField;
//   y2?: DeclaredField;
//   width?: DeclaredField;
//   height?: DeclaredField;
// };

// type SourceNode = SourceView | SourceImage;

// //

// type TangramDocument<
//   Field extends DeclaredField | ResolvedField | number = DeclaredField
// > = {
//   source: SourceDocument;
//   type: "document";
//   uuid: string;
//   id?: string;
//   // x1: Field;
//   // y1: Field;
//   // x2: Field;
//   // y2: Field;
//   // width: Field;
//   // height: Field;
//   children: Array<TangramNode<Field>>;
// };

// type TangramView<
//   Field extends DeclaredField | ResolvedField | number = DeclaredField
// > = {
//   source: SourceView;
//   type: "view";
//   uuid: string;
//   id?: string;
//   x1: Field;
//   y1: Field;
//   y2: Field;
//   x2: Field;
//   width: Field;
//   height: Field;
//   children: Array<TangramNode<Field>>;
// };

// type TangramImage<
//   Field extends DeclaredField | ResolvedField | number = DeclaredField
// > = {
//   source: SourceImage;
//   type: "image";
//   uuid: string;
//   id?: string;
//   src: string;
//   fill: "fit" | "stretch" | "crop" | "tile";
//   // x1?: Field;
//   // y1?: Field;
//   // x2?: Field;
//   // y2?: Field;
//   // width?: Field;
//   // height?: Field;
// };

// type TangramNode<
//   Field extends DeclaredField | ResolvedField | number = DeclaredField
// > = TangramView<Field> | TangramImage<Field>;
