Post = h:Header c:Contents { h.contents = c; return h }

Contents = Content*

Content
    = List
    / Paragraph

Paragraph
    = ParagraphSeparator? ls:Line+ { return {type: "paragraph", lines: ls} }
ParagraphSeparator = _ _

// header
Header
    = HeaderSeparator cs:HeaderContent* HeaderSeparator { return cs.reduce((p, v) => { p[v[0]] = v[1]; return p }, {}) }
HeaderSeparator = "---"[\n]
HeaderKey
    = "summary"
    / "tags"
    / "published_at"
HeaderContent
    = key:HeaderKey ": " value:Str [\n] { return [key, value] }

// list
List = _* ls:ListLine+ _* { return {type: "list", lines: ls } }
ListLine
    = UnorderedList
    / OrderedList
UnorderedList
    = ns:NestSpace* "-" Space l:Line { return {type: "unordered", depth: ns.length, line: l} }
OrderedList
    = ns:NestSpace* [0-9]+"." Space l:Line { return {type: "ordered", depth: ns.length, line: l} }


// line
Line = LinePart+

LinePart
   = CodePart
   / RawPart

CodePart
    = "`" s:CodePartStr1 "`" { return {type: "code", str: s } }
    / "``" !"`"  s:CodePartStr2  "``" { return {type: "code", chars: s } }
    / "```"  s:CodePartStr3  "```" { return {type: "code", chars: s } }
    / "`" { return {type: "raw", chars: "`" } }
CodePartStr1
    = cs:[^`\n]+ { return cs.join("") }
CodePartStr2
    = cs:CodePartChar2+ { return cs.join("") }
CodePartChar2
    = [^`]
    / "`" !"`" { return "`" }
CodePartStr3
    = cs:CodePartChar3+ { return cs.join("") }
CodePartChar3
    = [^`]
    / "``" !"`" { return "``" }
    / "`" !"`" { return "`" }

RawPart
    = cs:RawPartChar+ { return {type: "raw", str: cs.join("")} }

RawPartChar
    = [^`\n]

// base
LastLine
    = str:Str { return str }
Str
    = chars:[^\n]+ { return chars.join(""); }
Space
    = " "+
NestSpace
    = "    "
_ "newline"
    = [\r] ? [\n]


