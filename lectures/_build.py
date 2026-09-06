# 강의 페이지 빌더: {{FILE:path}} → HTML 이스케이프 원문, {{CODE:path|hl|hl2}} → 라인 번호 코드,
#                  {{DIFF:path}} → unified diff 를 줄 종류별(add/del/hunk/meta) span 으로 감싼 코드
import sys, re, html, pathlib
src, dst = sys.argv[1], sys.argv[2]
t = pathlib.Path(src).read_text(encoding="utf-8")
def file_sub(m):
    return html.escape(pathlib.Path(m.group(1)).read_text(encoding="utf-8").rstrip("\n"))
def code_sub(m):
    path, hl, hl2 = m.group(1), m.group(2), m.group(3)
    hl = set(int(x) for x in hl.split(",") if x.strip()); hl2 = set(int(x) for x in hl2.split(",") if x.strip())
    lines = pathlib.Path(path).read_text(encoding="utf-8").rstrip("\n").split("\n")
    out = ['<pre class="num"><code>']
    for i, ln in enumerate(lines, 1):
        cls = " hl" if i in hl else (" hl2" if i in hl2 else "")
        out.append(f'<span class="l{cls}"><span class="n">{i}</span>{html.escape(ln)}</span>')
    out.append('</code></pre>')
    return "".join(out)
def diff_sub(m):
    out = ['<pre class="diff"><code>']
    for ln in pathlib.Path(m.group(1)).read_text(encoding="utf-8").rstrip("\n").split("\n"):
        cls = "meta" if ln.startswith(("+++", "---")) else "add" if ln.startswith("+") else "del" if ln.startswith("-") else "hunk" if ln.startswith("@@") else "ctx"
        out.append(f'<span class="{cls}">{html.escape(ln)}</span>')
    out.append('</code></pre>')
    return "".join(out)
t = re.sub(r"\{\{DIFF:([^}]+)\}\}", diff_sub, t)
t = re.sub(r"\{\{CODE:([^|}]+)\|([^|}]*)\|([^}]*)\}\}", code_sub, t)
t, n = re.subn(r"\{\{FILE:([^}]+)\}\}", file_sub, t)
assert "{{FILE:" not in t and "{{CODE:" not in t and "{{DIFF:" not in t
pathlib.Path(dst).write_text(t, encoding="utf-8")
print(f"wrote {dst}: {len(t)} bytes, {n} files embedded")
