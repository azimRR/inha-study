from semsim import *
from m_patterns import report, outs
# CS162 Fall 2019 MT1 (i): all semaphores initialised to 1
m = Model({'loguetown': 1, 'marineford': 1, 'skypeia': 1}, {}, [
    Thread('luffy', [P('loguetown'), V('marineford'), P('skypeia'), OUT('L')]),
    Thread('blackbeard', [P('skypeia'), V('skypeia'), P('loguetown'), OUT('B')]),
    Thread('akainu', [P('marineford'), P('loguetown'), V('skypeia'), OUT('A')])])
r = m.explore()
allouts = sorted({' '.join(o) for (o, v) in r['finals']} | {' '.join(st[3]) for st in r['deadlocks']})
print('One Piece: outputs on all maximal runs:', allouts, ' complete runs:', len(r['terminal']))
# shortest run printing A
st = min([s for s in r['deadlocks'] if s[3] == ('A',)], key=lambda s: len(m.path(s)))
print(m.table(m.path(st)))
# Q: S=T=0 two-process exchange
m = Model({'S': 0, 'T': 0}, {}, [Thread('P1', [OUT('A'), V('S'), P('T'), OUT('B')]),
                                 Thread('P2', [P('S'), OUT('C'), V('T'), OUT('D')])])
r = m.explore(); report('P1: A; V(S); P(T); B | P2: P(S); C; V(T); D', m, r)
# Q: wrong order of waits in a two-lock program (Silberschatz S/Q example)
m = Model({'S': 1, 'Q': 1}, {}, [Thread('P0', [P('S'), P('Q'), OUT('p0'), V('S'), V('Q')]),
                                 Thread('P1', [P('Q'), P('S'), OUT('p1'), V('Q'), V('S')])])
r = m.explore(); report('Silberschatz S/Q opposite order', m, r)
st = r['deadlocks'][0]; print(m.table(m.path(st)))
print('schedules (complete, deadlocking) =', m.count_paths())
# Q: semaphore value trace S=2 with four waits and two signals (FIFO)
m = Model({'S': 2}, {}, [Thread('P1', [P('S'), OUT('1in'), V('S')]), Thread('P2', [P('S'), OUT('2in'), V('S')]),
                         Thread('P3', [P('S'), OUT('3in'), V('S')]), Thread('P4', [P('S'), OUT('4in'), V('S')])], mode='fifo')
r = m.explore(); fin, dl = outs(m, r)
print('S=2, 4 threads: max simultaneously inside never exceeds 2; outputs', len(fin))
