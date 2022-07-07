Post = h:Header c:Contents _* { h.contents = c; return h }

Contents = Content*

Content
    = PreformattedText
    / List
    / Paragraph

// header
Header
    = HeaderSeparator cs:HeaderContent* HeaderSeparator { return cs.reduce((p, v) => { p[v[0]] = v[1]; return p }, {}) }
HeaderSeparator = "---"_+
HeaderKey
    = "summary"
    / "tags"
    / "published_at"
HeaderContent
    = key:HeaderKey ": " value:Str [\n] { return [key, value] }

// paragraph
Paragraph
    = _* ls:Line+ _* { return {type: "paragraph", lines: ls} }

// pre
PreformattedText
    = _* "```"  s:Str? _ l:PreLine* "```" _* { return {type: "pre", style: s, lines:l } }
PreLine
    = !"```" s:Str? _  { return s }
    / !"```" _  { return "" }

// list
List = _* ls:ListLine+ _* { return {type: "list", items: ls } }
ListLine
    = UnorderedList
    / OrderedList
UnorderedList
    = ns:NestSpace* "-" Space l:Line _ { return {type: "unordered", depth: ns.length, line: l} }
OrderedList
    = ns:NestSpace* [0-9]+"." Space l:Line _ { return {type: "ordered", depth: ns.length, line: l} }


// line
Line = LinePart+

LinePart
   = CodePart
   / LinkPart
   / ImagePart
   / RawPart

CodePart
    = "`" s:CodePartStr1 "`" { return {type: "code", str: s } }
    / "``" !"`"  s:CodePartStr2  "``" { return {type: "code", chars: s } }
    / "```"  s:CodePartStr3  "```" { return {type: "code", chars: s } }
    / "`" { return {type: "raw", str: "`" } }
CodePartStr1
    = cs:CodePartChar1+ { return cs.join("") }
CodePartStr2
    = cs:CodePartChar2+ { return cs.join("") }
CodePartStr3
    = cs:CodePartChar3+ { return cs.join("") }
CodePartChar1
    = [^`]
    / "```" !"`" { return "```" }
CodePartChar2
    = [^`]
    / "`" !"`" { return "`" }
CodePartChar3
    = [^`]
    / "``" !"`" { return "``" }
    / "`" !"`" { return "`" }

LinkPart
    = "[" c:[^\]]* "](" l:[^)]* ")" { return { type: "link", content: c.join(""), href: l.join("") } }
    / "[" { return {type: "raw", chars: "[" } }

ImagePart
    = "![" c:[^\]]* "](" l:[^) ]* Space "\"" t:[^"]* "\")" { return { type: "image", alt: c.join(""), src: l.join(""), title: t.join("") } }
    / "![" c:[^\]]* "](" l:[^)]* ")" { return { type: "image", alt: c.join(""), src: l.join("") } }
    / "!" { return {type: "raw", chars: "!" } }

RawPart
    = cs:RawPartChar+ { return {type: "raw", str: cs.join("")} }
RawPartChar
    = [^!`[\n]

// base
Str
    = chars:[^\n]+ { return chars.join(""); }
Space
    = " "+
NestSpace
    = "    "
_ "newline"
    = [\r] ? [\n]



