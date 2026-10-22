# Advanced SQL for the Midterm: Ranking & Windowing, Advanced Aggregation (ROLLUP/CUBE), Integrity Constraints, Triggers — Silberschatz 6e §4.4, §5.3, §5.5–5.6 + MySQL 8

> Outside (internet) notes for SOC3020-003 (Inha Univ. Tashkent, Fall 2026). Textbook section map, from the 6th-ed. table of contents: **4.4 Integrity Constraints (p.128)**, **5.3 Triggers (p.180)**, **5.5 Advanced Aggregation Features (p.192)**, **5.6 OLAP (p.197)** — [db-book 6e TOC](https://www.db-book.com/db6/toc-dir/toc.pdf).
> **How outputs were verified:** every "verified" result table below was produced by actually running the SQL on 2026-10-19, using PostgreSQL 16.14 (standard-SQL behavior) and SQLite 3.54.0 (MySQL-like NULL ordering), in a throwaway local database. Constraint and cascade results were run on the textbook's own university schema and small dataset ([db-book sample tables](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html)). **No MySQL server was available**, so the MySQL-specific syntax (DELIMITER, SIGNAL, WITH ROLLUP) is checked against the official MySQL 8.0 manual pages cited inline but was not executed.

---

## 1. Ranking and windowing (RANK/DENSE_RANK/ROW_NUMBER/PERCENT_RANK/CUME_DIST/NTILE, OVER/PARTITION BY, frames, NULL ordering, window-free equivalents, windows vs GROUP BY, MySQL 8 support)

### Takeaway
On ties, **RANK leaves gaps (1,1,3)**, **DENSE_RANK doesn't (1,1,2)**, and **ROW_NUMBER is always 1..n**, breaking ties arbitrarily. PERCENT_RANK = (rank−1)/(n−1). CUME_DIST = (rows before or tied with the current row)/n. NTILE(k) deals rows into k near-equal buckets and can split ties across buckets. Window functions **keep every input row**, unlike GROUP BY. They are evaluated **after WHERE/GROUP BY/HAVING**, so they can't be filtered in WHERE or HAVING; wrap the query in a derived table instead. With an ORDER BY, the default frame is **RANGE UNBOUNDED PRECEDING → CURRENT ROW, including tied rows (peers)**. MySQL has supported all of this since 8.0.2, with exceptions: no `NULLS FIRST/LAST` (NULL counts as the smallest value), no GROUPS frames, and no EXCLUDE.

### Cited Findings

**What the textbook (6e slides, Ch. 5 "Advanced Aggregation Features") says**
- Ranking example: `select ID, rank() over (order by GPA desc) as s_rank from student_grades`. "An extra order by clause is needed to get them in sorted order" (`… order by s_rank`) — [db-book 6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt) (listed on the [official slide index](https://www.db-book.com/db6/slide-dir/index.html)).
- "Ranking may leave gaps: e.g. if 2 students have the same top GPA, both have rank 1, and the next rank is 3. dense_rank does not leave gaps, so next dense rank would be 2" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- "Ranking can be done using basic SQL aggregation, but resultant query is very inefficient": `select ID, (1 + (select count(*) from student_grades B where B.GPA > A.GPA)) as s_rank from student_grades A order by s_rank;` — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- The slides also say:
  - ranking can be done within a partition (`rank() over (partition by dept_name order by GPA desc)`);
  - "Multiple rank clauses can occur in a single select clause";
  - "Ranking is done after applying group by clause/aggregation";
  - it "Can be used to find top-n results. More general than the limit n clause … since it allows top-n within each partition" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- Other ranking functions on the slides:
  - percent_rank;
  - cume_dist;
  - "row_number (non-deterministic in presence of duplicates)";
  - "SQL:1999 permits the user to specify nulls first or nulls last": `rank() over (order by GPA desc nulls last)`;
  - "ntile(n) takes the tuples in each partition in the specified order, and divides them into n buckets with equal numbers of tuples" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- Windowing is "Used to smooth out random variations", e.g. a moving average of sales on the previous day, the same day and the next day. The textbook writes it as `sum(value) over (order by date between rows 1 preceding and 1 following)` and also lists:
  - `rows unbounded preceding`;
  - `range between 10 preceding and current row`;
  - `range interval 10 day preceding` — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt). The 7th-ed slides keep the same "between rows 1 preceding and 1 following" wording — [7e Ch.5 slides PDF](https://www.db-book.com/slides-dir/PDF-dir/ch5.pdf).
- Windowing within partitions computes a running balance: `sum(value) over (partition by account_number order by date_time rows unbounded preceding) as balance from transaction` — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).

**Precise definitions (MySQL 8.0 manual, same semantics in PostgreSQL)**
- `RANK()`: "rank of the current row within its partition, with gaps. Peers are considered ties and receive the same rank." `DENSE_RANK()`: "without gaps … assigns consecutive ranks to peer groups." For both, "Without ORDER BY, all rows are peers." — [MySQL: Window Function Descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html).
- `ROW_NUMBER()`: "ROW_NUMBER() assigns peers different row numbers… Without ORDER BY, row numbering is nondeterministic." — [MySQL: Window Function Descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html).
- `PERCENT_RANK()` = `(rank - 1) / (rows - 1)`, range 0–1. `CUME_DIST()` = "the number of rows preceding or peer with the current row in the window ordering of the window partition divided by the total number of rows in the window partition" — [MySQL: Window Function Descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html). PostgreSQL gives the same: rank = "the row_number of the first row in its peer group"; dense_rank "effectively counts peer groups"; cume_dist ranges "from 1/N to 1" — [PostgreSQL 16: Window Functions](https://www.postgresql.org/docs/16/functions-window.html).
- `NTILE(N)`: "Divides a partition into N groups (buckets), assigns each row in the partition its bucket number…" — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html). PostgreSQL: "dividing the partition as equally as possible" — [PostgreSQL 16](https://www.postgresql.org/docs/16/functions-window.html).
- MySQL's own reference example (column `val` = 1,1,2,3,3,3,4,4,5, `WINDOW w AS (ORDER BY val)`) — [MySQL: Window Function Descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html):

| val | row_number | rank | dense_rank | cume_dist | percent_rank | ntile(2) | ntile(4) |
|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 0.2222 | 0 | 1 | 1 |
| 1 | 2 | 1 | 1 | 0.2222 | 0 | 1 | 1 |
| 2 | 3 | 3 | 2 | 0.3333 | 0.25 | 1 | 1 |
| 3 | 4 | 4 | 3 | 0.6667 | 0.375 | 1 | 2 |
| 3 | 5 | 4 | 3 | 0.6667 | 0.375 | 1 | 2 |
| 3 | 6 | 4 | 3 | 0.6667 | 0.375 | 2 | 3 |
| 4 | 7 | 7 | 4 | 0.8889 | 0.75 | 2 | 3 |
| 4 | 8 | 7 | 4 | 0.8889 | 0.75 | 2 | 4 |
| 5 | 9 | 9 | 5 | 1 | 1 | 2 | 4 |

**OVER / PARTITION BY / ORDER BY / named windows (MySQL 8)**
- Syntax is `over_clause: {OVER (window_spec) | OVER window_name}`, where `window_spec: [window_name] [partition_clause] [order_clause] [frame_clause]`. "If OVER() is empty, the window consists of all query rows." If PARTITION BY is omitted there is a single partition — [MySQL: Window Function Concepts and Syntax](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).
- **Evaluation order:** "Window functions are permitted only in the select list and ORDER BY clause. Query result rows are determined from the FROM clause, after WHERE, GROUP BY, and HAVING processing, and windowing execution occurs before ORDER BY, LIMIT, and SELECT DISTINCT." — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).
- "An ORDER BY in a window definition applies within individual partitions. To sort the result set as a whole, include an ORDER BY at the query top level." — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).
- In MySQL, "NULL values sort first for ascending sorts, last for descending sorts" (in window ORDER BY too) — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).
- MySQL extension: "Standard SQL requires PARTITION BY to be followed by column names only. A MySQL extension is to permit expressions" (e.g. `PARTITION BY HOUR(ts)`) — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).
- Aggregates that become window functions when followed by OVER: AVG, BIT_AND/OR/XOR, COUNT, JSON_ARRAYAGG, JSON_OBJECTAGG, MAX, MIN, STDDEV*, SUM, VAR*. The window-only functions, for which OVER is mandatory: CUME_DIST, DENSE_RANK, FIRST_VALUE, LAG, LAST_VALUE, LEAD, NTH_VALUE, NTILE, PERCENT_RANK, RANK, ROW_NUMBER — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).
- **Named windows:** `WINDOW w AS (…)` "falls between the positions of the HAVING and ORDER BY clauses". `OVER (w ORDER BY …)` may *add* properties to a named window but may not redefine one it already has (e.g. a second PARTITION BY is an error) — [MySQL: Named Windows](https://dev.mysql.com/doc/refman/8.0/en/window-functions-named-windows.html).

**Window frames**
- `frame_units: {ROWS | RANGE}`. `frame_extent: {frame_start | BETWEEN frame_start AND frame_end}`. Each bound is one of `CURRENT ROW | UNBOUNDED PRECEDING | UNBOUNDED FOLLOWING | expr PRECEDING | expr FOLLOWING` — [MySQL: Frame Specification](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).
- ROWS offsets count **rows**. RANGE offsets are **value differences** — "For RANGE, the bound is the peers of the current row" for CURRENT ROW. MySQL allows temporal offsets, e.g. `INTERVAL 5 DAY PRECEDING`, and "RANGE on a numeric or temporal expr requires ORDER BY on a numeric or temporal expression" — [MySQL: Frame Specification](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).
- **Default frame:**
  - with ORDER BY: `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which "includ[es] all peers of the current row";
  - without ORDER BY: the whole partition.
  - "adding ORDER BY to a query to get deterministic results may change the results (For example, the values produced by SUM() might change.)"
  - [MySQL: Frame Specification](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html). PostgreSQL has the same default: "RANGE UNBOUNDED PRECEDING … up through the current row's last ORDER BY peer" — [PostgreSQL 16: Window Function Calls](https://www.postgresql.org/docs/16/sql-expressions.html).
- Frames apply to aggregate window functions and FIRST_VALUE/LAST_VALUE/NTH_VALUE. RANK, DENSE_RANK, ROW_NUMBER, NTILE, PERCENT_RANK, CUME_DIST, LAG and LEAD always use the entire partition: "MySQL permits a frame clause for such functions but ignores it." — [MySQL: Frame Specification](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).
- PostgreSQL also has `GROUPS` frames (offsets counted in peer groups) and `EXCLUDE CURRENT ROW | GROUP | TIES | NO OTHERS` — [PostgreSQL 16: Window Function Calls](https://www.postgresql.org/docs/16/sql-expressions.html).

**MySQL 8.0 support details and restrictions**
- Window functions arrived in **MySQL 8.0.2**: "MySQL now supports window functions… such as RANK(), LAG(), and NTILE(). In addition, most existing aggregate functions now can be used as window functions" — [MySQL 8.0.2 release notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-2.html). CUME_DIST, DENSE_RANK, NTILE, OVER, PERCENT_RANK, RANK, ROW_NUMBER, WINDOW and GROUPS all became **reserved words in 8.0.2** — [MySQL 8.0 Keywords](https://dev.mysql.com/doc/refman/8.0/en/keywords.html). That is why MySQL's own examples quote aliases, as in `AS 'rank'` — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html).
- Not supported in MySQL:
  - DISTINCT in aggregate window functions;
  - nested window functions;
  - dynamic frame endpoints.
- "Parsed, but produces an error" in MySQL:
  - `GROUPS` frame units ("Only ROWS and RANGE are supported");
  - `EXCLUDE`;
  - `IGNORE NULLS`;
  - `FROM LAST`.
- As of 8.0.28 a SELECT may use at most 127 windows. Window functions cannot be used in UPDATE/DELETE to update rows, but they may appear in a subquery there.
- Source for the three points above: [MySQL: Window Function Restrictions](https://dev.mysql.com/doc/refman/8.0/en/window-function-restrictions.html).
- LAG/LEAD: `LAG(expr [, N[, default]])`, defaults N=1 and default=NULL. "Beginning with MySQL 8.0.22, N cannot be NULL" and must be a non-negative integer — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html).

**NULL ordering (NULLS FIRST/LAST)**
- "SQL:2003 introduced the order by modifier nulls (first|last)". "The SQL standard leaves the sorting of null values relative to non-null values up to the vendors". MySQL/MariaDB have **no support** for the modifier and sort NULL "as smallest". The portable workaround is `ORDER BY CASE WHEN c IS NULL THEN 0 ELSE 1 END, c`, which gives NULLS FIRST — [modern-sql.com: NULL](https://modern-sql.com/concept/null).
- MySQL: "When doing an ORDER BY, NULL values are presented first if you do ORDER BY ... ASC and last if you do ORDER BY ... DESC" — [MySQL: Working with NULL Values](https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html). The MySQL 8.0 SELECT grammar is only `ORDER BY {col_name | expr | position} [ASC | DESC]`, with no NULLS clause — [MySQL: SELECT Statement](https://dev.mysql.com/doc/refman/8.0/en/select.html).
- PostgreSQL defaults to the opposite: "NULLS LAST when ASC is specified or implied, and NULLS FIRST when DESC is specified (thus, the default is to act as though nulls are larger than non-nulls)" — [PostgreSQL 16: SELECT](https://www.postgresql.org/docs/16/sql-select.html).

**Window functions vs GROUP BY**
- "whereas an aggregate operation groups query rows into a single result row, a window function produces a result for each query row". Example: `SUM(profit) OVER()` (grand total on every row) and `SUM(profit) OVER(PARTITION BY country)` (country total on every row), versus `GROUP BY country`, which returns 3 rows — [MySQL: Window Function Concepts](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).

#### Worked example W1 — all ranking functions on one table with ties (verified)
Input `student_grades(id, name, dept, gpa)`: S1 Ann CS 3.9 · S2 Bob CS 3.7 · S3 Cat CS 3.9 · S4 Dan Math 3.5 · S5 Eve Math 3.7 · S6 Fay Math 3.7 · S7 Gus CS 3.2
```sql
SELECT id, name, gpa,
  ROW_NUMBER()   OVER (ORDER BY gpa DESC, id) AS row_num,  -- id = tie-breaker → deterministic
  RANK()         OVER (ORDER BY gpa DESC)     AS rnk,      -- don't alias as `rank` in MySQL 8 (reserved word)
  DENSE_RANK()   OVER (ORDER BY gpa DESC)     AS drnk,
  PERCENT_RANK() OVER (ORDER BY gpa DESC)     AS pct_rank,
  CUME_DIST()    OVER (ORDER BY gpa DESC)     AS cume,
  NTILE(3)       OVER (ORDER BY gpa DESC, id) AS ntile3
FROM student_grades
ORDER BY gpa DESC, id;
```
| id | name | gpa | row_num | rnk | drnk | pct_rank | cume | ntile3 |
|---|---|---|---|---|---|---|---|---|
| S1 | Ann | 3.9 | 1 | 1 | 1 | 0.0000 | 0.2857 (2/7) | 1 |
| S3 | Cat | 3.9 | 2 | 1 | 1 | 0.0000 | 0.2857 | 1 |
| S2 | Bob | 3.7 | 3 | 3 | 2 | 0.3333 (2/6) | 0.7143 (5/7) | 1 |
| S5 | Eve | 3.7 | 4 | 3 | 2 | 0.3333 | 0.7143 | 2 |
| S6 | Fay | 3.7 | 5 | 3 | 2 | 0.3333 | 0.7143 | 2 |
| S4 | Dan | 3.5 | 6 | 6 | 3 | 0.8333 (5/6) | 0.8571 (6/7) | 3 |
| S7 | Gus | 3.2 | 7 | 7 | 4 | 1.0000 | 1.0000 | 3 |

Things to notice:
- NTILE(3) on 7 rows gives buckets of 3, 2 and 2, and it **splits the 3.7 ties** across buckets 1 and 2.
- RANK jumps 1 → 3 → 6 → 7: the rank is 1 + the number of rows strictly ahead.

#### Worked example W2 — PARTITION BY dept (verified)
```sql
SELECT dept, name, gpa,
  RANK()       OVER (PARTITION BY dept ORDER BY gpa DESC)     AS dept_rank,
  DENSE_RANK() OVER (PARTITION BY dept ORDER BY gpa DESC)     AS dept_drank,
  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY gpa DESC, id) AS dept_rn
