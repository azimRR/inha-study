import json, glob, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
ls = []
for f in sorted(glob.glob("L*.json")):
    try:
        ls += json.load(open(f))
    except Exception as e:
        print("SKIP", f, e)
open("../lessons-data.js", "w").write("/* merged from lessons/L*.json */\nconst LESSONS = " + json.dumps(ls, ensure_ascii=False, indent=1) + ";\n")
print(len(ls), [l["id"] for l in ls])
