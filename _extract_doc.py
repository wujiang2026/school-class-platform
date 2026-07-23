import re
data = open('_profile.doc', 'rb').read()
print('size', len(data))
txt = data.decode('utf-16-le', errors='ignore')
print('decoded len', len(txt))
# 抓取连续中文片段（含常见标点/字母数字）
segs = re.findall(r'[\u4e00-\u9fff][\u4e00-\u9fffA-Za-z0-9，。、：；！？（）《》（）“”：·\-—\s]{4,}', txt)
seen = set(); out = []
for s in segs:
    s = s.strip()
    if s and s not in seen:
        seen.add(s); out.append(s)
print('seg count', len(out))
print('=' * 40)
for s in out[:150]:
    print(s)
