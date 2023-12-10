import { Graph } from "graph-fns";

import { TangramNode } from "./model";
import { SourceProperty } from "./source";
import { Hash } from "./utils";

export type NodeSelector = (
  origin: string,
  nodes: Hash<TangramNode<SourceProperty>>,
  documentGraph: Graph
) => Array<string>;

export type FieldSelector = (nodes: Array<string>) => Array<FieldIdentifier>;

export type FieldIdentifier = {
  uuid: string;
  field: FieldName;
};

export enum FieldName {
  X1 = "x1",
  Y1 = "y1",
  X2 = "x2",
  Y2 = "y2",
  WIDTH = "width",
  HEIGHT = "height"
}

export const self = (): NodeSelector => (uuid) => [uuid];
export const id = (id: string): NodeSelector => (_, nodes) => {
  for (let uuid in nodes) {
    if (nodes[uuid].id === id) {
      return [uuid];
    }
  }
  return [];
};

const factory = (
  field: FieldName
): ((nodes: NodeSelector) => FieldSelector) => (
  selector: NodeSelector
): FieldSelector => (nodes) => nodes.map((uuid) => ({ uuid, field }));

export const x1 = factory(FieldName.X1);
export const y1 = factory(FieldName.Y1);
export const x2 = factory(FieldName.X2);
export const y2 = factory(FieldName.Y2);
export const width = factory(FieldName.WIDTH);
export const height = factory(FieldName.HEIGHT);
