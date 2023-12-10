import { v4 as generateId } from "uuid";
import { create, addEdge, isCyclic, topologicalSort } from "graph-fns";

const FIELDS = ["x1", "y1", "x2", "y2", "width", "height"];

const traverseTree = (node, visiter) => {
  visiter(node);
  if (Array.isArray(node.children)) {
    for (let child of node.children) traverseTree(child, visiter);
  }
};

const mapTree = (node, mapper) =>
  mapper(
    node,
    Array.isArray(node.children)
      ? node.children.map((child) => mapTree(child, mapper))
      : []
  );

const self = () => (uuid) => [uuid];
const id = (id) => (_, items) =>
  [items.find((item) => item.id === id)]
    .filter(Boolean)
    .map((item) => item.uuid);

const x1 = (selector) => (uuid, items) =>
  selector(uuid, items).map((uuid) => ({ uuid, field: "x1" }));
const y1 = (selector) => (uuid, items) =>
  selector(uuid, items).map((uuid) => ({ uuid, field: "y1" }));
const x2 = (selector) => (uuid, items) =>
  selector(uuid, items).map((uuid) => ({ uuid, field: "x2" }));
const y2 = (selector) => (uuid, items) =>
  selector(uuid, items).map((uuid) => ({ uuid, field: "y2" }));
const width = (selector) => (uuid, items) =>
  selector(uuid, items).map((uuid) => ({ uuid, field: "width" }));
const height = (selector) => (uuid, items) =>
  selector(uuid, items).map((uuid) => ({ uuid, field: "height" }));

// const items = (
//   <document>
//     <view
//       id="a"
//       x1="100"
//       y1="100"
//       x2="x1(:scope) + 200"
//       y2="y1(:scope) + 100"
//     />
//     <view
//       id="b"
//       x1="x1(#a) + 10"
//       x2="x2(#a) - 10"
//       y1="y2(#a) + 10"
//       y2="y1(:scope) + 100"
//     />
//     <view
//       x1="max(x2(#a), x2(#b)) + 10"
//       x2="x1(:scope) + 80"
//       y1="y1(#a) + (y2(#b) - y1(#a)) / 2 - 40"
//       y2="y1(:scope) + 80"
//     />
//     <view
//       x2="avg(x1(*:not(:scope)), x2(*:not(:scope)))"
//       y1="max(y2(*:not(:scope))) + 10"
//       width="100"
//       height="100"
//     />
//   </document>
// );

const source = {
  type: "document",
  children: [
    {
      type: "view",
      id: "a",
      x1: {
        deps: () => [x2(id("A"))],
        resolve: ([A]) => A
      },
      y1: {
        deps: () => [y2(id("A"))],
        resolve: ([A]) => A
      },
      x2: {
        deps: () => [x1(self())],
        resolve: ([a]) => a + 200
      },
      y2: {
        deps: () => [y1(self())],
        resolve: ([a]) => a + 100
      }
    },
    {
      type: "view",
      id: "b",
      x1: {
        deps: () => [x1(id("a"))],
        resolve: ([a]) => a + 10
      },
      y1: {
        deps: () => [y2(id("a"))],
        resolve: ([a]) => a + 10
      },
      x2: {
        deps: () => [x2(id("a"))],
        resolve: ([a]) => a - 10
      },
      height: {
        deps: () => [],
        resolve: () => 300
      }
    },
    {
      type: "view",
      x1: {
        deps: () => [x2(id("a")), x2(id("b"))],
        resolve: ([a, b]) => Math.max(a, b) + 10
      },
      y1: {
        deps: () => [y1(id("a")), y2(id("b")), height(self())],
        resolve: ([a, b, h]) => a + (b - a) / 2 - h / 2
      },
      width: {
        deps: () => [],
        resolve: () => 80
      },
      height: {
        deps: () => [],
        resolve: () => 250
      }
    },
    {
      type: "view",
      id: "A",
      width: {
        deps: () => [],
        resolve: () => 200
      },
      height: {
        deps: () => [],
        resolve: () => 100
      }
    }
  ]
};

const document = { nodes: 0 };
// the document tree
let documentGraph;
// the depedencies between edges etc
let layoutGraph;

const items = [];

const resolved = {};

