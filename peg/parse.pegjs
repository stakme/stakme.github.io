Chapter
    = Line+

Line
    = content:Content _ { return content.join(""); }

Content
    = [^\n] *

_ "newline"
    = [\r] ? [\n]
