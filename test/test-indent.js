import ist from "ist";
import { EditorState } from "@codemirror/state";
import { getIndentation } from "@codemirror/language";
import { r } from "codemirror-lang-r";

function check(code) {
  return () => {
    code = /^\n*([^]*)/.exec(code)[1];
    let state = EditorState.create({
      doc: code,
      extensions: [r().language],
    });
    for (let pos = 0, lines = code.split("\n"), i = 0; i < lines.length; i++) {
      let line = lines[i],
        indent = /^\s*/.exec(line)[0].length;
      ist(`${getIndentation(state, pos)} (${i + 1})`, `${indent} (${i + 1})`);
      pos += line.length + 1;
    }
  };
}

describe("r indentation", () => {
  it(
    "indents function blocks",
    check(`
fn <- function() {
  bar
  baz
}
`)
  );

  it(
    "indents function arg lists",
    check(`
foo(
  bar,
  baz
)`)
  );

  it(
    "indents if statement",
    check(`
if (T) {
  bar
} else {
  baz
}
`)
  );

  it(
    "indents nested blocks",
    check(`
if (T) {
  if (t) {
    bar
  }
}
`)
  );
});
