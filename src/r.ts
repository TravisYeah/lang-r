import { parser } from "lezer-r";
import {
  delimitedIndent,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  LRLanguage,
  LanguageSupport,
} from "@codemirror/language";

export const rLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Block: delimitedIndent({ closing: "}" }),
        "ParamList ArgList": delimitedIndent({ closing: ")" }),
      }),
      foldNodeProp.add({ Block: foldInside }),
    ],
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"'] },
    commentTokens: { line: "#" },
  },
});

export function r() {
  return new LanguageSupport(rLanguage);
}
