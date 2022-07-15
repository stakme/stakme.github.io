Post = h:Header c:Contents _* { h.contents = c; return h }

Contents = Content*

Content
    = PreformattedText
    / List
    / Headline
    / Paragraph

// header
Header
    = HeaderSeparator cs:HeaderContent* HeaderSeparator { return cs.reduce((p, v) => { p[v[0]] = v[1]; return p }, {}) }
HeaderSeparator = "---"_+
HeaderKey
    = "summary" {return "title"}
    / "title"
    / "tags"
    / "og_title"
    / "published_at"
    / "draft"
HeaderContent
    = key:HeaderKey ": |" _ values:HeaderMultiLine* { return [key, values.join("\n")] }
    / key:HeaderKey ": " value:Str [\n] { return [key, value] }
HeaderMultiLine
    = '    ' value:Str _ { return value }

// headline
Headline
    = tag:"#"+ Space+ l:TextLine { return { type: "headline", depth: tag.length, items: l} }

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

TextLine = TextLinePart+
TextLinePart
   = CodePart
   / LinkPart
   / RawPart

CodePart
    = "```" Space* s:CodePartStr3 "```" { return {type: "code", str: s } }
    / "``" Space* s:CodePartStr2 "``" { return {type: "code", str: s } }
    / "`" Space* s:CodePartStr1 "`" { return {type: "code", str: s } }
    / "`" { return {type: "raw", str: "`" } }
CodePartStr1
    = cs:CodePartChar1+ { return cs.join("") }
CodePartStr2
    = cs:CodePartChar2+ { return cs.join("") }
CodePartStr3
    = cs:CodePartChar3+ { return cs.join("") }
CodePartChar1
    = Space+ &"`" { return "" }
    / [^`]
    / "```" !"`" { return "```" }
CodePartChar2
    = Space+ &"``" { return "" }
    / c:[^`] !" ``" { return c }
    / "`" !"`" { return "`" }
CodePartChar3
    = Space+ &"```" { return "" }
    / [^`]
    / "`" !"``" { return "`" }

LinkPart
    = "[" cs:LinkedContent* "](" l:[^)]* ")" { return { type: "link", contents: cs, href: l.join("") } }
    / "[" { return {type: "raw", str: "[" } }
LinkedContent
    = CodePart
    / c:[^\]]+ { return {type:"raw", str: c.join("")} }

ImagePart
    = "![" featured:(!"\\" "@")? alt:( "\\@"? [^\]]*)  "](" src:[^ )]+ t:(" "+ "\"" [^"]* "\"" )? ")" {
        const joinedAlt = [(alt[0] && "@"), ...alt[1]].join("");
        return {
            type: "image",
            featured: !!featured,
            alt: joinedAlt,
            src: src.join(""),
            title: t && t[2].join(""),
        }
    }
    / "!" { return {type: "raw", str: "!" } }

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