traverseTree(source, (item) => {
  const uuid = generateId();
  item.uuid = uuid;
  items.push(item);
  resolved[uuid] = { item };

  // document.source = source;

  // const record = item;
  // nodes[uuid] = {
  //   uuid,
  //   record,
  //   x1:
  //     record.x1 || record.x2
  //       ? {
  //           deps: () => [x2(self()), width(self())],
  //           resolve: ([x2, width]) => x2 - width
  //         }
  //       : {
  //           deps: () => [],
  //           resolve: () => 0
  //         },
  //   x2: record.x2 || {
  //     deps: () => [x1(self()), width(self())],
  //     resolve: ([x1, width]) => x1 + width
  //   },
  //   width:
  //     record.width || (record.x1 && record.x2)
  //       ? {
  //           deps: () => [x2(self()), x1(self())],
  //           resolve: ([x2, x1]) => x2 - x1
  //         }
  //       : {
  //           deps: () => [],
  //           resolve: () => 0
  //         },
  //   y1:
  //     record.y1 || record.y2
  //       ? {
  //           deps: () => [y2(self()), height(self())],
  //           resolve: ([y2, height]) => y2 - height
  //         }
  //       : {
  //           deps: () => [],
  //           resolve: () => 0
  //         },
  //   y2: record.y2 || {
  //     deps: () => [y1(self()), height(self())],
  //     resolve: ([y1, height]) => y1 + height
  //   },
  //   height:
  //     record.height || (record.y1 && record.y2)
  //       ? {
  //           deps: () => [y2(self()), y1(self())],
  //           resolve: ([y2, y1]) => y2 - y1
  //         }
  //       : {
  //           deps: () => [],
  //           resolve: () => 0
  //         }
  // };

  if (item.x1) {
    if (item.x2) {
      if (item.width) {
        throw Error(`Invalid item. Cannot specify x1, x2 and width. Choose 2.`);
      } else {
        item.width = {
          deps: () => [x2(self()), x1(self())],
          resolve: ([x2, x1]) => x2 - x1
        };
      }
    } else {
      item.x2 = {
        deps: () => [x1(self()), width(self())],
        resolve: ([x1, width]) => x1 + width
      };
      if (!item.width) {
        item.width = {
          deps: () => [],
          resolve: () => 0
        };
      }
    }
  } else {
    if (item.x2) {
      item.x1 = {
        deps: () => [x2(self()), width(self())],
        resolve: ([x2, width]) => x2 - width
      };
      if (!item.width) {
        item.width = {
          deps: () => [],
          resolve: () => 0
        };
      }
    } else {
      item.x1 = {
        deps: () => [],
        resolve: () => 0
      };
      item.x2 = {
        deps: () => [x1(self()), width(self())],
        resolve: ([x1, width]) => x1 + width
      };
      if (!item.width) {
        item.width = {
          deps: () => [],
          resolve: () => 0
        };
      }
    }
  }

  if (item.y1) {
    if (item.y2) {
      if (item.height) {
        throw Error(
          `Invalid item. Cannot specify y1, y2 and height. Choose 2.`
        );
      } else {
        item.height = {
          deps: () => [y2(self()), y1(self())],
          resolve: ([y2, y1]) => y2 - y1
        };
      }
    } else {
      item.y2 = {
        deps: () => [y1(self()), height(self())],
        resolve: ([y1, height]) => y1 + height
      };
      if (!item.height) {
        item.height = {
          deps: () => [],
          resolve: () => 0
        };
      }
    }
  } else {
    if (item.y2) {
      item.y1 = {
        deps: () => [y2(self()), height(self())],
        resolve: ([y2, height]) => y2 - height
      };
      if (!item.height) {
        item.height = {
          deps: () => [],
          resolve: () => 0
        };
      }
    } else {
      item.y1 = {
        deps: () => [],
        resolve: () => 0
      };
      item.y2 = {
        deps: () => [y1(self()), height(self())],
        resolve: ([y1, height]) => y1 + height
      };
      if (!item.height) {
        item.height = {
          deps: () => [],
          resolve: () => 0
        };
      }
    }
  }
});

traverseTree(source, (item) => {
  for (let field of FIELDS) {
    item[field].deps = item[field]
      .deps()
      .reduce((result, fn) => [...result, ...fn(item.uuid, items)], [])
      .filter(Boolean);
  }
});

let graph = create(
  items.length * FIELDS.length,
  (i) =>
    `${items[Math.floor(i / FIELDS.length)].uuid}.${FIELDS[i % FIELDS.length]}`
);

traverseTree(source, (item) => {
  for (let field of FIELDS) {
    for (let dep of item[field].deps) {
      graph = addEdge(graph, [
        `${dep.uuid}.${dep.field}`,
        `${item.uuid}.${field}`
      ]);
      if (isCyclic(graph)) {
        throw Error(
          `Cycle detected: ${item.uuid}.${field} -> ${dep.uuid}.${dep.field}`
        );
      }
    }
  }
});

for (let compositeId of topologicalSort(graph)) {
  const [uuid, field] = compositeId.split(".");
  resolved[uuid][field] = resolved[uuid].item[field].resolve(
    resolved[uuid].item[field].deps.map((dep) => {
      return resolved[dep.uuid][dep.field];
    })
  );
}

const App = () => (
  <svg width="500" height="800">
    {Object.entries(resolved).map(([uuid, { x1, y1, x2, y2 }]) => (
      <rect key={uuid} x={x1} y={y1} width={x2 - x1} height={y2 - y1} />
    ))}
  </svg>
);

export default App;
