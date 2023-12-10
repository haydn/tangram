# Tangram

A new file format for the web. An alternative to HTML/CSS, SVG or PDF.

## Goals

- Supports 3 modes:
  - Static. (Akin to an SVG image or a non-interactive PDF.)
  - Animated. (Like a Lottie or a non-interactive SWF file.)
  - Interactive. (Like an interactive HTML page, PDF or SWF file.)
- Compatible with the existing web. Works over HTTP(S) and can be embedded in an HTML page using an `<img>` tag (for static and animated modes) or `<iframe>` for interactive mode.
- Uses JavaScript as the scripting language.
  - Maybe also supports TypeScript (similar to the first-class support Deno and Bun have)?
- Components as a first-class feature.
- All UI elements constructed using Tangram components. Making a custom UI element (e.g. a select menu) should be entirely possible by modifying/replicating/replacing the existing Tangram code for the "default" UI element.
- No build step required. Bundling and/or minification might still be desired for performance reasons, but not transpiling should be needed for a typical development workflow. In dev a environment, you should be able to edit Tangram files directly and see the changes in the browser without having to run a build step.
- Code distribution system. It should be possible to use a UI library someone has published without having to bundle it in your file. Just reference it and the user's browser will download (and cache) it on-demand.
- Option for self-contained files like a PDF. Assets can be embedded using data-urls.
- Has an intrinsic size.
- Touch-first. (Supports touch events and gestures.)
- First-class support for accessibility features.
- Advanced graphics features built-in. (Has SVG-like features such as gradients, filters, blend modes, boolean groups etc.)
- Separates document structure, logical structure and presentation.
- Support for responsive design built-in.
- Support for internationalisation built-in. (Handles languages and writing modes etc.)
- Customisable layout algorithms. Common layout algorithms cone built-in, but like components they should be replaceable using Tangram/JavaScript code.

## Non-Goals

- Tangram is not a programming language, it is a file format. It it is not aiming to be Turing complete.
- Tangram is not a replacement for HTML/CSS, it is an alternative and should work alongside them.
