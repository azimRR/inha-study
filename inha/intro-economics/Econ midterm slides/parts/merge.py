import json, glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
ex = []
for f in sorted(glob.glob("part*.json")):
    ex += json.load(open(f))
open("../econ-data.js", "w").write("/* merged from parts/*.json */\nconst EX = " + json.dumps(ex, ensure_ascii=False, indent=1) + ";\n")
print(len(ex), [e["id"] for e in ex])
