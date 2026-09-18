"""Local preview only. GitHub Pages renders the real site with Jekyll.

Renders every page with front matter through _layouts/default.html into _site/,
supporting the small Liquid subset the layout uses:
  {{ content }}  {{ page.x }}  {{ site.x }}  {{ 'lit' | relative_url }}  {{ page.x | absolute_url }}

Usage:  python _tools/render.py   then serve _site/ (e.g. python -m http.server -d _site 8765)
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, '_site')

def read(p): return open(p, encoding='utf-8').read()

def parse_yaml_flat(text):
    d = {}
    for line in text.splitlines():
        m = re.match(r'^([A-Za-z_][\w]*):\s*(.*)$', line)
        if m:
            v = m.group(2).strip()
            if v.startswith('"') and v.endswith('"'): v = v[1:-1].replace('\\"', '"')
            d[m.group(1)] = v
    return d

def split_front_matter(text):
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.S)
    return (parse_yaml_flat(m.group(1)), text[m.end():]) if m else (None, text)

def liquid(template, ctx):
    def val(expr):
        expr = expr.strip()
        if expr.startswith(("'", '"')): return expr[1:-1]
        if expr == 'content': return ctx['content']
        obj, _, key = expr.partition('.')
        return str(ctx.get(obj, {}).get(key, ''))
    def render(m):
        parts = [p.strip() for p in m.group(1).split('|')]
        v = val(parts[0])
        for f in parts[1:]:
            if f == 'relative_url': v = ctx['site']['baseurl'] + v
            elif f == 'absolute_url': v = ctx['site']['url'] + ctx['site']['baseurl'] + v
            else: raise ValueError('unsupported filter ' + f)
        return v
    return re.sub(r'\{\{\s*(.*?)\s*\}\}', render, template)

def main():
    site = parse_yaml_flat(read(os.path.join(ROOT, '_config.yml')))
    layout = read(os.path.join(ROOT, '_layouts', 'default.html'))
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    for dirpath, dirs, files in os.walk(ROOT):
        rel = os.path.relpath(dirpath, ROOT)
        dirs[:] = [d for d in dirs if not d.startswith(('_', '.'))]
        for f in files:
            if f.startswith(('_', '.')): continue
            src = os.path.join(dirpath, f)
            dst = os.path.join(OUT, rel, f) if rel != '.' else os.path.join(OUT, f)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if f.endswith('.html'):
                fm, body = split_front_matter(read(src))
                if fm is None:
                    shutil.copy2(src, dst); continue
                url = '/' if (rel == '.' and f == 'index.html') else '/' + (f if rel == '.' else rel.replace(os.sep, '/') + '/' + f)
                fm['url'] = url
                html = liquid(layout, {'site': site, 'page': fm, 'content': body})
                open(dst, 'w', encoding='utf-8', newline='\n').write(html)
                print('rendered', url)
            else:
                shutil.copy2(src, dst)
    print('done ->', OUT)

if __name__ == '__main__':
    main()
