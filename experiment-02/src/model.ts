import { SourceField } from "./source";
import { FieldIdentifier } from "./selectors";

export type ResolvedField = {
  type: "ResolvedField";
  deps: Array<FieldIdentifier>;
  resolve: (deps: Array<number>) => number;
};

export type TangramNode<T extends SourceField | ResolvedField | number> = {
  type: "TangramDocument" | "TangramView" | "TangramImage";
  uuid: string;
  id?: string;
  x1: T;
  y1: T;
  x2: T;
  y2: T;
  width: T;
  height: T;
};
