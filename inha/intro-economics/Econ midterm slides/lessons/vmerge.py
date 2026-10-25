import json, glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
vs = []
for f in sorted(glob.glob("V*.json")):
    try: vs += json.load(open(f))
    except Exception as e: print("SKIP", f, e)
open("../variants-data.js", "w").write("/* merged from lessons/V*.json */\nconst VARIANTS = " + json.dumps(vs, ensure_ascii=False, indent=1) + ";\n")
print(len(vs), [v["q"] for v in vs])
