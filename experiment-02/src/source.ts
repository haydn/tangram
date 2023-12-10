import { FieldSelector } from "./selectors";

export type SourceDocument = {
  type: "SourceDocument";
  id?: string;
  children: Array<SourceView | SourceImage>;
};

export type SourceView = {
  type: "SourceView";
  id?: string;
  x1?: SourceProperty;
  y1?: SourceProperty;
  x2?: SourceProperty;
  y2?: SourceProperty;
  width?: SourceProperty;
  height?: SourceProperty;
  children: Array<SourceView | SourceImage>;
};

export type SourceImage = {
  type: "SourceImage";
  id?: string;
  x1?: SourceProperty;
  y1?: SourceProperty;
  x2?: SourceProperty;
  y2?: SourceProperty;
  width?: SourceProperty;
  height?: SourceProperty;
  src: string;
  fill?: "fit" | "stretch" | "crop" | "tile";
};

export type SourceProperty = {
  deps: () => Array<FieldSelector>;
  resolve: (deps: Array<number>) => number;
} | null;