FROM student_grades ORDER BY dept, dept_rn;
```
| dept | name | gpa | dept_rank | dept_drank | dept_rn |
|---|---|---|---|---|---|
| CS | Ann | 3.9 | 1 | 1 | 1 |
| CS | Cat | 3.9 | 1 | 1 | 2 |
| CS | Bob | 3.7 | 3 | 2 | 3 |
| CS | Gus | 3.2 | 4 | 3 | 4 |
| Math | Eve | 3.7 | 1 | 1 | 1 |
| Math | Fay | 3.7 | 1 | 1 | 2 |
| Math | Dan | 3.5 | 3 | 2 | 3 |

#### Worked example W3 — "Top-2 per department" depends on the function (verified)
```sql
-- MySQL 8 / standard: filter in an OUTER query (window functions are illegal in WHERE)
SELECT dept, name, gpa
FROM (SELECT dept, name, gpa,
             RANK() OVER (PARTITION BY dept ORDER BY gpa DESC) AS r
      FROM student_grades) AS ranked
WHERE r <= 2;
```
| filter used | CS result | Math result |
|---|---|---|
| `RANK() … <= 2` | Ann, Cat | Eve, Fay |
| `DENSE_RANK() … <= 2` | Ann, Cat, **Bob** | Eve, Fay, **Dan** |
| `ROW_NUMBER() … <= 2` | Ann, Cat (always exactly 2) | Eve, Fay |

Writing `WHERE RANK() OVER (…) <= 2` directly fails. PostgreSQL's error is "window functions are not allowed in WHERE" (verified). MySQL allows window functions only in the SELECT list and ORDER BY — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html).

#### Worked example W4 — Window-free equivalents (correlated subqueries) (verified identical)
```sql
SELECT a.id, a.gpa,
  1 + (SELECT COUNT(*)            FROM student_grades b WHERE b.gpa > a.gpa) AS rank_eq,       -- = RANK()
  1 + (SELECT COUNT(DISTINCT b.gpa) FROM student_grades b WHERE b.gpa > a.gpa) AS dense_eq,    -- = DENSE_RANK()
  (SELECT COUNT(*) FROM student_grades b
    WHERE b.gpa > a.gpa OR (b.gpa = a.gpa AND b.id <= a.id))                AS rownum_eq,      -- = ROW_NUMBER() OVER (ORDER BY gpa DESC, id)
  1 + (SELECT COUNT(*) FROM student_grades b
        WHERE b.dept = a.dept AND b.gpa > a.gpa)                             AS dept_rank_eq   -- = RANK() OVER (PARTITION BY dept …)
FROM student_grades a
ORDER BY a.gpa DESC, a.id;
```
Results:
- rank_eq = 1,1,3,3,3,6,7 and dense_eq = 1,1,2,2,2,3,4, which match RANK and DENSE_RANK exactly.
- rownum_eq = 1..7.
- CUME_DIST can also be written this way: `(SELECT COUNT(*) FROM t b WHERE b.gpa >= a.gpa) / (SELECT COUNT(*) FROM t)`.

The textbook calls this formulation "very inefficient" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt). Each row runs its own subquery, so the cost is quadratic in the worst case.

#### Worked example W5 — window vs GROUP BY, and windows over aggregates (verified)
```sql
SELECT dept, COUNT(*) n, AVG(gpa) avg_gpa FROM student_grades GROUP BY dept;        -- 2 rows: CS 4 3.675 | Math 3 3.6333
SELECT name, dept, gpa, AVG(gpa) OVER (PARTITION BY dept) AS dept_avg,
       gpa - AVG(gpa) OVER (PARTITION BY dept) AS diff FROM student_grades;          -- 7 rows (one per student)
SELECT dept, AVG(gpa) AS avg_gpa,
       RANK() OVER (ORDER BY AVG(gpa) DESC) AS r                                       -- window over an aggregate:
FROM student_grades GROUP BY dept;                                                     -- CS 3.675 r=1 | Math 3.6333 r=2
```
The windowed version keeps every row, e.g. Ann CS 3.9, dept_avg 3.6750, diff +0.2250 and Gus CS 3.2, 3.6750, −0.4750. The third query works because "Ranking is done after applying group by clause/aggregation" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).

#### Worked example W6 — frames: running total, moving averages (ROWS vs RANGE), LAG, LAST_VALUE trap (verified)
Input `sales(day, amount)`: 10-01 10 · 10-02 20 · 10-03 30 · **(no 10-04)** · 10-05 40 · 10-06 50
```sql
SELECT day, amount,
  SUM(amount) OVER (ORDER BY day ROWS UNBOUNDED PRECEDING)                    AS running_total,
  AVG(amount) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)    AS mov_avg_rows,
  AVG(amount) OVER (ORDER BY day RANGE BETWEEN INTERVAL 1 DAY PRECEDING
                                     AND INTERVAL 1 DAY FOLLOWING)            AS mov_avg_range, -- MySQL syntax; PostgreSQL: INTERVAL '1 day'
  AVG(amount) OVER (ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)    AS trailing3,
  amount - LAG(amount) OVER (ORDER BY day)                                    AS change,
  LAST_VALUE(amount) OVER (ORDER BY day)                                      AS last_default,
  LAST_VALUE(amount) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING
                                           AND UNBOUNDED FOLLOWING)           AS last_full
FROM sales ORDER BY day;
```
| day | amount | running_total | mov_avg_rows | mov_avg_range | trailing3 | change | last_default | last_full |
|---|---|---|---|---|---|---|---|---|
| 10-01 | 10 | 10 | 15 | 15 | 10 | NULL | 10 | 50 |
| 10-02 | 20 | 30 | 20 | 20 | 15 | 10 | 20 | 50 |
| 10-03 | 30 | 60 | **30** | **25** | 20 | 10 | 30 | 50 |
| 10-05 | 40 | 100 | **40** | **45** | 30 | 10 | 40 | 50 |
| 10-06 | 50 | 150 | 45 | 45 | 40 | 10 | 50 | 50 |

Why the columns differ:
- **ROWS vs RANGE.** ROWS uses neighbouring *rows*: for 10-03 that is 20, 30, 40 (avg 30). RANGE uses neighbouring *values*: for 10-03 it takes the days 10-02 to 10-04, so only 20 and 30 (avg 25).
- **Edge rows.** At the first and last row, AVG averages "the rows that are available" — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).
- **last_default.** It returns the current row because the default frame ends at the CURRENT ROW (and its peers).

#### Worked example W7 — the default-frame trap with duplicate ORDER BY keys (verified)
Input `t(k, v)`: (1,10) (2,20) (2,30) (3,40)
```sql
SELECT k, v,
  SUM(v) OVER (ORDER BY k)                          AS default_frame,  -- RANGE … CURRENT ROW (peers included)
  SUM(v) OVER (ORDER BY k, v ROWS UNBOUNDED PRECEDING) AS rows_frame,
  SUM(v) OVER ()                                    AS empty_over
FROM t;
```
| k | v | default_frame | rows_frame | empty_over |
|---|---|---|---|---|
| 1 | 10 | 10 | 10 | 100 |
| 2 | 20 | **60** | 30 | 100 |
| 2 | 30 | **60** | 60 | 100 |
| 3 | 40 | 100 | 100 | 100 |

#### Worked example W8 — the textbook's running account balance (verified)
`transaction`: A-101 (10-01 +500, 10-03 −200, 10-07 +100), A-215 (10-02 +1000, 10-05 −300)
```sql
SELECT account_number, date_time, value,
       SUM(value) OVER (PARTITION BY account_number ORDER BY date_time ROWS UNBOUNDED PRECEDING) AS balance
