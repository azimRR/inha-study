import json, glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
ps = []
for f in sorted(glob.glob("P*.json")):
    if f.startswith("PRACTICE"): continue
    try: ps += json.load(open(f))
    except Exception as e: print("SKIP", f, e)
open("../practice-data.js", "w").write("/* merged from lessons/P*.json */\nconst PRACTICE = " + json.dumps(ps, ensure_ascii=False, indent=1) + ";\n")
print(len(ps), sum(len(p["questions"]) for p in ps), [p["lesson"] for p in ps])
