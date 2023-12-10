/* eslint-disable @typescript-eslint/no-use-before-define */

import { Graph, create as graph } from "graph-fns";
import { v4 as generateUuid } from "uuid";

import { TangramNode } from "./model";
import { SourceDocument, SourceView, SourceImage, SourceField } from "./source";
import { Hash, mergeGraphs } from "./utils";

export const extractNodes = (
  source: SourceDocument | SourceView | SourceImage
): { extractedNodes: Hash<TangramNode<SourceField>>; documentGraph: Graph } => {
  switch (source.type) {
    case "SourceDocument":
      return extractNodesFromDocument(source);
    case "SourceView":
      return extractNodesFromView(source);
    case "SourceImage":
      return extractNodesFromImage(source);
  }
};

const extractNodesFromDocument = (
  source: SourceDocument
): { extractedNodes: Hash<TangramNode<SourceField>>; documentGraph: Graph } => {
  const uuid = generateUuid();
  let documentGraph = graph(1, () => uuid);
  let extractedNodes: Hash<TangramNode<SourceField>> = {
    [uuid]: {
      type: "TangramDocument",
      uuid,
      id: source.id,
      x1: null,
      y1: null,
      x2: null,
      y2: null,
      width: null,
      height: null
    }
  };
  for (let child of source.children) {
    const {
      extractedNodes: childExtractedNodes,
      documentGraph: childDocumentGraph
    } = extractNodes(child);
    extractedNodes = { ...extractedNodes, ...childExtractedNodes };
    documentGraph = mergeGraphs(documentGraph, childDocumentGraph);
  }
  return { extractedNodes, documentGraph };
};

const extractNodesFromView = (
  source: SourceView
): { extractedNodes: Hash<TangramNode<SourceField>>; documentGraph: Graph } => {
  let documentGraph = graph();
  const extractedNodes = {};
  return { extractedNodes, documentGraph };
};

const extractNodesFromImage = (
  source: SourceImage
): { extractedNodes: Hash<TangramNode<SourceField>>; documentGraph: Graph } => {
  let documentGraph = graph();
  const extractedNodes = {};
  return { extractedNodes, documentGraph };
};