FROM transaction ORDER BY account_number, date_time;
```
→ balances A-101: 500, 300, 400 · A-215: 1000, 700

#### Worked example W9 — NULL ordering changes ranks: MySQL vs PostgreSQL (verified; MySQL behavior reproduced in SQLite, which also sorts NULL as smallest per [modern-sql.com](https://modern-sql.com/concept/null))
Input `scores`: A 90 · B NULL · C 75 · D 90
| query | MySQL (NULL = smallest) | PostgreSQL (NULL = largest) |
|---|---|---|
| `ORDER BY score ASC` | NULL, 75, 90, 90 | 75, 90, 90, NULL |
| `ORDER BY score DESC` | 90, 90, 75, NULL | NULL, 90, 90, 75 |
| `RANK() OVER (ORDER BY score DESC)` | A 1, D 1, C 3, **B 4** | **B 1**, A 2, D 2, C 4 |
| `… DESC NULLS LAST` (standard) | *syntax error in MySQL* | A 1, D 1, C 3, B 4 |
| MySQL emulation of ASC NULLS LAST: `ORDER BY score IS NULL, score` | 75, 90, 90, NULL | (same) |
| MySQL emulation of DESC NULLS FIRST: `ORDER BY score IS NULL DESC, score DESC` | NULL, 90, 90, 75 | (same) |

#### Textbook/standard → MySQL 8 translation (windowing)
| Textbook / standard SQL | MySQL 8.0 |
|---|---|
| `rank() over (order by GPA desc nulls last)` | `RANK() OVER (ORDER BY GPA DESC)` (DESC already puts NULL last); for ASC use `ORDER BY GPA IS NULL, GPA` |
| `over (order by date between rows 1 preceding and 1 following)` (slide wording) | `OVER (ORDER BY date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)` — frame units come first per the [grammar](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html) |
| `between rows unbounded preceding and current` | `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` (or `ROWS UNBOUNDED PRECEDING`) |
| `range interval 10 day preceding` | `RANGE INTERVAL 10 DAY PRECEDING` (temporal ORDER BY required) |
| `GROUPS`, `EXCLUDE …`, `IGNORE NULLS`, `FROM LAST` | parsed but error ([restrictions](https://dev.mysql.com/doc/refman/8.0/en/window-function-restrictions.html)) |

### Inferences
- **Most testable points:** given that windowing is core for week 7, expect
  - "predict RANK vs DENSE_RANK vs ROW_NUMBER on a tied column";
  - "write top-N per group" (derived table + RANK/DENSE_RANK/ROW_NUMBER);
  - "rewrite rank without window functions" (1 + COUNT of strictly greater values; COUNT(DISTINCT …) for dense rank);
  - "compute a moving average / running total" by hand;
  - "explain window vs GROUP BY".
- **Quick formulas:**
  - RANK(x) = 1 + #rows strictly ahead of x;
  - DENSE_RANK(x) = 1 + #distinct values strictly ahead;
  - PERCENT_RANK = (RANK−1)/(n−1);
  - CUME_DIST = #rows ahead-or-tied / n;
  - NTILE(k) on n rows: the first (n mod k) buckets get ⌈n/k⌉ rows and the rest get ⌊n/k⌋. This matches both verified cases: 7 rows/3 → 3,2,2 and 9 rows/4 → 3,2,2,2.
- **Common mistakes:**
  1. Putting a window function (or its alias) in WHERE/HAVING.
  2. Forgetting the outer ORDER BY.
  3. RANK with no ORDER BY inside OVER (everything ties at 1).
  4. Default RANGE frame + duplicate keys (W7).
  5. LAST_VALUE with the default frame (W6).
  6. ROW_NUMBER without a tie-breaker (non-deterministic).
  7. Assuming NTILE respects ties.
  8. Copying the slide's "between rows …" order literally.
  9. Writing `NULLS LAST` in MySQL.
  10. Aliasing a column `rank` in MySQL 8 (reserved).
- Because MySQL ignores frame clauses on ranking functions, adding `ROWS …` to RANK() never changes its output. It matters only for aggregates and FIRST/LAST/NTH_VALUE.

### Gaps
- No MySQL server was available, so MySQL outputs are inferred from the manual and from engines with identical semantics (PostgreSQL for the functions, SQLite for NULL-as-smallest ordering). The inline MySQL examples copied from the manual are MySQL's own outputs.
- The full 6th-ed. textbook text (e.g. exact §5.5 subsection numbering) was not consulted; only the official slides, TOC and practice solutions were used, to avoid unofficial copies.

---

## 2. Advanced aggregation: ROLLUP / CUBE / GROUPING SETS (MySQL WITH ROLLUP, GROUPING(), no CUBE)

### Takeaway
- `ROLLUP(a,b,c)` produces the grouping sets for all prefixes — (a,b,c), (a,b), (a), () — so **n+1 sets**.
- `CUBE(a,b,c)` produces all subsets: **2ⁿ = 8 sets**. `GROUPING SETS (…)` lists the sets explicitly.
- A rolled-up column shows NULL, meaning "all". `GROUPING(col)` = 1 tells that super-aggregate NULL apart from a real NULL.
- MySQL 8 supports only `GROUP BY a, b WITH ROLLUP` plus `GROUPING()` (8.0.1+). ORDER BY with ROLLUP is allowed from 8.0.12.
- MySQL has **no CUBE and no GROUPING SETS**; CUBE is merely a reserved word. Emulate them with `UNION ALL`.

### Cited Findings
- Textbook:
  - "The cube operation computes union of group by's on every subset of the specified attributes": `group by cube(item_name, color, size)` = union of 8 groupings {(item_name,color,size),(item_name,color),(item_name,size),(color,size),(item_name),(color),(size),()}. "For each grouping, the result contains the null value for attributes not present in the grouping."
  - "The rollup construct generates union on every prefix": `rollup(item_name,color,size)` → {(item_name,color,size),(item_name,color),(item_name),()}.
  - Rollup "can be used to generate aggregates at multiple levels of a hierarchy" (e.g. `rollup(category, item_name)`).
  - "Multiple rollups and cubes can be used in a single group by clause… cross product": `rollup(item_name), rollup(color,size)` → {item_name, ()} × {(color,size),(color),()}.
  - Source: [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- Textbook on GROUPING(): "The function grouping() … Returns 1 if the value is a null value representing all, and returns 0 in all other cases". `decode(grouping(item_name), 1, 'all', item_name)` replaces the NULLs. "The SQL standard actually uses null values in place of all despite confusion with regular null values." — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt). Note that `decode` is Oracle-specific; MySQL uses `IF()`/`CASE` (see below).
- Standard expansions:
  - `ROLLUP(e1,e2,e3)` = `GROUPING SETS((e1,e2,e3),(e1,e2),(e1),())`;
  - `CUBE(a,b,c)` = the power set (8 sets);
  - `CUBE((a,b),(c,d))` treats each sublist as one unit (4 sets);
  - multiple grouping items in one GROUP BY are combined by cross product.
  - Source: [PostgreSQL 16: GROUPING SETS, CUBE, and ROLLUP](https://www.postgresql.org/docs/16/queries-table-expressions.html).
- **MySQL grammar:** `[GROUP BY {col_name | expr | position}, ... [WITH ROLLUP]]`. It has no CUBE, no GROUPING SETS and no `ROLLUP(...)` function form — [MySQL 8.0: SELECT](https://dev.mysql.com/doc/refman/8.0/en/select.html). CUBE is listed as "(R); became reserved in 8.0.1" and GROUPING as "(R); added in 8.0.1" — [MySQL 8.0 Keywords](https://dev.mysql.com/doc/refman/8.0/en/keywords.html). The 8.4 and 9.5 "GROUP BY Modifiers" pages still describe only WITH ROLLUP; a text search for "CUBE" and "GROUPING SETS" on them found nothing (checked 2026-10-19) — [MySQL 8.4 GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.4/en/group-by-modifiers.html).
- **MySQL WITH ROLLUP semantics:**
  - "each time there is a change in value in any but the last grouping column, the query produces an extra super-aggregate summary row".
  - The NULLs in super-aggregate rows are added "at such a late stage" that "you cannot test them as NULL values in join conditions or the WHERE clause… you cannot add WHERE product IS NULL… to eliminate… all but the super-aggregate rows". Test them in the select list or HAVING instead.
  - Source: [MySQL: GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html).
- MySQL GROUPING():
  - It "is permitted in the select list, HAVING clause, and (as of MySQL 8.0.12) ORDER BY clause".
  - Each argument "must be an expression that exactly matches an expression in the GROUP BY clause".
  - With several arguments it returns a **bitmask**, rightmost argument = lowest bit, so `GROUPING(year,country,product)` = g(product) + g(country)<<1 + g(year)<<2.
  - Sources: [MySQL: Miscellaneous Functions](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html); [MySQL: GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html).
- MySQL labels: `IF(GROUPING(year), 'All years', year)`. To return only super-aggregate rows: `HAVING GROUPING(year, country, product) <> 0` — [MySQL: GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html).
- MySQL version notes:
  - "Previously, MySQL did not allow the use of DISTINCT or ORDER BY in a query having a WITH ROLLUP option. This restriction is lifted in MySQL 8.0.12". Before that, the workaround was to put the ROLLUP query in a derived table and ORDER BY outside.
  - "LIMIT is applied after ROLLUP".
  - A non-aggregated column not in GROUP BY gets a nondeterministic value in rollup rows, and is rejected under ONLY_FULL_GROUP_BY unless wrapped in `ANY_VALUE()`.
  - Source: [MySQL: GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html).
- MySQL's own example (`sales(year, country, product, profit)`, `GROUP BY year, country, product WITH ROLLUP`): 10 detail rows + 5 (year,country) subtotals + 2 year subtotals + 1 grand total = 18 rows. Examples: `2000 Finland NULL 1600`, `2000 NULL NULL 4525`, `NULL NULL NULL 7535` — [MySQL: GROUP BY Modifiers](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html).
- Data NULL vs super-aggregate NULL: with `t1(name,size,quantity)` containing size = NULL rows, `WITH ROLLUP` shows two `ball | NULL` rows (5 = real NULL size, 35 = subtotal). `GROUPING(size)` is 0 and 1 respectively — [MySQL: Miscellaneous Functions](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html).
- Practice exercises with official solutions:
  - 5.9: "express group by cube(a,b,c,d) using rollup" → `group by rollup(a), rollup(b), rollup(c), rollup(d)`;
  - 5.11: compute the cube without CUBE, using a `union` of GROUP BYs with `'all'` placeholders.
  - Source: [db-book 6e Practice Exercise Solutions, Ch.5](https://www.db-book.com/db6/practice-exer-dir/5s.pdf).

#### Worked example R1 — ROLLUP, CUBE, GROUPING SETS on one small table (verified)
Input `sales2(item, color, qty)`: skirt dark 8 · skirt white 10 · dress dark 20 · dress white 5

**ROLLUP** — standard `GROUP BY ROLLUP(item, color)` = MySQL `GROUP BY item, color WITH ROLLUP` (3 grouping sets → 7 rows)
| item | color | total | GROUPING(item) | GROUPING(color) | GROUPING(item,color) |
|---|---|---|---|---|---|
| skirt | dark | 8 | 0 | 0 | 0 |
| skirt | white | 10 | 0 | 0 | 0 |
| skirt | NULL | 18 | 0 | 1 | 1 |
| dress | dark | 20 | 0 | 0 | 0 |
| dress | white | 5 | 0 | 0 | 0 |
| dress | NULL | 25 | 0 | 1 | 1 |
| NULL | NULL | 43 | 1 | 1 | 3 |

**CUBE(item, color)** (4 grouping sets → 9 rows) = the 7 ROLLUP rows **plus** `NULL dark 28` and `NULL white 15` (GROUPING bitmask = 2).

**GROUPING SETS ((item), (color))** → 4 rows: dress NULL 25 · skirt NULL 18 · NULL dark 28 · NULL white 15 (no detail rows, no grand total).

**MySQL 8 versions:**
```sql
-- ROLLUP with readable labels (MySQL ≥ 8.0.1 for GROUPING; ORDER BY allowed ≥ 8.0.12)
SELECT IF(GROUPING(item),  'All items',  item)  AS item,
       IF(GROUPING(color), 'All colors', color) AS color,
       SUM(qty) AS total
FROM sales2
GROUP BY item, color WITH ROLLUP;

-- CUBE emulation (MySQL has no CUBE): ROLLUP + the missing (color) grouping
SELECT item, color, SUM(qty) AS total FROM sales2 GROUP BY item, color WITH ROLLUP
UNION ALL
SELECT NULL, color, SUM(qty) FROM sales2 GROUP BY color;

