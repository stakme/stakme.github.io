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

// content
Content
    = Line+

// base
Line
    = str:Str _ { return str }
Str
    = chars:[^\n]* { return chars.join(""); }
Space
    = [\s]*
_ "newline"
    = [\r] ? [\n]
