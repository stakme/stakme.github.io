Contents = Content*

Content
    = Paragraph
    / List

Paragraph
    = ParagraphSeparator? ls:Line+ { return {type: "paragraph", lines: ls} }
ParagraphSeparator = _ _

// list
List = _* ls:ListLine+ _* { return {type: "list", lines: ls } }
ListLine
    = UnorderedList
    / OrderedList
UnorderedList
    = ns:NestSpace* "-" Space l:Line { return {type: "unordered", depth: ns.length, line: l} }
OrderedList
    = ns:NestSpace* [0-9]+"." Space l:Line { return {type: "ordered", depth: ns.length, line: l} }


Post = h:Header c:Content { h.content = c; return h }

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

// base
Line
    = str:Str _ { return str }
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