-- GROUPING SETS ((item),(color)) emulation
SELECT item, NULL AS color, SUM(qty) FROM sales2 GROUP BY item
UNION ALL
SELECT NULL, color, SUM(qty) FROM sales2 GROUP BY color;
```
The ROLLUP + UNION ALL emulation was checked against real `CUBE(item,color)` with `EXCEPT ALL` in both directions: 0 differing rows. Counting the grouping sets gave CUBE(a,b,c) = 8, ROLLUP(a,b,c) = 4, ROLLUP(a), ROLLUP(b,c) = 6, and CUBE(a,b,c,d) = 16, the same as ROLLUP(a), ROLLUP(b), ROLLUP(c), ROLLUP(d) (identical results).

### Inferences
- **Counting rule for exams:**
  - ROLLUP over n columns gives n+1 grouping sets; CUBE over n columns gives 2ⁿ.
  - A GROUP BY with several items takes the **product** of their set counts: ROLLUP(a) has 2 sets and ROLLUP(b,c) has 3, so together 2×3 = 6.
  - CUBE(a,b,c,d) = ROLLUP(a), ROLLUP(b), ROLLUP(c), ROLLUP(d), because 2×2×2×2 = 16.
- **Output rows ≠ grouping sets.** For the row count, sum over the sets the number of distinct groups in each. Example: CUBE(item,color) has 4 + 2 + 2 + 1 = 9 rows.
- **ROLLUP order matters, CUBE order doesn't.** `ROLLUP(item,color)` ≠ `ROLLUP(color,item)`: the first gives per-item subtotals, the second per-color subtotals. CUBE is symmetric.
- **Common mistakes in MySQL:**
  - writing standard `GROUP BY ROLLUP(a,b)` or `CUBE(...)` (MySQL needs `WITH ROLLUP` and has no CUBE);
  - filtering subtotal rows with `WHERE col IS NULL` (use `HAVING GROUPING(col) = 1`);
  - mistaking a data NULL for an "all" NULL (use GROUPING()).

### Gaps
- No MySQL server, so the MySQL ROLLUP outputs come from the manual's examples plus the standard-SQL equivalence verified in PostgreSQL. MySQL's output row order without ORDER BY was not tested.

---

## 3. Integrity constraints (Ch. 4.4): NOT NULL, UNIQUE, CHECK, FOREIGN KEY actions, naming, deferred checking, assertions, complex CHECKs — standard vs MySQL/InnoDB

### Takeaway
- Single-table constraints (NOT NULL, UNIQUE, PRIMARY KEY, CHECK) and FOREIGN KEY with ON DELETE/UPDATE CASCADE / SET NULL / RESTRICT / NO ACTION are what the exam tests.
- MySQL specifics:
  - **CHECK is enforced only from 8.0.16**; earlier versions parsed and ignored it.
  - A CHECK that evaluates to UNKNOWN (NULL) **passes**.
  - UNIQUE allows many NULLs.
  - InnoDB checks FKs **immediately, row by row**, so NO ACTION = RESTRICT and there is no deferred checking.
  - SET DEFAULT is rejected.
  - **Cascaded FK actions don't fire triggers.**
  - Before MySQL 9.7, **inline `col … REFERENCES t` is silently ignored**.
  - CHECK may not contain subqueries, and CREATE ASSERTION doesn't exist.
- CREATE ASSERTION is in the standard but is unsupported by MySQL and PostgreSQL. Oracle 26ai is a recent exception.

### Cited Findings

**Textbook framing (6e Ch.4 slides)**
- "Integrity constraints guard against accidental damage to the database, by ensuring that authorized changes to the database do not result in a loss of data consistency" (e.g. "A customer must have a (non-null) phone number"). The single-relation constraints are `not null`, `primary key`, `unique`, `check (P)` — [db-book 6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt).
- "The unique specification states that the attributes A1, A2, … Am form a candidate key. Candidate keys are permitted to be null (in contrast to primary keys)." The CHECK example is `check (semester in ('Fall','Winter','Spring','Summer'))` — [6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt).
- Referential integrity: "A is said to be a foreign key of R if for any values of A appearing in R these values also appear in S". Cascading actions are `on delete cascade` and `on update cascade`, and the "alternative actions to cascade" are `set null, set default` — [6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt).
- "Integrity Constraint Violation During Transactions": `person(ID, name, mother, father)` with FKs to `person`. Three ways to insert it:
  1. insert the parents first;
  2. "set father and mother to null initially, update after inserting all persons (not possible if father and mother attributes declared to be not null)";
  3. "defer constraint checking".
  - Source: [6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt).
- "Complex Check Clauses":
  - the example is `check (time_slot_id in (select time_slot_id from time_slot))`, with the slide asking "why not use a foreign key here?";
  - "Every section has at least one instructor teaching the section";
  - "Unfortunately: subquery in check clause not supported by pretty much any database. Alternative: triggers (later)";
  - "`create assertion <assertion-name> check <predicate>;` Also not supported by anyone".
  - Source: [6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt).
- The textbook's official MySQL DDL for the university schema contains these constraints — [db-book DDL-MySQL.sql](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql):
  - **CHECKs:** `budget > 0`, `credits > 0`, `salary > 29000`, `semester in ('Fall','Winter','Spring','Summer')`, `year > 1701 and year < 2100`, `tot_cred >= 0`, and the hour/minute ranges in time_slot.
  - **FK actions:**
    - course/instructor/student.dept_name → department: **ON DELETE SET NULL**;
    - section.course_id → course: **CASCADE**;
    - section(building, room_number) → classroom: **SET NULL**;
    - teaches → section: **CASCADE**; teaches.ID → instructor: **CASCADE**;
    - takes → section: **CASCADE**; takes.ID → student: **CASCADE**;
    - advisor.i_ID → instructor: **SET NULL**; advisor.s_ID → student: **CASCADE**;
    - prereq.course_id → course: **CASCADE**; prereq.prereq_id → course: **no action specified**.
  - **time_slot:** `time_slot`'s primary key is `(time_slot_id, day, start_hr, start_min)`, so `section.time_slot_id` has no FK.

**CHECK in MySQL**
- "Prior to MySQL 8.0.16, CREATE TABLE permits only the following limited version of table CHECK constraint syntax, which is parsed and ignored". From 8.0.16 the syntax is `[CONSTRAINT [symbol]] CHECK (expr) [[NOT] ENFORCED]` "for all storage engines" — [MySQL: CHECK Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html). The 8.0.16 release notes confirm: "Previously, MySQL permitted a limited form of CHECK constraint syntax, but parsed and ignored it. MySQL now implements the core features of table and column CHECK constraints" — [MySQL 8.0.16 release notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-16.html).
- **NULL semantics:** expr "must evaluate to TRUE or UNKNOWN (for NULL values)… If the condition evaluates to FALSE, it fails" — [MySQL: CHECK Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html).
- Naming:
  - unnamed checks get generated names `t1_chk_1`, `t1_chk_2`, …;
  - "In MySQL, each constraint type has its own namespace per schema", whereas "The SQL standard specifies that all types of constraints… belong to the same namespace";
  - a column constraint may refer only to its own column, while a table constraint may refer to several columns.
  - Source: [MySQL: CHECK Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html).
- Disallowed inside a MySQL CHECK:
  - **subqueries**;
  - stored or loadable functions;
  - variables;
  - nondeterministic functions such as `NOW()` and `CURRENT_USER()`;
  - AUTO_INCREMENT columns;
  - "columns in other tables".
- Also, "Foreign key referential actions (ON UPDATE, ON DELETE) are prohibited on columns used in CHECK constraints", and vice versa.
- With `INSERT IGNORE` / `UPDATE IGNORE`, a violated CHECK produces a warning and the row is skipped.
- Source for the three points above: [MySQL: CHECK Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html).
- Dropping or disabling a check: `ALTER TABLE … DROP CHECK symbol` / `ALTER CHECK symbol [NOT] ENFORCED`, and as of 8.0.19 also `DROP CONSTRAINT symbol` / `ALTER CONSTRAINT symbol [NOT] ENFORCED` — [MySQL: ALTER TABLE](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html).

**UNIQUE / NOT NULL**
- MySQL: "A UNIQUE index permits multiple NULL values for columns that can contain NULL" — [MySQL: CREATE INDEX](https://dev.mysql.com/doc/refman/8.0/en/create-index.html).

**FOREIGN KEY in MySQL/InnoDB**
- Syntax: `[CONSTRAINT [symbol]] FOREIGN KEY [index_name] (col,...) REFERENCES tbl (col,...) [ON DELETE opt] [ON UPDATE opt]` with `opt = RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT`. An unnamed FK gets a generated name such as `child_ibfk_1`, and you drop it with `ALTER TABLE child DROP FOREIGN KEY child_ibfk_1` — [MySQL: FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html).
- Referential actions — [MySQL: FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html):
  - **CASCADE** deletes or updates the matching child rows.
  - **SET NULL** sets the FK to NULL ("make sure that you have not declared the columns in the child table as NOT NULL").
  - **RESTRICT** rejects the parent operation.
  - **NO ACTION** is "For InnoDB… equivalent to RESTRICT; the delete or update operation for the parent table is immediately rejected".
  - **SET DEFAULT** is "recognized by the MySQL parser, but both InnoDB and NDB reject table definitions containing" it.
  - "For an ON DELETE or ON UPDATE that is not specified, the default action is always NO ACTION."
  - **"Cascaded foreign key actions do not activate triggers."**
- "Since MySQL does not support deferred constraint checking, NO ACTION is treated as RESTRICT". `MATCH FULL/PARTIAL/SIMPLE` clauses "cause the MySQL Server to ignore any ON DELETE or ON UPDATE clause used in the same statement" — [MySQL: FOREIGN KEY Constraints (1.6.3.2)](https://dev.mysql.com/doc/refman/8.0/en/constraint-foreign-key.html).
- Differences from the standard — [MySQL: FOREIGN KEY Constraint Differences](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html):
  - "MySQL checks foreign key constraints immediately; the check is not deferred to transaction commit. According to the SQL standard, the default behavior should be deferred checking… This means that it is not possible to delete a row that refers to itself using a foreign key."
  - A self-referential `ON UPDATE CASCADE/SET NULL` "acts like RESTRICT", whereas a self-referential `ON DELETE CASCADE` and `ON DELETE SET NULL` are possible.
  - "Cascading operations may not be nested more than 15 levels deep."
  - InnoDB allows an FK to reference a non-unique key (an extension), but you are "advised to use foreign keys that reference only UNIQUE (including PRIMARY) and NOT NULL keys".
- **Inline REFERENCES trap:** "MySQL parses but ignores 'inline REFERENCES specifications'… MySQL accepts REFERENCES clauses only when specified as part of a separate FOREIGN KEY specification" — [MySQL 8.0: FK Differences](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html). This changed in 9.7: "Previous versions of MySQL parsed but ignored 'inline REFERENCES specifications'… MySQL 9.7 accepts such REFERENCES clauses and enforces the foreign keys thus created. In addition, MySQL 9.7 allows implicit references to the parent table's primary key." — [MySQL 9.7: FK Differences](https://dev.mysql.com/doc/refman/9.7/en/ansi-diff-foreign-keys.html).
- Conditions:
  - parent and child must use the same storage engine and "cannot be defined as temporary tables";
  - FK columns need an index, which is created automatically;
  - corresponding columns need "similar data types";
  - storage engines without FK support (MyISAM) "parse and ignore" FK specifications.
  - Sources: [MySQL: FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html); [MySQL: FK Differences](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html).
- `foreign_key_checks` (default ON) can be disabled for loading or dropping. "rows added to a table while foreign_key_checks is disabled are not checked for consistency when foreign_key_checks is re-enabled" — [MySQL: FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html).
- Declaring `SET NULL` on a NOT NULL column produces MySQL error 1830, `ER_FK_COLUMN_NOT_NULL`: "Column '%s' cannot be NOT NULL: needed in a foreign key constraint '%s' SET NULL" — [MySQL 8.0 Server Error Reference](https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html).

**Deferred checking, assertions, complex checks (standard vs real systems)**
- Standard/PostgreSQL: a constraint is `DEFERRABLE INITIALLY DEFERRED`, `DEFERRABLE INITIALLY IMMEDIATE` or `NOT DEFERRABLE`, and `SET CONSTRAINTS` switches modes inside a transaction. In PostgreSQL only UNIQUE, PRIMARY KEY, FK and EXCLUDE are deferrable; "NOT NULL and CHECK constraints are always checked immediately" — [PostgreSQL 16: SET CONSTRAINTS](https://www.postgresql.org/docs/16/sql-set-constraints.html).
- PostgreSQL lists feature **F521 "Assertions"** as unsupported and **F671 "Subqueries in CHECK constraints"** as "intentionally omitted" — [PostgreSQL 16: Unsupported Features](https://www.postgresql.org/docs/16/unsupported-features-sql-standard.html). "PostgreSQL does not support CHECK constraints that reference table data other than the new or updated row being checked… a custom trigger can be used" — [PostgreSQL 16: Constraints](https://www.postgresql.org/docs/16/ddl-constraints.html).
- The official practice exercise 4.8(b) writes a `create assertion … check not exists (…)` for "an instructor cannot teach sections in two different classrooms in a semester in the same time slot". It notes "current generation database systems do not support such assertions, although they are part of the SQL standard" — [db-book 6e Practice Solutions Ch.4](https://www.db-book.com/db6/practice-exer-dir/4s.pdf).
- **Update since the textbook (2010):** Oracle AI Database 26ai implements `CREATE ASSERTION`, e.g. `create assertion check_president_salary check (exists (select 1 from emp where job = 'PRESIDENT' and sal between 4000 and 10000));` — [ORACLE-BASE: Assertions in Oracle AI Database 26ai](https://oracle-base.com/articles/26/assertions-26). MySQL 8.0's grammar has no CREATE ASSERTION (inference: no such statement exists in the MySQL manual's SQL statement chapter; not separately verified).

#### Worked example K1 — constraint behavior on the textbook schema (verified, PostgreSQL + db-book DDL + small dataset)
| statement | result | why |
|---|---|---|
| `INSERT INTO instructor VALUES ('99991','Zed','Physics',20000)` | **rejected** (violates `check (salary > 29000)`) | FALSE |
| `INSERT INTO instructor VALUES ('99992','Yan','Physics',NULL)` | **accepted** | `NULL > 29000` is UNKNOWN, which passes CHECK |
| `UNIQUE(email)`: insert two rows with email NULL | **both accepted** | UNIQUE ignores NULLs |
| `UNIQUE(email)`: insert 'x@y' twice | 2nd **rejected** | duplicate key |
| `CHECK (time_slot_id IN (SELECT …))` | **error**: "cannot use subquery in check constraint" | not allowed (MySQL also forbids subqueries) |
| `CREATE ASSERTION a1 CHECK (…)` | **error**: "CREATE ASSERTION is not yet implemented" | PostgreSQL; MySQL has no such statement |
| In MySQL ≤ 8.0.15, the first insert (salary 20000) | would be **accepted** | CHECK parsed and ignored ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html)) |

#### Worked example K2 — what a DELETE does under the textbook's FK actions (verified on the db-book small dataset)
| DELETE | effect |
|---|---|
| `DELETE FROM student WHERE ID='12345'` | student row deleted; **4 `takes` rows** and **1 `advisor` row** cascade-deleted |
| `DELETE FROM department WHERE dept_name='Physics'` | no other rows deleted; **2 instructors, 3 students, 1 course** get `dept_name = NULL` (SET NULL) |
| `DELETE FROM instructor WHERE ID='10101'` | **3 `teaches` rows** deleted (CASCADE); **1 `advisor` row** gets `i_ID = NULL` (SET NULL) |
| `DELETE FROM course WHERE course_id='CS-101'` | **ERROR, nothing deleted**: 4 `prereq` rows list CS-101 as `prereq_id`, whose FK has no ON DELETE action (NO ACTION; = RESTRICT in InnoDB). The cascade to its 2 sections, 7 takes rows and 2 teaches rows is rolled back with the statement. |

#### Worked example K3 — deferred checking, self-references, SET NULL vs NOT NULL (verified in PostgreSQL)
- `person` with `FOREIGN KEY (father) REFERENCES person DEFERRABLE INITIALLY DEFERRED` (same for mother):
  - inserting the child ('c01', father 'f01', mother 'm01') **before** the parents, inside one transaction, succeeds at COMMIT;
  - a child whose father never appears fails **at COMMIT**;
  - with a non-deferrable FK, the same child insert fails **immediately**.
  - **MySQL can't do this** (immediate checks only). Insert the parents first, or insert NULLs and UPDATE later.
- Deleting a row that references itself (`emp(1, mgr=1)`) succeeds in PostgreSQL (checked at end of statement). MySQL docs say this is "not possible" in MySQL ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html)).
- Self-referential `ON DELETE CASCADE` (practice ex. 4.9) — `manager(employee_name, manager_name REFERENCES manager ON DELETE CASCADE)`:
  - hierarchy: CEO → VP1 → M1 → {E1, E2}, plus CEO → VP2 → M2;
  - `DELETE … 'VP1'` removes **VP1, M1, E1, E2**, leaving CEO, VP2, M2.
  - The official answer: "The tuples of all employees of the manager, at all levels, get deleted as well!" — [db-book Practice Solutions Ch.4](https://www.db-book.com/db6/practice-exer-dir/4s.pdf).
- `pid INT NOT NULL REFERENCES p ON DELETE SET NULL`: PostgreSQL fails at delete time with a not-null violation. MySQL rejects such a definition up front (error 1830 above).

#### Textbook/standard → MySQL 8 translation (constraints)
| Textbook / standard | MySQL 8.0 (InnoDB) |
|---|---|
| `dept_name varchar(20) references department` (inline, implicit PK) | **ignored** before 9.7 → write `FOREIGN KEY (dept_name) REFERENCES department(dept_name)` with an explicit column list (grammar `REFERENCES tbl_name (col_name,...)`) |
| `check (P)` | enforced from **8.0.16** (ignored before) |
| `check (x in (select …))`, `create assertion` | not supported → use triggers |
| `on delete set default` | rejected by InnoDB |
| `no action` (checked at end of statement / deferrable) | = RESTRICT, checked immediately per row |
| `initially deferred`, `set constraints … deferred` | not supported |
| `constraint name check (…)` / `constraint name foreign key …` | supported; CHECK names must be unique per schema |

### Inferences
- **"Which constraint enforces X?" decision rule:**
  - value must exist → NOT NULL;
  - value must be distinct (NULLs allowed) → UNIQUE;
  - distinct and non-null, one per table → PRIMARY KEY;
  - condition on one row's values → CHECK;
  - value must exist in another table's key → FOREIGN KEY;
  - value must exist in another table's **non-key** column, or any rule spanning many rows/tables (e.g. "every section has ≥ 1 instructor") → ASSERTION in theory, **TRIGGER** in MySQL;
  - rule comparing **old vs new** values (e.g. salary may not decrease) → BEFORE UPDATE trigger.
- **MySQL-specific consequence 1 (stale derived data):** a trigger that maintains derived data in a child table won't run when rows disappear through `ON DELETE CASCADE`. Example: a takes-delete trigger keeping `tot_cred` correct stays silent when a section is deleted. Either avoid cascades for those tables or recompute.
- **MySQL-specific consequence 2 (silent inline FKs):** copying the textbook's inline `references department` into MySQL 8 creates **no constraint at all** and gives no error. This is a likely lab bug.
- Exam reasoning on cascades: trace each FK edge from the deleted row. If any path hits a RESTRICT/NO ACTION reference that still has matching rows, the **entire statement fails** and no cascade effects persist.

### Gaps
- The exact §4.4.x subsection numbering and wording of the 6th-ed. text were not consulted (official slides and solutions only).
- MySQL FK and CHECK behavior was not executed locally. The claims rest on the MySQL manual pages cited.
- I did not find an explicit MySQL manual sentence saying "CREATE ASSERTION is unsupported". That claim rests on the statement's absence from the MySQL grammar plus the textbook slide.

---

## 4. Triggers (Ch. 5.3): ECA model, BEFORE/AFTER, row vs statement level, NEW/OLD, typical uses, when not to use, cascading triggers, MySQL syntax (DELIMITER, BEGIN…END, SIGNAL) + worked examples

### Takeaway
- A trigger follows **Event–Condition–Action**: on an INSERT/UPDATE/DELETE of a table, if a condition holds, run an action.
- **BEFORE** triggers are for validating or modifying the incoming row (`SET NEW.col`). **AFTER** triggers are for propagating changes (derived data like `tot_cred`, audit logs).
- What MySQL lacks compared with the standard:
  - only **row-level** triggers (`FOR EACH ROW` is mandatory) and **one event per trigger**;
  - no `WHEN` clause (use IF), no `UPDATE OF col`, no `REFERENCING` (the names are fixed: `NEW.`/`OLD.`);
  - no statement-level triggers, no INSTEAD OF, no triggers on views or TEMPORARY tables;
  - no ROLLBACK inside a trigger — reject a change with `SIGNAL SQLSTATE '45000'`.
- MySQL triggers also cannot modify the table that fired them, and they are **not** fired by cascaded FK actions.

### Cited Findings

**Textbook (6e Ch.5 slides)**
- "A trigger is a statement that is executed automatically by the system as a side effect of a modification to the database. To design a trigger mechanism, we must: Specify the conditions under which the trigger is to be executed. Specify the actions to be taken when the trigger executes." "Triggers introduced to SQL standard in SQL:1999, but supported even earlier using non-standard syntax by most databases… check the system manuals" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- Events and transition values:
  - "Triggering event can be insert, delete or update. Triggers on update can be restricted to specific attributes" (`after update of takes on grade`);
  - "referencing old row as: for deletes and updates; referencing new row as: for inserts and updates";
  - "Triggers can be activated before an event, which can serve as extra constraints. For example, convert blank grades to null" (`setnull_trigger … before update of takes … when (nrow.grade = ' ') begin atomic set nrow.grade = null; end`).
  - Source: [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- The textbook's `credits_earned` trigger (literal text recovered from the 7th-ed. slides, same trigger): `create trigger credits_earned after update of takes on (grade) referencing new row as nrow referencing old row as orow for each row when nrow.grade <> 'F' and nrow.grade is not null and (orow.grade = 'F' or orow.grade is null) begin atomic update student set tot_cred = tot_cred + (select credits from course where course.course_id = nrow.course_id) where student.id = nrow.id; end;` — [7e Ch.5 slides](https://www.db-book.com/slides-dir/PDF-dir/ch5.pdf); [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- Statement-level triggers: "Use for each statement instead of for each row. Use referencing old table or referencing new table to refer to temporary tables (called transition tables) containing the affected rows. Can be more efficient when dealing with SQL statements that update a large number of rows" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
- "When Not To Use Triggers" — [6e Ch.5 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt):
  - Former uses: maintaining summary data and replication via "change or delta relations". "Databases today provide built in materialized view facilities… built-in support for replication".
  - "Encapsulation facilities can be used instead of triggers in many cases".
  - "Risk of unintended execution of triggers, for example, when loading data from a backup copy [or] replicating updates at a remote site".
  - "Other risks with triggers: Error leading to failure of critical transactions that set off the trigger; Cascading execution".
- Exercise 5.5 refers to referential-integrity triggers from section to time slot "in Figure 5.8", which "do not cover the update operation". Exercise 5.6 asks you to (a) handle all takes updates affecting tot_cred and (b) handle inserts. The official answers to 5.4–5.6 read "FILL" (not provided) — [db-book Practice Solutions Ch.5](https://www.db-book.com/db6/practice-exer-dir/5s.pdf).

**MySQL 8.0 trigger syntax & rules**
- Grammar — [MySQL: CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html):
  ```
  CREATE [DEFINER = user] TRIGGER [IF NOT EXISTS] trigger_name
    {BEFORE | AFTER} {INSERT | UPDATE | DELETE}
    ON tbl_name FOR EACH ROW
    [{FOLLOWS | PRECEDES} other_trigger_name]
    trigger_body
  ```
  - `IF NOT EXISTS` is available "beginning with MySQL 8.0.29".
  - The table "must refer to a permanent table. You cannot associate a trigger with a TEMPORARY table or a view."
- Events are table operations, not statements — [MySQL: CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html):
  - INSERT triggers also fire for LOAD DATA and REPLACE.
  - "DROP TABLE and TRUNCATE TABLE statements on the table do not activate" DELETE triggers.
  - `INSERT … ON DUPLICATE KEY UPDATE` fires BEFORE INSERT, then either AFTER INSERT or both BEFORE/AFTER UPDATE.
  - **"Cascaded foreign key actions do not activate triggers."**
- "MySQL triggers activate only for changes made to tables by SQL statements… an insert trigger activates for each inserted row" — [MySQL: Using Triggers](https://dev.mysql.com/doc/refman/8.0/en/triggers.html).
- Several triggers with the same timing and event are allowed. They fire in creation order unless `FOLLOWS`/`PRECEDES` is given — [MySQL: CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html). The standard also fires them "in time-of-creation order"; PostgreSQL uses name order instead — [PostgreSQL 16: CREATE TRIGGER, Compatibility](https://www.postgresql.org/docs/16/sql-createtrigger.html).
- NEW/OLD — [MySQL: Trigger Syntax and Examples](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html):
  - "OLD and NEW are MySQL extensions to triggers".
  - "In an INSERT trigger, only NEW.col_name can be used… In a DELETE trigger, only OLD.col_name can be used."
  - "A column named with OLD is read only."
  - "In a BEFORE trigger, you can also change its value with SET NEW.col_name = value… (Such a SET statement has no effect in an AFTER trigger because the row change has already occurred.)"
  - In a BEFORE trigger, NEW for an AUTO_INCREMENT column is 0.
- "Basic column value checks occur prior to trigger activation, so you cannot use BEFORE triggers to convert values inappropriate for the column type to valid values." Triggers cannot use `NEW`/`OLD` on generated columns — [MySQL: CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html).
- Multi-statement bodies use `BEGIN … END`. In the mysql client "it is necessary to redefine the mysql statement delimiter" (`delimiter //` … `END;//` … `delimiter ;`) — [MySQL: Trigger Syntax](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html); [MySQL: Defining Stored Programs](https://dev.mysql.com/doc/refman/8.0/en/stored-programs-defining.html).
- Transactions & errors — [MySQL: Trigger Syntax](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html):
  - A trigger "cannot use statements that explicitly or implicitly begin or end a transaction, such as START TRANSACTION, COMMIT, or ROLLBACK" (ROLLBACK TO SAVEPOINT is OK).
  - "If a BEFORE trigger fails, the operation on the corresponding row is not performed… An AFTER trigger is executed only if any BEFORE triggers and the row operation execute successfully. An error during either a BEFORE or AFTER trigger results in failure of the entire statement… For transactional tables… trigger failure also causes rollback."
- Further restrictions — [MySQL: Restrictions on Stored Programs](https://dev.mysql.com/doc/refman/8.0/en/stored-program-restrictions.html):
  - no dynamic SQL (PREPARE/EXECUTE) in triggers;
  - **"A stored function or trigger cannot modify a table that is already being used (for reading or writing) by the statement that invoked the function or trigger"**;
  - "Triggers are not activated by foreign key actions";
  - "The RETURN statement is not permitted in triggers… To exit a trigger immediately, use the LEAVE statement".
- Security context: inside a trigger, `CURRENT_USER` "is the DEFINER user, not the user whose actions caused the trigger to be activated" — [MySQL: CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html).
- SIGNAL — [MySQL: SIGNAL](https://dev.mysql.com/doc/refman/8.0/en/signal.html):
  - "To signal a generic SQLSTATE value, use '45000', which means 'unhandled user-defined exception.'" Example: `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred';`.
  - SQLSTATE class '01' is a warning and does not terminate the program.
  - MESSAGE_TEXT is VARCHAR(128).
  - The values in `SET` may only be "stored procedure or function parameters, stored program local variables declared with DECLARE, user-defined variables, system variables, or literals". So build a dynamic message in a DECLAREd variable first.
- NULL-safe comparison for audit conditions: `<=>` "returns 1 rather than NULL if both operands are NULL… equivalent to the standard SQL IS NOT DISTINCT FROM" — [MySQL: Comparison Operators](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html).

**Standard SQL comparison (PostgreSQL docs)**
- Per-row vs per-statement: "a per-statement trigger is invoked only once when an appropriate statement is executed, regardless of the number of rows affected… a statement that affects zero rows will still result in the execution of any applicable per-statement triggers" — [PostgreSQL 16: Overview of Trigger Behavior](https://www.postgresql.org/docs/16/trigger-definition.html).
- Transition tables are declared with `REFERENCING {OLD | NEW} TABLE AS name` ("only allowed for an AFTER trigger"). PostgreSQL does not let row variables be named in REFERENCING ("as though there is a REFERENCING clause containing OLD ROW AS OLD NEW ROW AS NEW"). "The ability to specify multiple actions for a single trigger using OR is a PostgreSQL extension of the SQL standard" — [PostgreSQL 16: CREATE TRIGGER](https://www.postgresql.org/docs/16/sql-createtrigger.html).

**Verified behaviors (PostgreSQL ports; MySQL differences noted)**
- PL/pgSQL port of the textbook `credits_earned` trigger on the small dataset (student 98988, BIO-301 = 4 credits):

| step | tot_cred |
|---|---|
| start | 120 |
| grade NULL→A | 124 |
| A→B | 124 |
| B→F | 124 |
| F→C | **128** |

  - The textbook trigger never *subtracts*, so A→F→C double-counts. That is exactly what practice exercise 5.6(a) asks you to fix.
- PostgreSQL **does** fire user triggers for cascaded deletes: deleting a CS-101 section cascaded 6 takes deletions and the takes AFTER DELETE trigger logged 6 rows. MySQL would log 0 ("Cascaded foreign key actions do not activate triggers" — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html)).
- A statement-level AFTER UPDATE trigger with `REFERENCING NEW TABLE AS new_rows` fired **once**, seeing 3 rows, for `UPDATE instructor … WHERE dept_name='Comp. Sci.'`. This is standard SQL; MySQL has no equivalent.

#### Textbook/standard → MySQL 8 translation (triggers)
| Textbook / standard SQL | MySQL 8.0 |
|---|---|
| `after update of takes on (grade)` (book) / `AFTER UPDATE OF grade ON takes` (standard) | `AFTER UPDATE ON takes` — no column list; test `IF NOT (OLD.grade <=> NEW.grade)` in the body if needed |
| `referencing new row as nrow` / `old row as orow` | fixed names `NEW.col` / `OLD.col` (no REFERENCING clause) |
| `when (condition)` | `IF condition THEN … END IF;` inside `BEGIN … END` |
| `begin atomic … end` | `BEGIN … END` + `DELIMITER //` in the mysql client |
| `for each statement`, `referencing new table as` | not available (row-level only) |
| `rollback` inside the trigger (textbook style) | not allowed → `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '…'` (statement fails and is rolled back on InnoDB) |
| one trigger for `insert or update` (PostgreSQL extension) | two triggers (optionally both `CALL` one stored procedure) |

#### Worked trigger examples in MySQL syntax (checked against the MySQL 8.0 manual grammar; not executed — no MySQL server available)

**T1 — Maintain derived data: the textbook's `credits_earned` (AFTER UPDATE) + an INSERT companion (practice 5.6b)**
```sql
DELIMITER //
CREATE TRIGGER credits_earned
AFTER UPDATE ON takes
FOR EACH ROW
BEGIN
  IF NEW.grade <> 'F' AND NEW.grade IS NOT NULL
     AND (OLD.grade = 'F' OR OLD.grade IS NULL) THEN
    UPDATE student
       SET tot_cred = tot_cred +
           (SELECT credits FROM course WHERE course.course_id = NEW.course_id)
     WHERE student.ID = NEW.ID;          -- updates ANOTHER table: allowed
  END IF;
END//

CREATE TRIGGER credits_on_insert
AFTER INSERT ON takes
FOR EACH ROW
BEGIN
  IF NEW.grade IS NOT NULL AND NEW.grade <> 'F' THEN
    UPDATE student
       SET tot_cred = tot_cred +
           (SELECT credits FROM course WHERE course_id = NEW.course_id)
     WHERE ID = NEW.ID;
  END IF;
END//
DELIMITER ;
```
- **Try it:** `UPDATE takes SET grade='A' WHERE ID='98988' AND course_id='BIO-301';` should raise Tanaka's tot_cred from 120 to 124. The logic was verified with the PostgreSQL port above.
- **Possible fix for practice 5.6(a)** (my own answer; the official solution is "FILL"): also subtract when a passing grade becomes F or NULL. In the same body add `ELSEIF (OLD.grade IS NOT NULL AND OLD.grade <> 'F') AND (NEW.grade IS NULL OR NEW.grade = 'F') THEN UPDATE student SET tot_cred = tot_cred - (SELECT credits FROM course WHERE course_id = OLD.course_id) WHERE ID = OLD.ID;`. This assumes ID and course_id are not themselves updated.
- **MySQL caveat:** deleting a section removes its takes rows by CASCADE *without* firing any takes trigger.

**T2 — BEFORE trigger that modifies the incoming row (the textbook's `setnull_trigger`)**
```sql
DELIMITER //
CREATE TRIGGER setnull_trigger
BEFORE UPDATE ON takes
FOR EACH ROW
BEGIN
  IF TRIM(NEW.grade) = '' THEN
    SET NEW.grade = NULL;               -- only legal in a BEFORE trigger
  END IF;
END//
DELIMITER ;
```

**T3 — Enforce a constraint FK/CHECK can't express: section.time_slot_id must exist in time_slot (textbook's Figure 5.8 idea, incl. the update case from practice 5.5)**
```sql
DELIMITER //
CREATE TRIGGER timeslot_check_ins
BEFORE INSERT ON section
FOR EACH ROW
BEGIN
  IF NEW.time_slot_id IS NOT NULL
     AND NOT EXISTS (SELECT * FROM time_slot WHERE time_slot_id = NEW.time_slot_id) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'time_slot_id does not exist in time_slot';
  END IF;
END//

CREATE TRIGGER timeslot_check_upd          -- MySQL: one event per trigger, so a second trigger
BEFORE UPDATE ON section
FOR EACH ROW
BEGIN
  IF NEW.time_slot_id IS NOT NULL
     AND NOT EXISTS (SELECT * FROM time_slot WHERE time_slot_id = NEW.time_slot_id) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'time_slot_id does not exist in time_slot';
  END IF;
END//

CREATE TRIGGER timeslot_check_del
AFTER DELETE ON time_slot
FOR EACH ROW
BEGIN
  -- the last row for this id is gone, but sections still use it -> reject the whole DELETE
  IF NOT EXISTS (SELECT * FROM time_slot WHERE time_slot_id = OLD.time_slot_id)
     AND EXISTS (SELECT * FROM section WHERE time_slot_id = OLD.time_slot_id) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'time_slot_id is still used by a section';
  END IF;
END//
DELIMITER ;
```
- **Why triggers:** `time_slot_id` alone is not a key of `time_slot` (its PK is `(time_slot_id, day, start_hr, start_min)`), so a FOREIGN KEY can't be declared, and MySQL CHECK forbids subqueries.
- **How it rejects:** SIGNAL in an AFTER trigger makes the statement fail, and InnoDB rolls it back.

**T4 — Transition constraint: salaries may never decrease (needs OLD, so CHECK can't do it)**
```sql
DELIMITER //
CREATE TRIGGER no_salary_cut
BEFORE UPDATE ON instructor
FOR EACH ROW
BEGIN
  DECLARE msg VARCHAR(128);              -- SIGNAL … SET MESSAGE_TEXT needs a literal or variable, not CONCAT(...)
  IF NEW.salary < OLD.salary THEN
    SET msg = CONCAT('Salary of ', OLD.ID, ' cannot decrease from ', OLD.salary, ' to ', NEW.salary);
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
  END IF;
END//
DELIMITER ;
-- UPDATE instructor SET salary = salary - 1000 WHERE ID = '10101';   -> fails with SQLSTATE 45000 and the message
```

**T5 — Audit log (AFTER UPDATE)**
```sql
CREATE TABLE salary_audit (
  audit_id   INT AUTO_INCREMENT PRIMARY KEY,
  ID         VARCHAR(5),
  old_salary DECIMAL(8,2),
  new_salary DECIMAL(8,2),
  changed_by VARCHAR(100),
  changed_at DATETIME
);
DELIMITER //
CREATE TRIGGER instructor_salary_audit
AFTER UPDATE ON instructor
FOR EACH ROW
BEGIN
  IF NOT (OLD.salary <=> NEW.salary) THEN          -- NULL-safe "changed?" test
    INSERT INTO salary_audit (ID, old_salary, new_salary, changed_by, changed_at)
    VALUES (OLD.ID, OLD.salary, NEW.salary, USER(), NOW());   -- USER() = session user; CURRENT_USER() would be the DEFINER
  END IF;
END//
DELIMITER ;
```

### Inferences
- **BEFORE vs AFTER rule of thumb:**
  - use BEFORE to **validate or fix the row being written** (SET NEW.x, or SIGNAL to reject before the write);
  - use AFTER to **react to a completed change in other tables** (derived totals, audit rows);
  - in MySQL, both can reject via SIGNAL, and AFTER runs only if the row operation succeeded.
- **Cascading triggers:** a trigger's action can fire triggers on *other* tables (T1's UPDATE of student would fire student's UPDATE triggers). MySQL's ban on modifying the triggering table blocks direct self-recursion. The textbook lists "cascading execution" as a risk.
- **When not to use triggers (exam answer):**
  - for summary data use materialized views (MySQL has none built in, so a trigger or batch job is the practical option);
  - for replication use built-in replication;
  - for business rules use procedures (encapsulation);
  - the textbook's risks: surprise firing during backup loads and replication, a trigger error aborting critical transactions, and hard-to-follow cascades;
  - MySQL-specific: triggers silently skip FK-cascade changes and `TRUNCATE`.
- Syllabus marks triggers as "hints" (lighter coverage). The likely asks are: define a trigger (ECA), BEFORE vs AFTER, row vs statement level, NEW/OLD availability per event, write one simple trigger, and name when not to use them.

### Gaps
- The MySQL trigger code was not executed (no MySQL server). It follows the manual's grammar and examples. The credits_earned logic was verified only through the PostgreSQL port.
- The 6th-ed. Figure 5.8 (time_slot triggers) text itself was not available from free official sources. Its existence and topic are confirmed by practice exercise 5.5's wording. T3 is my MySQL rendering of that idea.
- The exact MySQL error code for "can't update table … in stored function/trigger" and the error number printed for SIGNAL '45000' were not verified, so they are omitted.

---

## 5. Practice questions with answers (20)

### Takeaway
These 20 questions cover what is most testable this week:
- ranking output prediction;
- top-N and window-free queries;
- frames;
- NULL ordering;
- ROLLUP/CUBE counting and MySQL syntax;
- "which constraint";
- CASCADE outcomes;
- writing and tracing triggers.

Numeric answers were checked by running them (PostgreSQL 16.14 / SQLite 3.54.0); sources for the rules are linked.

### Cited Findings

**Q1 (predict).** `scores(v)` = 50, 40, 40, 30, 30, 30, 20. Give ROW_NUMBER, RANK, DENSE_RANK for `ORDER BY v DESC`.
**A:** (verified; semantics per [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html))
| v | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|
| 50 | 1 | 1 | 1 |
| 40 | 2 | 2 | 2 |
| 40 | 3 | 2 | 2 |
| 30 | 4 | 4 | 3 |
| 30 | 5 | 4 | 3 |
| 30 | 6 | 4 | 3 |
| 20 | 7 | 7 | 4 |

ROW_NUMBERs within a tie group may come out in either order.

**Q2 (compute).** Same table: PERCENT_RANK and CUME_DIST of 50, 40, 30, 20.
**A:** Use PR = (rank−1)/(n−1) and CD = (#rows ≤ in sort order incl. ties)/n ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html)). Verified values:

| v | PERCENT_RANK | CUME_DIST |
|---|---|---|
| 50 | 0 | 1/7 = 0.1429 |
| 40 | 1/6 = 0.1667 | 3/7 = 0.4286 |
| 30 | 3/6 = 0.5 | 6/7 = 0.8571 |
| 20 | 1 | 1 |

**Q3 (predict).** `NTILE(4) OVER (ORDER BY i)` on 10 rows: how many rows per bucket?
**A:** 3, 3, 2, 2 (verified). 9 rows would give 3, 2, 2, 2 (MySQL manual example, [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html)).

**Q4 (write).** `instructor(ID, name, dept_name, salary)`: list the top-3 earners per department, keeping ties (MySQL 8).
**A:**
```sql
SELECT dept_name, name, salary, rnk
FROM (SELECT dept_name, name, salary,
             RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS rnk
      FROM instructor) AS ranked
WHERE rnk <= 3
ORDER BY dept_name, rnk;
```
- `RANK() <= 3` can return more than 3 rows when there is a tie at 3rd place, and it skips ranks after ties.
- `DENSE_RANK() <= 3` returns everyone holding one of the top-3 distinct salaries.
- `ROW_NUMBER() <= 3` returns exactly 3 per department (ties broken arbitrarily). See W3.
- The filter must be in an outer query ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)).

**Q5 (rewrite).** Write Q4's rank without window functions.
**A:** 1 + count of strictly greater salaries in the same department ([6e slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt) pattern; equivalence verified in W4):
```sql
SELECT i.dept_name, i.name, i.salary,
       1 + (SELECT COUNT(*) FROM instructor j
            WHERE j.dept_name = i.dept_name AND j.salary > i.salary) AS rnk
FROM instructor i
WHERE (SELECT COUNT(*) FROM instructor j
       WHERE j.dept_name = i.dept_name AND j.salary > i.salary) < 3
ORDER BY i.dept_name, rnk;
```
For DENSE_RANK use `COUNT(DISTINCT j.salary)`.

**Q6 (find the bug).** `SELECT student, SUM(marks) AS total, RANK() OVER (ORDER BY total DESC) AS trank FROM S GROUP BY student HAVING trank <= 3;`
**A:** There are two problems:
1. Window results can't be filtered in HAVING or WHERE, because windows are computed after HAVING ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)).
2. The same SELECT can't use its own alias `total` inside OVER.

PostgreSQL rejects it ("column 'trank' does not exist"; directly in HAVING: "window functions are not allowed in HAVING") (verified). The fix:
```sql
SELECT student, total, trank FROM (
  SELECT student, SUM(marks) AS total, RANK() OVER (ORDER BY SUM(marks) DESC) AS trank
  FROM S GROUP BY student) t
WHERE trank <= 3;
```
Note that the official practice solution 5.10 prints the HAVING form, so treat it as pseudo-code ([db-book 5s.pdf](https://www.db-book.com/db6/practice-exer-dir/5s.pdf)).

**Q7 (compute frames).** `d(day, amt)` = (1,5), (2,10), (3,15), (4,20). Give:
- (a) `SUM(amt) OVER (ORDER BY day ROWS UNBOUNDED PRECEDING)`;
- (b) `SUM(amt) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW)`;
- (c) `AVG(amt) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)`.

**A:** (verified; frame rules per [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html))
- (a) 5, 15, 30, 50
- (b) 5, 15, 25, 35
- (c) 7.5, 10, 15, 17.5 (the edge rows average only the rows that exist)

**Q8 (traps).**
- (a) `t(k,v)` = (1,10), (2,20), (2,30), (3,40): what does `SUM(v) OVER (ORDER BY k)` return?
- (b) Why does `LAST_VALUE(amount) OVER (ORDER BY day)` just echo each row's own amount?

**A:**
- (a) 10, **60, 60**, 100. The default frame is RANGE … CURRENT ROW, which includes peers (both k=2 rows). Use `ROWS UNBOUNDED PRECEDING` with a unique order to get 10, 30, 60, 100 (W7).
- (b) The default frame ends at the current row. Use `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` (W6).
- Source for both: [MySQL frames](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html).

**Q9 (NULLs).** `scores` = A 90, B NULL, C 75, D 90. Give `RANK() OVER (ORDER BY score DESC)` in MySQL and in PostgreSQL. How do you get NULLs last in an ascending MySQL sort?
**A:**
- MySQL: A 1, D 1, C 3, B 4 (NULL is smallest, so it comes last in DESC).
- PostgreSQL: B 1, A 2, D 2, C 4 (NULL is largest, so it comes first in DESC).
- MySQL has no `NULLS LAST`; write `ORDER BY score IS NULL, score`.
- Verified (W9). Sources: [MySQL NULL](https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html), [PostgreSQL SELECT](https://www.postgresql.org/docs/16/sql-select.html), [modern-sql.com](https://modern-sql.com/concept/null).

**Q10 (window vs GROUP BY).** Show each instructor's salary next to the department average. How many rows come back on the textbook's small dataset, compared with `GROUP BY dept_name`?
**A:**
```sql
SELECT name, dept_name, salary,
       AVG(salary) OVER (PARTITION BY dept_name) AS dept_avg,
       salary - AVG(salary) OVER (PARTITION BY dept_name) AS diff
FROM instructor;
```
It returns 12 rows, one per instructor, whereas GROUP BY gives 7 rows, one per department (verified counts on the [db-book small dataset](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html); concept per [MySQL](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html)).

**Q11 (grouping sets).** How many grouping sets do these produce?
- (a) `CUBE(a,b,c)`;
- (b) `ROLLUP(a,b,c)`;
- (c) `ROLLUP(a), ROLLUP(b,c)`.

(d) Express `CUBE(a,b,c,d)` with ROLLUPs only.

**A:**
- (a) 8
- (b) 4: (a,b,c), (a,b), (a), ()
- (c) 2×3 = 6
- (d) `GROUP BY ROLLUP(a), ROLLUP(b), ROLLUP(c), ROLLUP(d)` = 16 sets
- All verified. Sources: [6e slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt); [PostgreSQL](https://www.postgresql.org/docs/16/queries-table-expressions.html); [db-book 5s.pdf ex. 5.9](https://www.db-book.com/db6/practice-exer-dir/5s.pdf).

**Q12 (MySQL ROLLUP).** `sales2` = (skirt, dark, 8), (skirt, white, 10), (dress, dark, 20), (dress, white, 5). Write a MySQL query that gives per-item subtotals and a grand total with "All" labels, and list its rows. Then explain how to keep only the subtotal rows.
**A:** `SELECT IF(GROUPING(item),'All items',item) item, IF(GROUPING(color),'All colors',color) color, SUM(qty) total FROM sales2 GROUP BY item, color WITH ROLLUP;`

Rows: dress dark 20 · dress white 5 · dress All colors 25 · skirt dark 8 · skirt white 10 · skirt All colors 18 · All items All colors 43 (order may vary; add ORDER BY, allowed in MySQL ≥ 8.0.12).

To keep only the subtotals use `HAVING GROUPING(item, color) <> 0`, **not** `WHERE color IS NULL` ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html)).

**Q13 (CUBE in MySQL).** MySQL has no CUBE. Produce `CUBE(item, color)` for `sales2`.
**A:** `... GROUP BY item, color WITH ROLLUP UNION ALL SELECT NULL, color, SUM(qty) FROM sales2 GROUP BY color;` gives 9 rows; the extra two are NULL dark 28 and NULL white 15. It was verified equal to CUBE in PostgreSQL (R1). That MySQL lacks CUBE is shown by its grammar ([MySQL SELECT](https://dev.mysql.com/doc/refman/8.0/en/select.html)).

**Q14 (which constraint?).** On the university schema, what enforces each rule?
- (a) Every instructor has a name.
- (b) An optional student email is never duplicated.
- (c) salary > 29000.
- (d) Every `takes.ID` is an existing student.
- (e) semester ∈ {Fall, Winter, Spring, Summer}.
- (f) `section.time_slot_id` appears in `time_slot`.
- (g) Every section has at least one instructor.
- (h) A salary may never decrease.

**A:**
- (a) `NOT NULL`.
- (b) `UNIQUE` (NULLs allowed, more than once — [MySQL](https://dev.mysql.com/doc/refman/8.0/en/create-index.html)).
- (c) `CHECK (salary > 29000)`, enforced in MySQL ≥ 8.0.16 ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html)).
- (d) `FOREIGN KEY (ID) REFERENCES student(ID)`.
- (e) `CHECK (semester IN (...))` ([db-book DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql)).
- (f) Not a FOREIGN KEY, because time_slot_id isn't a key of time_slot, and not a CHECK, because subqueries are forbidden. Use **triggers** (T3; [6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt)).
- (g) An **assertion** in standard SQL; in MySQL, triggers on section and teaches, or application logic ([6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt)).
- (h) A **BEFORE UPDATE trigger** (T4), because CHECK sees only the new row.

**Q15 (NULL semantics).** With `salary NUMERIC(8,2) CHECK (salary > 29000)` (no NOT NULL), what happens to an insert with salary 20000? With NULL? Answer for MySQL 8.0.30 and for MySQL 5.7. Separately, can a `UNIQUE(email)` column hold two NULLs?
**A:**
- 8.0.30: 20000 is rejected; NULL is **accepted** (UNKNOWN passes).
- 5.7: **both accepted**, because CHECK was parsed and ignored before 8.0.16.
- UNIQUE: yes, two NULLs are allowed. A duplicate non-NULL email is rejected.
- Verified in PostgreSQL. Sources: [MySQL CHECK](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html); [8.0.16 notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-16.html).

**Q16 (DELETE + CASCADE).** Using the textbook DDL and small dataset, what happens on each of these?
- (a) `DELETE FROM student WHERE ID='12345'`
- (b) `DELETE FROM department WHERE dept_name='Physics'`
- (c) `DELETE FROM course WHERE course_id='CS-101'`
- (d) In MySQL, a takes `AFTER DELETE` trigger maintains tot_cred. Does it run when a section's takes rows vanish through CASCADE?

**A:**
- (a) The student is deleted together with 4 takes rows and 1 advisor row (CASCADE).
- (b) Nothing else is deleted; 2 instructors, 3 students and 1 course get dept_name = NULL (SET NULL).
- (c) The statement **fails**: 4 prereq rows reference CS-101 via prereq_id, which has no action (= RESTRICT in InnoDB). Nothing is deleted, so the 2 sections, 7 takes rows and 2 teaches rows stay.
- (d) **No.** MySQL doesn't fire triggers for cascaded FK actions ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)). PostgreSQL does (verified).
- (a)–(c) verified (K2); actions per [db-book DDL](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql).

**Q17 (self-reference).** `manager(employee_name PK, manager_name REFERENCES manager ON DELETE CASCADE)`. The hierarchy is CEO → VP1 → M1 → {E1, E2} and CEO → VP2 → M2. Delete VP1: what remains? Any MySQL limit?
**A:**
- What remains: CEO, VP2, M2. VP1, M1, E1 and E2 are deleted — "all employees of the manager, at all levels" ([db-book 4s.pdf ex. 4.9](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)); verified.
- MySQL limit: a self-referential ON DELETE CASCADE is allowed, but cascades may not nest more than 15 levels. A self-referential ON UPDATE CASCADE acts like RESTRICT ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html)).

**Q18 (deferred checking).** `person(ID, name, father, mother)` has self-FKs. How do you insert a child and both parents in standard SQL, and how in MySQL?
**A:**
- **Standard / PostgreSQL:** declare the FKs `DEFERRABLE INITIALLY DEFERRED`. The checks then run at COMMIT, so the insert order doesn't matter (verified). Sources: [PostgreSQL SET CONSTRAINTS](https://www.postgresql.org/docs/16/sql-set-constraints.html); [6e Ch.4 slides](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt).
- **MySQL:** it has no deferred checking, because checks are immediate and row-by-row ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html)). Instead, either:
  - insert the parents first; or
  - insert the child with NULL parents and UPDATE later (impossible if the columns are NOT NULL).
- `SET foreign_key_checks=0` also works but is risky: those rows are never re-checked ([MySQL](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)).

**Q19 (write triggers, MySQL).**
- (a) Reject any decrease of an instructor's salary with an error message.
- (b) Add the course's credits to `tot_cred` when a takes row is inserted with a passing grade.

**A:** (a) is T4 (BEFORE UPDATE + `SIGNAL SQLSTATE '45000'`, with the message held in a DECLAREd variable). (b) is `credits_on_insert` in T1 (AFTER INSERT + `IF NEW.grade IS NOT NULL AND NEW.grade <> 'F'`). Both need `DELIMITER //` around them in the mysql client ([MySQL SIGNAL](https://dev.mysql.com/doc/refman/8.0/en/signal.html); [MySQL Trigger Syntax](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html)).

**Q20 (trace + concepts).**
- (a) Student 98988 has tot_cred = 120. With the textbook's `credits_earned` trigger, BIO-301 (4 credits) goes through grades NULL→A, A→B, B→F, F→C. What is tot_cred after each step?
- (b) Which of NEW and OLD exist in INSERT, UPDATE and DELETE triggers?
- (c) Can a MySQL trigger `SET NEW.x` in an AFTER trigger?
- (d) Can it run once per statement?
- (e) Can it `ROLLBACK`?

**A:**
- (a) 124, 124, 124, **128**. The double-count happens because the trigger never subtracts (verified with the PostgreSQL port).
- (b) INSERT has only NEW, DELETE has only OLD, and UPDATE has both. OLD is read-only.
- (c) No — it is only meaningful in BEFORE; in AFTER it has no effect.
- (d) No — MySQL triggers are FOR EACH ROW only.
- (e) No — use SIGNAL instead.
- Sources: [MySQL Trigger Syntax](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html); [MySQL CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html).

### Inferences
- If time is short, drill Q1–Q2, Q4–Q8 and Q11–Q13 first (windowing and advanced aggregation are "core" in week 7). Then do Q14–Q16 (constraints: "which constraint" and CASCADE tracing). Finish with Q19–Q20 (triggers are "hints").
- When predicting outputs, always do three things:
  1. find the partition;
  2. sort it, and note ties (peers);
  3. apply the function's tie rule (RANK = 1 + #ahead, DENSE_RANK = 1 + #distinct ahead), or the frame for aggregates (default RANGE includes peers).

### Gaps
- None of the answers was executed on MySQL itself. The MySQL-specific answers (WITH ROLLUP syntax, SIGNAL, the NULL ordering numbers) rest on the manual plus equivalent-engine runs.

---

## 6. Best free resources (legal, non-pirated)

### Takeaway
Start with the **official db-book.com 6th-edition materials**: the Ch.4/Ch.5 slides, the practice-exercise solutions and the MySQL DDL plus sample data. Pair them with the **MySQL 8.0 manual** pages for lab syntax and the **PostgreSQL docs** for clean standard-SQL explanations. For extra drills there are SQLZoo, PostgreSQL Exercises and the Mode tutorial.

### Cited Findings
- **db-book.com (official, free):**
  - 6th-ed. slides, including Ch.4 "Intermediate SQL" and Ch.5 "Advanced SQL" (PPT) — [slide index](https://www.db-book.com/db6/slide-dir/index.html) · [ch4.ppt](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch4.ppt) · [ch5.ppt](https://codex.cs.yale.edu/avi/db-book/db6/slide-dir/PPT-dir/ch5.ppt).
  - The 7th-ed. Ch.5 slides as text-searchable PDF; the content for these topics is the same, with the same trigger/windowing examples — [7e ch5.pdf](https://www.db-book.com/slides-dir/PDF-dir/ch5.pdf).
- **Solutions to Practice Exercises** (6e), "different from the exercises provided in the text"; "Use of the material is authorized for personal use" — [index](https://www.db-book.com/db6/practice-exer-dir/index.html).
  - Ch.4 ([4s.pdf](https://www.db-book.com/db6/practice-exer-dir/4s.pdf)): 4.8 (assertion), 4.9 (self-referential cascade).
  - Ch.5 ([5s.pdf](https://www.db-book.com/db6/practice-exer-dir/5s.pdf)): 5.4–5.6 (triggers; answers are "FILL"), 5.8 (trigger), 5.9 (cube via rollup), 5.10 (ranking; HAVING caveat in Q6), 5.11 (cube without CUBE).
- **Lab data:**
  - DDL "For MySQL" ([DDL-MySQL.sql](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL-MySQL.sql));
  - generic DDL ([DDL.sql](https://www.db-book.com/db6/lab-dir/sample_tables-dir/DDL.sql));
  - the small dataset "that matches Appendix A exactly" ([smallRelationsInsertFile.sql](https://www.db-book.com/db6/lab-dir/sample_tables-dir/smallRelations/smallRelationsInsertFile.sql));
  - a large random dataset;
  - all listed on the [sample tables page](https://www.db-book.com/db6/lab-dir/sample_tables-dir/index.html). All of Q16/K2 can be reproduced in the MySQL lab with these files.
- **MySQL 8.0 Reference Manual** (lab syntax):
  - windowing: [window function descriptions](https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html), [concepts & syntax](https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html), [frames](https://dev.mysql.com/doc/refman/8.0/en/window-functions-frames.html), [named windows](https://dev.mysql.com/doc/refman/8.0/en/window-functions-named-windows.html), [restrictions](https://dev.mysql.com/doc/refman/8.0/en/window-function-restrictions.html);
  - aggregation: [GROUP BY modifiers / WITH ROLLUP / GROUPING()](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html);
  - constraints: [CHECK](https://dev.mysql.com/doc/refman/8.0/en/create-table-check-constraints.html), [FOREIGN KEY](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html), [FK differences from standard](https://dev.mysql.com/doc/refman/8.0/en/ansi-diff-foreign-keys.html);
  - triggers: [CREATE TRIGGER](https://dev.mysql.com/doc/refman/8.0/en/create-trigger.html), [trigger syntax & examples](https://dev.mysql.com/doc/refman/8.0/en/trigger-syntax.html), [SIGNAL](https://dev.mysql.com/doc/refman/8.0/en/signal.html), [stored-program restrictions](https://dev.mysql.com/doc/refman/8.0/en/stored-program-restrictions.html).
- **PostgreSQL docs** (clear standard-SQL reference):
  - [Tutorial 3.5 Window Functions](https://www.postgresql.org/docs/16/tutorial-window.html);
  - [Window function list](https://www.postgresql.org/docs/16/functions-window.html);
  - [Window call syntax & frames](https://www.postgresql.org/docs/16/sql-expressions.html);
  - [GROUPING SETS/CUBE/ROLLUP](https://www.postgresql.org/docs/16/queries-table-expressions.html);
  - [CREATE TRIGGER](https://www.postgresql.org/docs/16/sql-createtrigger.html) (with a "Compatibility" section on the SQL standard).
- **SQLite "Window Functions"** — a detailed free reference with frame examples (page verified to exist) — [sqlite.org](https://www.sqlite.org/windowfunctions.html).
- **University notes:** CMU 15-445/645 (Fall 2024) lecture notes #02 "Modern SQL". Its "Window Functions" section covers ROW_NUMBER, RANK, OVER and PARTITION BY — [CMU notes PDF](https://15445.courses.cs.cmu.edu/fall2024/notes/02-modernsql.pdf).
- **NULL ordering across DBMSs:** [modern-sql.com — NULL](https://modern-sql.com/concept/null).
- **Interactive practice** (links resolve, HTTP 200 on 2026-10-19; content not reviewed in depth): [SQLZoo — Window functions](https://sqlzoo.net/wiki/Window_functions) · [PostgreSQL Exercises — rank members](https://pgexercises.com/questions/aggregates/rankmembers.html) · [Mode — SQL Window Functions tutorial](https://mode.com/sql-tutorial/sql-window-functions).

### Inferences
- **Suggested 1-week plan:**
  1. Read the 6e Ch.5 slides on ranking/windowing/OLAP and §1–2 of these notes.
  2. Load DDL-MySQL.sql + the small dataset into the lab MySQL and run W1–W8 and R1 adapted to `instructor`/`takes`.
  3. Do practice exercises 5.9–5.11 and Q1–Q13.
  4. Skim the Ch.4 constraint slides and §3, then run the K2 deletes inside `START TRANSACTION … ROLLBACK`.
  5. Write T1 and T4 in MySQL and test them.
- Use the PostgreSQL docs to understand the *standard* the textbook teaches, and the MySQL manual for what will actually run in the lab. The translation tables in §1, §3 and §4 bridge the two.

### Gaps
- Stanford's free "Databases: Advanced Topics in SQL" course (constraints, triggers, OLAP) could not be verified: the edX URL tried (`edx.org/learn/databases/stanford-university-databases-advanced-topics-in-sql`) returned 404 on 2026-10-19.
- The SQLZoo, pgexercises and Mode pages were only checked to load. Their exercises were not reviewed.
