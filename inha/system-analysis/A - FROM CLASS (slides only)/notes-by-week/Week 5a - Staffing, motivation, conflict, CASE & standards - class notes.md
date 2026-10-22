# Week 5a — Staffing the project, motivation, conflict; environment & infrastructure (CASE, standards) (CLASS NOTES — from slides only)

> Source: 5_1_STAFFING_THE_PROJECT_and_ENVIRONMENT_AND_INFRASTRUCTURE_MANAGEMENT.pdf (SOC3070-002, Prof. Andrei Dragunov), 33 slides. Refs [W5a-S#].
> **Track A:** everything here comes from these slides. There is one exception: this deck asks the S2–S3 warm-up questions but doesn't contain their answers, so §5 answers them from the **W4 class slides**, cited as [W4-S#].
> **Legend:** ⭐ = the professor emphasized it on the slide (red title, bold or underline) or asked it as an in-class question · ⚠️ = apparent typo or inconsistency on the slide · 🔎 = not explained on the slides; look it up in Track B.

---

## 1. Big picture

- **Warm-up quiz (S2–S3).** It recaps last week's (W4) estimation material: project management as making **trade-offs**, **scope creep**, the **margins of error** for estimates (the Micah case) and what to do when a **schedule date is missed** (the Mya case). Answers are in §5.
- **Staffing the project has four jobs.** Decide **how many** people, **match skills** to the project's needs, **motivate** them and **minimize conflict**. The deliverables are a **staffing plan** (number and kinds of people plus the reporting structure) and a **project charter** (objectives and rules). [S4]
- **The goal is a jelled team.** DeMarco & Lister describe it as a team where "the whole is greater than the sum of the parts". It has **5 characteristics**: low turnover, identity, eliteness, team ownership and fun. The slides add **Ten Steps To More Productive Development Teams**. [S5, S8–S13]
- **Bigger teams lose efficiency.** The **Ringelmann effect** says individual productivity drops as the group grows. Communication lines multiply, and "**Adding staff resources does not translate into increased productivity**". Keep teams at **fewer than 8–10 people** and create **sub-teams**. [S6–S7, S14–S16]
- **Staffing plan.** Average staff = **total person-months ÷ optimal schedule**. The plan lists roles and the reporting structure: **project manager → functional lead (analysts) + technical lead (programmers)**. **Technical and interpersonal skills** both matter. [S14, S17–S18]
- **Motivation** is "the number one influence on people's performance". It is either **extrinsic** (external) or **intrinsic** (internal). Money is "the last thing that should be done". Use 21st-century principles instead: the **20 percent rule**, peer **"Now That" awards**, a free day that produces a deliverable, a **high-end development environment** and work that **makes a difference**. Avoid the 6 **motivational don'ts**. [S19–S25]
- **Conflict.** **Group cohesiveness** contributes more to productivity than individual capabilities do. Define roles clearly, hold people accountable, write a **project charter** and use the 6 **conflict-avoidance strategies**. [S26–S27]
- **Environment & infrastructure management.** The environment workflow chooses **tools and standards**; the infrastructure workflow chooses **documentation**. **CASE** comes in three kinds (**upper, lower and I-CASE**), has a list of benefits and is built around a **CASE repository** (also called the information repository or data dictionary). **Standards** keep shared work clear when people come and go, and there are **5 types**. [S28–S33]

---

## 2. Slide-by-slide notes

### [W5a-S1] Title slide — "System Analysis" / Dr. Dragunov / "Project Managment" ⚠️
- Title **System Analysis**; presenter **DR. DRAGUNOV**; small label in the bottom-right corner: **"Project Managment"**.
- ⚠️ "Managment" is a typo for **Management**.
- The label shows that this deck continues the **Project Management** topic. The file is "5_1 Staffing the project and environment & infrastructure management".

### [W5a-S2] (untitled) Warm-up quiz — PM as science/art; most common cause of overruns ⭐
⭐ **In-class quiz slide.** It has no title, only two fill-in-the-blank MCQs. The text is verbatim; the Q1/Q2 labels and option letters are mine.

> **Q1.** The science (or art) of project management is in making ___________ of size, time and cost.
> - (a) Benchmark comparisons
> - (b) Analytical and educated estimates
> - (c) Trade-offs
> - (d) Maximum calculations
> - (e) Minimum calculations
>
> **Q2.** The most common reason for schedule and cost overruns is ___________
> - (a) Team conflict
> - (b) Lack of communication from project manager to project team
> - (c) Lack of support by sponsor and champion
> - (d) Scope creep
> - (e) Adding people to a late project

- **Answers: Q1 = Trade-offs, Q2 = Scope creep.** This deck doesn't state them; the W4 class slides do. See §5.1–5.2.
- "Adding people to a late project" is only a distractor here, but the same idea comes back in this deck: "**Adding staff resources does not translate into increased productivity**" [S14].

### [W5a-S3] (untitled) Two class cases — Micah (estimate ranges) & Mya (project one week behind) ⭐
⭐ **In-class case questions.** The text is verbatim; the option letters are mine.

**Micah case:**

> Micah is a fairly new project manager. He estimated for a project plan (on the planning phase) that the project would cost \$50,000 and take 20 weeks. According to the margin of error guidelines for well-done estimates, that could range from:
> - (a) \$0 and \$100,000 – and between 15 and 25 weeks
> - (b) \$10,000 and \$60,000 – and between 12 and 28 weeks
> - (c) \$0 and \$100,000 – and between 0 and 40 weeks
> - (d) \$5,000 and \$100,000 – and between 10 and 30 weeks
> - (e) \$25,000 and \$75,000 – and between 10 and 30 weeks

**Mya case:**

> Mya is managing a project. Unfortunately, the entire project team lost four days due to a hurricane in the area and a couple of the project team lost even more time when dealing with insurance claims and rebuilding. At the six-week mark of a nine-week project, she figures the team is one week behind. What might be the BEST solution?
> - (a) Add several people to the project to get it back to schedule
> - (b) Do not change the schedule, but expect the project and development teams to work longer days and every-other weekend.
> - (c) Since the project is about 16% behind, increase the project to about 10-and-one-half weeks
> - (d) Since the project is about 20% behind, increase the project to about 12 week.
> - (e) Add three people to the project – AND – increase the overall project by one week (to a total of ten weeks)

- **Short answers: Micah = (a), Mya = (c).** The full reasoning is in §5.3–5.4.
  - The "margin of error guidelines" were taught in **W4** [W4-S37], not in this deck.
  - The rules for a missed schedule date are in [W4-S40–41].
- ⚠️ "about 12 week." should read "12 **weeks**" (minor).

### [W5a-S4] STAFFING THE PROJECT ⭐
⭐ The heading **"Staffing the project includes:"** is in **red bold**, and the deliverables are in **bold**.

> **Staffing the project includes:**
> - ❑ Determining how many people should be assigned to the project
> - ❑ Matching people's skills with the needs of the project
> - ❑ Motivating them to meet the project's objectives
> - ❑ Minimizing the conflict that will occur over time
>
> **The deliverables** for this part of project management **are a staffing plan**, which describes the number and kinds of people who will work on the project, the **overall reporting structure**, and the **project charter**, which describes the project's objectives and rules.

- In plain words:
  - The **staffing plan** says how many people, what kinds of people, and who reports to whom. S17 confirms that the staffing plan "lists the roles and the proposed reporting structure".
  - The **project charter** gives the project's objectives and rules. S26 adds that it "lists the project's norms and ground rules".
- **Exam tip:** the slide puts three phrases in bold: *staffing plan*, *overall reporting structure* and *project charter*. If you're asked for "the deliverables", name all three and say that the reporting structure is part of the staffing plan.
- The 4 bullets map onto the rest of the deck:
  - how many people → S14–S16
  - matching skills → S17–S18
  - motivating → S19–S25
  - minimizing conflict → S26–S27

### [W5a-S5] Jelled team ⭐
⭐ **Red title.** The sentence about the five characteristics is in **bold**.

> According to DeMarco and Lister\*, "[a] jelled team is a group of people so strongly knit that the whole is greater than the sum of the parts. The production of such a team is greater than that of the same people working in unjelled form." They go on to state that a jelled "team can become almost unstoppable, a juggernaut for success
>
> **Demarco and Lister identify five characteristics of a jelled team.**
>
> \* T. DeMarco and T. Lister, *Peopleware: Productive Projects and Teams*, 2nd Ed., p. 123.

- In plain words: a jelled team produces **more together** than the same people would produce "unjelled". It can become "almost unstoppable, a juggernaut for success".
- The **five characteristics** are on S8–S10 and listed in §4.2.
- ⚠️ The second quotation ("team can become almost unstoppable, a juggernaut for success) opens but **never closes**. The slide also spells the name both "DeMarco" and "Demarco". Neither affects the content.

### [W5a-S6] Ringelmann effect ⭐
⭐ The definition is **underlined** on the slide.

> The Ringelmann effect **is the tendency for individual members of a group to become increasingly less productive as the size of their group increases** *(underlined on the slide)*. This effect, discovered by French agricultural engineer Maximilien Ringelmann (1861–1931), illustrates the inverse relationship that exists between the size of a group and the magnitude of group members' individual contribution to the completion of a task.

- **Picture:** a photo of a **tug of war**. A row of people in navy and light-blue uniforms and caps lean back together, all pulling on one rope. The caption, verbatim:
  > A tug of war is often used as an illustration of the Ringelmann effect. As more people are involved in a task, their average performance decreases, each participant tending to feel that their own effort is not critical.
- **Key idea:** as **group size goes up**, each member's **individual contribution goes down**. The slide calls this an "inverse relationship".
- **Why, per the slide:** each person tends to feel that "**their own effort is not critical**".

### [W5a-S7] (graph) Ringelmann Effect
- **The graph in words.**
  - Title: "Ringelmann Effect". The x-axis is **Size of group** (0 to 8 people); the y-axis is **Performance** (0 to 800).
  - **"Potential"** is a **dashed straight line** rising from 0 to 800. Each added person would add the same amount, about 100.
  - **"Actual" / "Obtained output"** is a **solid line with triangle markers**. It follows the potential line up to 2 people (≈200), then **bends and flattens**. Read off the graph: ≈260 at 3, ≈310 at 4, ≈355 at 5, ≈380 at 6, ≈395 at 7 and ≈400 at 8.
  - The **shaded area between the two lines** is labelled **"Process loss"**. It widens as the group grows: at 8 people the potential is 800 but the actual output is only about 400, so roughly half is lost.
- **Take-away:** each extra person adds less and less output. This is the picture behind S14's "Adding staff resources does not translate into increased productivity".

### [W5a-S8] Characteristics of a Jelled Team ⭐
⭐ **Red title.** The ordinal words are in **bold**.

> ❑ **First**, jelled teams have a very low turnover during a project.
>
> Typically, members of a jelled team feel a responsibility to the other team members. This responsibility is felt so intensely that for a member to leave the team, the member would feel that they were letting the team down and that they were breaking a bond of trust.
>
> ❑ **Second**, jelled teams have a strong sense of identity.
>
> In many classes, when you are part of a group, the group chooses some cute name to identify the group and differentiate it from the other groups.

- In plain words:
  - **(1) Low turnover.** People don't leave, because leaving would feel like **letting the team down** and **breaking a bond of trust**.
  - **(2) Strong identity.** Think of a class group choosing a cute name to set itself apart from the other groups.

### [W5a-S9] (continued) Characteristics 3 and 4 ⭐

> ❑ **Third**, the strong sense of identity tends to lead the team into feeling a sense of eliteness.
>
> The members of a jelled development team almost have a swagger about the way they relate to nonteam employees.
>
> ❑ **Fourth**, during the development process, jelled teams feel that the team owns the information system being developed and not any one individual member.
>
> In many ways, you could almost say that jelled teams are a little communistic in nature. By this we mean that the individual contributions to the effort are not important to a true team. The only things that matter are the output of the team. However, this is not to imply that a member who does not deliver their fair share will not go unpunished. In a jelled team, any member who is not producing is actually breaking their bond of trust with the other team members.

- In plain words:
  - **(3) Eliteness.** It grows out of the strong identity: members have "a swagger" toward non-team employees.
  - **(4) The team owns the system,** not any one individual. Only the **team's output** matters.
- ⚠️ "this is not to imply that a member who does not deliver their fair share **will not go unpunished**" is a **double negative**, and read literally it says the opposite of what is meant. The next sentence makes the meaning clear: a member who doesn't produce "is actually **breaking their bond of trust** with the other team members". Team ownership is not a licence to slack.

### [W5a-S10] (continued) Characteristic 5 ⭐

> ❑ **The final** characteristic of a jelled team is that they really enjoy (have fun) doing their work.
>
> The members actually like to go to work and be with their team members. Much of this can be attributed to the level of challenge they receive. If the project is challenging and the members of the team are going to learn something from completing the project, the members of a jelled team will enjoy tackling the project.

- In plain words: **(5) They have fun.** Most of the fun comes from **challenge** and from **learning something** on the project.
- **Link:** this connects to **intrinsic motivation**, the "personal desire to overcome a challenge" [S19].

### [W5a-S11] Ten Steps To More Productive Development Teams (steps 1–2) ⭐
⭐ The step names are in **bold**.

> **1. Give Them Their Own Space**
>
> It is virtually impossible for a team to truely jell if its members are not all in one place. A lot of companies put their workers in individual cubicles that seem deliberately designed to stop them working effectively - they are shielded from their colleagues well enough to stop them communicating easily, but not well enough to stop them being distracted.
>
> **2. Try Agile Development Methods**

- **(1)** Put the whole team **in one place**. Individual cubicles are the worst of both worlds: they **block easy communication** but still **let distractions in**.
- **(2)** is a heading only; the slide doesn't explain it.
- ⚠️ "truely" → **truly**.

### [W5a-S12] Ten Steps (steps 3–4) ⭐

> **3. Maximise Communication, Minimise Bureaucracy**
>
> A key to creating a high performance team is open, honest, face-to-face communication. Here are some ways to improve communication:
> - Have daily standup meetings so that each team member knows what the others are doing that day.
> - Encourage Pair Programming - two developers working together on a single PC.
> - Have group design sessions round a whiteboard instead of people working in isolation with a CASE tool.
>
> **4. No More Heroes**
>
> Discourage programmer heroics. Many teams have a 'lone ranger' who works in secrecy churning out large volumes of complex code that no-one else understands.

- **(3)** Aim for **open, honest, face-to-face** communication. The slide gives three ways to get it:
  - **daily standup meetings**
  - **pair programming** (two developers at one PC)
  - **whiteboard group design sessions** instead of people working alone with a CASE tool
- **(4)** No **"lone rangers"**: nobody should secretly turn out large amounts of complex code that no one else understands.
- "Maximise" and "Minimise" are British spellings, not typos.

### [W5a-S13] Ten Steps (steps 5–10) ⭐

> **5. Let Them Grow**
>
> **6. Give them Play Time and Rest Time**
>
> **7. Trust the Team**
>
> **8. Work Iteratively and Incrementally**
>
> **9. Use Test First Design**
>
> Test First Design (sometimes called Test Driven Development) means that you write the tests before you write the code to make the test pass.
>
> **10. Get A Team Coach**

- Only **step 9** is explained. **Test First Design** is also called **Test Driven Development**: you **write the tests first**, then write the code that makes the tests pass.
- Steps 2, 5, 6, 7, 8 and 10 are **headings only**.
  - 🔎 Look up in Track B: what these steps mean in practice, for example what a team coach does.
- **Memory hook for all 10 steps:** Space · Agile · Communicate · No heroes · Grow · Play/Rest · Trust · Iterate · Test-first · Coach.

### [W5a-S14] Staffing Plan ⭐
⭐ **Red title**, with **bold** key phrases.

> The **first step** to staffing is **determining the average number of staff needed for the project**. To calculate this figure, divide the total person-months of effort by the optimal schedule. So to complete a forty-person-month project in ten months, a team should have an average of four full-time staff members, although this may change over time as different specialists enter and leave the team (e.g., business analysts, programmers, technical writers).
>
> **Adding staff resources does not translate into increased productivity**; staff size and productivity share a disproportionate relationship, mainly because it is more difficult to coordinate a large number of staff members. The more a team grows, the more difficult it becomes to manage.

- **Formula:** average staff = total person-months of effort ÷ optimal schedule (in months).
- **Slide example:** 40 person-months ÷ 10 months = **4 full-time staff on average**. The actual number rises and falls as specialists join and leave (business analysts, programmers, technical writers).
- **Adding people does not add output in proportion.** The slide calls the relationship "disproportionate", and the reason is **coordination**: a bigger team is harder to manage. The Ringelmann graph on S7 shows the same message.

### [W5a-S15] (pictures only) Team size and communication lines
- **The slide has no text.** It shows teams of stick figures in which **every person is linked to every other person by a line**, one line for each pair who must communicate.
  - **Visible:** a **"Two-person team"** in the top-left (2 figures, 1 line). In front of everything is a large **"Eight-person team"**: 8 figures in a ring, each linked to all 7 others, which makes a dense web of crossing lines.
  - **Partly hidden:** two more pictures sit behind the eight-person one. Only a stray "F…" and parts of figures show. The PDF file shows they are a **"Four-person team"** and a **"Six-person team"**.
  - **Counting the lines drawn:** 2 people → 1 line, 4 → 6, 6 → 15, 8 → 28. The number of links grows **much faster** than the number of people.
- **Meaning, in this deck's own words:**
  - "it is more difficult to coordinate a large number of staff members. The more a team grows, the more difficult it becomes to manage" [S14]
  - you must "understand the complexity that is created in numbers" [S16]

### [W5a-S16] (untitled) Keep teams small; create sub-teams

> One way to reduce efficiency losses on teams is to understand the complexity that is created in numbers and to build in a reporting structure that tempers its effects. The general rule is to keep team sizes to fewer than eight to ten people; therefore,
>
> if more people are needed, create sub-teams. In this way, the project manager can keep the communication effective within small teams, which, in turn, communicate to a contact at a higher level in the project

- **Rule:** keep teams to **fewer than 8–10 people**. If you need more people, **create sub-teams**.
- Each small team communicates effectively inside itself and then reports to **a contact at a higher level** in the project. This reporting structure "tempers" the complexity; S18 shows an example.
- ⚠️ Layout quirk: the slide breaks one sentence across two paragraphs after "therefore," and the sentence has no final period. Read it as one rule: *fewer than 8–10 people; otherwise, sub-teams.*

### [W5a-S17] Staffing Plan — roles & reporting structure ⭐
⭐ **Red title.** ***staffing plan*** and ***functional lead*** are in **bold-italic**, and **technical lead** is in **bold**.

> After the project manager understands how many people are needed for the project, he or she creates a ***staffing plan*** that lists the roles and the proposed reporting structure that are required for the project. Typically, a project has one project manager, who oversees the overall progress of the development effort, with the core of the team comprising the various types of analysts. A ***functional lead*** is usually assigned to manage a group of analysts, and a **technical lead** oversees the progress of a group of programmers and more technical staff members.
>
> There are many structures for project teams; Next Figure illustrates one possible configuration of a project team.

- **Order of work:** first work out *how many* people are needed (S14), then write the **staffing plan**, which lists the **roles + the proposed reporting structure**.
- **Roles:**
  - **Project manager:** one per project; oversees the overall progress.
  - **Analysts:** the various types of analysts form the core of the team.
  - **Functional lead:** manages a group of **analysts**.
  - **Technical lead:** oversees a group of **programmers and more technical staff**.

### [W5a-S18] Possible configuration of a project team
- **The org chart in words.** It is a 3-level tree:
  - **Top:** **Project manager**.
  - **Middle:** two boxes under the PM, **Functional lead** on the left and **Technical lead** on the right.
  - **Bottom:** **three Analysts** under the functional lead, and **two Programmers** under the technical lead.

```
                     Project manager
                    /               \
          Functional lead         Technical lead
          /      |      \           /         \
     Analyst  Analyst  Analyst  Programmer  Programmer
```

- **Caption, verbatim:** "When you make assignments, remember that people have *technical skills* and *interpersonal skills*, and both are important on a project." Both skill types are in italics on the slide.
- This is only "one possible configuration". S17 says there are **many** structures for project teams.

### [W5a-S19] Motivation ⭐
⭐ **Red title.** **Types of Motivation**, **Extrinsic motivation** and **Intrinsic motivation** are in **bold**.

> Assigning people to tasks isn't enough; project managers need to motivate the people to make the project a success. *Motivation* has been found to be the number one influence on people's performance, but determining how to motivate the team can be quite difficult.
>
> **Types of Motivation**
>
> There are two main types of motivation – extrinsic and intrinsic.
>
> **Extrinsic motivation** is when you use external factors to encourage your team to do what you want. Pay raises, time off, bonus checks, and the threat of job loss are all extrinsic motivators – some positive, some less so.
>
> **Intrinsic motivation** is internal. It's about having a personal desire to overcome a challenge, to produce high-quality work, or to interact with team members you like and trust. Intrinsically motivated people get a great deal of satisfaction and enjoyment from what they do.

- **Key line:** motivation is "**the number one influence on people's performance**", but working out how to motivate a team "can be quite difficult".
- **Extrinsic = external factors.** Examples: pay raises, time off, bonus checks, the threat of job loss. The slide calls them "some positive, some less so"; the threat of job loss is clearly one of the "less so".
- **Intrinsic = an internal, personal desire:**
  - to overcome a challenge
  - to produce high-quality work
  - to work with team members you like and trust

  It brings satisfaction and enjoyment.

### [W5a-S20] Types of Motivation (picture)
- **Picture:** a light-blue infographic titled **"Types of Motivation"** with two numbered boxes. A source link sits at the bottom left: `https://habr.com/ru/companies/psb/articles/938116/`.

| 1 — Intrinsic Motivation | 2 — Extrinsic Motivation |
|---|---|
| Attitude Motivation | Fear Motivation |
| Competence Motivation | Incentive Motivation |
| Achievement Motivation | Social Motivation |
| Physiological Motivation | Power Motivation |
| Creative Motivation | Identified Motivation |
| Introjected Motivation | — |

- That makes **6 intrinsic** and **5 extrinsic** sub-types. The slide gives only their names, with no explanations.
- 🔎 Look up in Track B: what each of these 11 sub-types means.

### [W5a-S21] (untitled) Money is not the answer; the 20 percent rule ⭐
⭐ The key sentence and "First rule suggests" are in **bold**.

> You might think that good project managers motivate their staff by rewarding them with money and bonuses, but most project managers agree that this is the last thing that should be done. **The more often managers reward team members with money, the more they expect it—and most times monetary motivation won't work.** There are a set of principles to follow to motivate individuals in twenty-first century firms.
>
> **First rule suggests** that 20 percent of an employee's time should be spent on some idea in which they believe. The project does not have to be related in any way to the project at hand. On the surface, this sounds like a colossal waste of time, but you should not throw this idea away. Have you used Gmail? This is how Google's Gmail and Google News became software products. If 20 percent sounds too high, Some authors suggests that you consider 10 percent to begin with.

- Money and bonuses are "**the last thing that should be done**". The more often managers reward with money, the more people **expect** it, and "most times monetary motivation won't work".
- **Principle 1, the 20 percent rule:**
  - **20%** of an employee's time goes to **an idea they believe in**.
  - The idea can be **completely unrelated** to the current project.
  - Real examples from the slide: **Gmail** and **Google News**.
  - If 20% sounds too high, start with **10%**.
- ⚠️ "Some authors suggests" has a capital "S" in mid-sentence, and the verb should be "suggest". Minor.

### [W5a-S22] (untitled) "Now That" awards; a day to work on anything ⭐
⭐ "**fund small 'Now That' awards**" and "**Next,**" are in **bold**.

> Another recommendation that firms should be willing to **fund small "Now That" awards**. These awards are given as small signs of appreciation for doing a great job. However, these awards are not given by a manager to an employee but from an employee to a peer of the employee. The awards are monetary, but they are very small, typically \$50. As such, they really are not relevant from a monetary perspective. However, they are very relevant because they are given by one of the employee's colleagues to show that some action that the employee did was appreciated.
>
> **Next,** management should periodically consider giving each employee a day on which they can work on anything they want. In some ways, this is related to the 20 percent rule. It does not necessarily require one day a week (20 percent), but it does require some deliverable. The deliverable can be a new utility program that could be used by lots of different projects, it could be a new prototype of a new software product, or it could be an improvement for a business process that is used internally.

- **"Now That" awards:**
  - **Peer to peer:** an employee gives one to a colleague, **not** a manager to an employee.
  - **Monetary but tiny:** typically **\$50**.
  - What matters is that **a colleague** noticed and appreciated the work, not the money.
- **A day to work on anything:**
  - Given **periodically**, not necessarily one day a week.
  - It **requires a deliverable**. The slide's three examples:
    - a new **utility program** that many projects could use
    - a new **prototype** of a new software product
    - an **improvement to an internal business process**
- ⚠️ "Another recommendation that firms should…" is missing a word: it should read "Another recommendation **is** that…". Minor.

### [W5a-S23] (untitled) High-end development environment; making a difference ⭐
⭐ "**high-end development environment**" is in **bold**.

> It also could imply providing the team member with a **high-end development environment**. For example, when building information visualization and virtual reality applications, special hardware and software environments can make it much easier to master the technology to develop the application.
>
> Finally, today it is very important for team members to feel that what they are doing can make a difference. A team leader should encourage the team members to tackle problems that can make a difference in people's lives. This can easily be accomplished through the use of the 20 percent rule. Next figure lists some motivational don'ts to avoid demotivating team members.

- **High-end development environment:** give people **special hardware and software**, for example when they build information visualization or virtual reality applications. It makes the technology much easier to master.
- **Making a difference:** a team leader should encourage people to tackle problems that **"can make a difference in people's lives"**. The **20 percent rule** makes this easy.
- "Next figure" refers to the table of don'ts on S24.

### [W5a-S24] Motivational don'ts (table)
**The full table.** The header row reads **Don'ts | Reasons**.

| Don'ts | Reasons |
|---|---|
| Assign unrealistic deadlines | Few people will work hard if they realize that a deadline is impossible to meet. |
| Ignore good efforts | People will work harder if they feel like their work is appreciated. Often, all it takes is public praise for a job well done. |
| Create a low-quality product | Few people can be proud of working on a project that is of low quality. |
| Give everyone on the project a raise | If everyone is given the same reward, then high-quality people will believe that mediocrity is rewarded—and they will resent it. |
| Make an important decision without the team's input | Buy-in is very important. If the project manager needs to make a decision that greatly affects the members of her team, she should involve them in the decision-making process. |
| Maintain poor working conditions | A project team needs a good working environment or motivation will go down the tubes. This includes lighting, desk space, technology, privacy from interruptions, and reference resources. |

- **Source line under the table:** *Source: Steve McConnell, Adapted Rapid Development (Redmond, WA: Microsoft Press, 1996).*
  - ⚠️ The credit line looks garbled: "Adapted" is italicized as if it were part of the book title. If you cite it, just say Steve McConnell, Microsoft Press, 1996.
  - The screenshot also has a stray text-cursor mark inside "on|the"; ignore it.
- **Keywords for the 6 don'ts:** unrealistic **Deadlines** · ignore good **Efforts** · low **Quality** · same **Raise** for all · **Decide** without the team · poor working **Conditions**.

### [W5a-S25] (untitled) In-class question — motivation "EXCEPT" ⭐
⭐ **In-class quiz question.** The text is verbatim; the option letters are mine.

> Suggestions for motivation might include all of these EXCEPT:
> - (a) Setting realistic deadlines
> - (b) Giving all team members the same bonus on a project
> - (c) Recognize and reward good efforts
> - (d) Reward those with outstanding quality and effort
> - (e) Having a good working environment

- **Answer: (b).** It is the S24 don't "Give everyone on the project a raise": "If everyone is given the same reward, then high-quality people will believe that mediocrity is rewarded—and they will resent it."
- The other four options are the **opposites of S24 don'ts**. The full mapping is in §5.5.

### [W5a-S26] Handling Conflict ⭐
⭐ **Red title.** *Group cohesiveness* is italicized as a key term.

> The third component of staffing is organizing the project to minimize conflict among group members. *Group cohesiveness* (the attraction that members feel to the group and to other members) contributes more to productivity than do project members' individual capabilities or experiences.
>
> Clearly defining the roles on the project and holding team members accountable for their tasks is a good way to begin mitigating potential conflict on a project. Some project managers develop a project charter, which lists the project's norms and ground rules. For example, the charter may describe when the project team should be at work, when staff meetings will be held, how the group will communicate with each other, and the procedures for updating the workplan as tasks are completed.

- **Group cohesiveness** is "the attraction that members feel to the group and to other members". ⭐ It contributes **more to productivity than individual capabilities or experiences** do.
- **How to start reducing conflict:**
  - **clearly define the roles**
  - **hold members accountable** for their tasks
  - write a **project charter** listing the project's **norms and ground rules**
- **What a charter may describe (slide examples):**
  - when the team should be **at work**
  - when **staff meetings** will be held
  - **how the group will communicate** with each other
  - the **procedures for updating the workplan** as tasks are completed
- ⚠️ **Inconsistency:** this slide calls conflict "**the third** component of staffing", but on S4 minimizing conflict is the **fourth** bullet.
  - The deck's own order explains it: (1) the staffing plan, which covers how many people and matching skills [S14–S18]; (2) motivation [S19–S25]; (3) conflict [S26–S27].
  - If an exam asks for "the third component of staffing", answer **organizing the project to minimize conflict**.

### [W5a-S27] Conflict-Avoidance Strategies
**The boxed list in full:**

> - Clearly define plans for the project.
> - Make sure the team understands how the project is important to the organization.
> - Develop detailed operating procedures and communicate these to the team members.
> - Develop a project charter.
> - Develop schedule commitments ahead of time.
> - Forecast other priorities and their possible impact on the project.
>
> *Source: H. J. Thamhain and D. L. Wilemon, "Conflict Management in Project Life Cycles," Sloan Management Review (Spring 1975).*

- There are **6 strategies**. Keywords: **Plans · Importance to the organization · Operating procedures · Charter · Schedule commitments · Forecast other priorities**.
- The **project charter** shows up on S4, S26 and S27, so it is the deck's recurring tool for preventing conflict.

### [W5a-S28] ENVIRONMENT AND INFRASTRUCTURE MANAGEMENT

> The environment and infrastructure management workflows support the development team throughout the development process. The environment workflow primarily deals with choosing the correct set of tools that will be used throughout the development process and identifying the appropriate set of standards to be followed during the development process.
>
> Infrastructure management workflow deals with choosing the appropriate level and type of documentation that will be created during the development process.

| Workflow | Deals with |
|---|---|
| **Environment** workflow | choosing the correct set of **tools** (→ CASE, S29–S31) **and** identifying the appropriate set of **standards** (→ S32–S33) |
| **Infrastructure management** workflow | choosing the appropriate **level and type of documentation** |

- Both workflows **support the development team throughout the development process**.

### [W5a-S29] CASE Tools ⭐
⭐ The CASE definition is in italics, and the three tool types are in **bold-italic**.

> *Computer-aided software engineering (CASE)* is a category of software that automates all or part of the development process.
>
> ***upper CASE*** — CASE software packages that are used primarily to support the analysis workflow to create integrated diagrams of the system and to store information regarding the system components
>
> ***lower CASE*** — Support the design workflow that can be used to generate code for database tables and system functionality
>
> ***Integrated CASE, or I-CASE*** — contains functionality found in both upper CASE and lower CASE tools in that it supports tasks that happen throughout the system-development process.

| Type | Supports | Does what |
|---|---|---|
| **Upper CASE** | the **analysis** workflow | creates integrated **diagrams** of the system; **stores information** about system components |
| **Lower CASE** | the **design** workflow | can **generate code** for database tables and system functionality |
| **I-CASE** (Integrated CASE) | the **whole** system-development process | has the functionality of **both** upper and lower CASE |

- **Memory hook:** **upper = analysis (diagrams), lower = design (code), integrated = both.**

### [W5a-S30] Benefits of using CASE

> With CASE tools, tasks can be completed and altered much faster, development information is centralized, and information is illustrated through diagrams, which are typically easier to understand. Potentially, CASE can reduce maintenance costs, improve software quality, and enforce discipline. Some project teams even use CASE to assess the magnitude of changes to the project. Many modern CASE tools that support object-oriented systems development support a development technique known as round-trip engineering.

- **The same paragraph as a list,** in the slide's wording:
  1. tasks can be **completed and altered much faster**
  2. development information is **centralized**
  3. information is **illustrated through diagrams**, which are typically easier to understand
  4. *potentially* **reduces maintenance costs**
  5. *potentially* **improves software quality**
  6. *potentially* **enforces discipline**
  7. some teams use CASE to **assess the magnitude of changes** to the project
  8. many modern CASE tools that support object-oriented development support **round-trip engineering**
- Notice the hedge: items 4–6 come after the word **"Potentially"**.
- 🔎 Look up in Track B: what "round-trip engineering" is. The slide names it but doesn't define it.

### [W5a-S31] CASE repository

> The central component of any CASE tool is the *CASE repository*, otherwise known as the information repository or data dictionary. The CASE repository stores the diagrams and other project information, such as screen and report designs, and it keeps track of how the diagrams fit together. For example, most CASE tools warn you if you place a field on a screen design that doesn't exist in your structural model. As the project evolves, project team members perform their tasks using CASE.

- **CASE repository** = the **central component of any CASE tool**. It has **two other names**: the **information repository** and the **data dictionary**.
- **What it does:**
  - It **stores** the diagrams and other project information, such as **screen and report designs**.
  - It **keeps track of how the diagrams fit together.** Slide example: most CASE tools **warn you if you put a field on a screen design that doesn't exist in your structural model**.
- 🔎 Look up in Track B: "structural model". The slide uses the term but this deck doesn't define it.

### [W5a-S32] Standards

> Members of a project team need to work together, and most project management software and CASE tools provide access privileges to everyone working on the system. When people work together, however, things can get pretty confusing. To make matters worse, people sometimes are reassigned in the middle of a project. It is important that their project knowledge does not leave with them and that their replacements can get up to speed quickly.

- **Why standards are needed,** per the slide:
  1. Everyone working on the system has **access privileges** through the PM software and CASE tools. When many people work together, things can get **"pretty confusing"**.
  2. People are sometimes **reassigned in the middle of a project**. Their **project knowledge must not leave with them**, and their **replacements must get up to speed quickly**.
- This slide gives the *purpose* of standards. The *types* are on S33.

### [W5a-S33] Types of Standards (table)
**The full table.** The header row reads **Types of Standards | Examples**. This table has no source line.

| Types of Standards | Examples |
|---|---|
| **Documentation standards** | The date and project name should appear as a header on all documentation. · All margins should be set to 1 inch. · All deliverables should be added to the project binder and recorded in its table of contents. |
| **Coding standards** | All modules of code should include a header that lists the programmer, last date of update, and a short description of the purpose of the code. · Indentation should be used to indicate loops, if-then-else statements, and case statements. · On average, every program should include one line of comments for every five lines of code. |
| **Procedural standards** | Record actual task progress in the work plan every Monday morning by 10 AM. · Report to project update meeting on Fridays at 3:30 PM. · All changes to a requirements document must be approved by the project manager. |
| **Specification requirement standards** | Name of program to be created · Description of the program's purpose · Special calculations that need to be computed · Business rules that must be incorporated into the program · Pseudocode · Due date |
| **User interface design standards** | Labels will appear in boldface text, left-justified, and followed by a colon. · The tab order of the screen will move from top left to bottom right. · Accelerator keys will be provided for all updatable fields. |

- **The 5 types:** Documentation · Coding · Procedural · Specification requirement · User interface design.
- **How to classify an example in an MCQ:**

| If the example is about… | It's a… |
|---|---|
| how documents look and are filed | **documentation** standard |
| how code is written, laid out or commented | **coding** standard |
| when or how people record, report or approve things | **procedural** standard |
| what a program specification must contain | **specification requirement** standard |
| how screens look and behave | **user interface design** standard |

---

## 3. Definitions & key terms

Quotes are verbatim from the slides. "(plain words)" marks my own wording of something the slide shows without a sentence definition.

| Term | Definition (slide wording) | Ref |
|---|---|---|
| **Staffing the project** | includes "Determining how many people should be assigned to the project · Matching people's skills with the needs of the project · Motivating them to meet the project's objectives · Minimizing the conflict that will occur over time" | S4 |
| **Staffing plan** | "describes the number and kinds of people who will work on the project, the overall reporting structure" (S4); "lists the roles and the proposed reporting structure that are required for the project" (S17) | S4, S17 |
| **Project charter** | "describes the project's objectives and rules" (S4); "lists the project's norms and ground rules" (S26) | S4, S26 |
| **Jelled team** | "a group of people so strongly knit that the whole is greater than the sum of the parts. The production of such a team is greater than that of the same people working in unjelled form." (DeMarco & Lister, *Peopleware*) | S5 |
| **Ringelmann effect** | "the tendency for individual members of a group to become increasingly less productive as the size of their group increases"; it "illustrates the inverse relationship that exists between the size of a group and the magnitude of group members' individual contribution to the completion of a task" | S6 |
| **Process loss** | (plain words) the label on the shaded gap between the "Potential" and "Actual / Obtained output" lines in the Ringelmann graph; it grows as the group grows | S7 |
| **'Lone ranger'** | a programmer "who works in secrecy churning out large volumes of complex code that no-one else understands" (step 4: discourage this) | S12 |
| **Daily standup meetings** | held "so that each team member knows what the others are doing that day" | S12 |
| **Pair Programming** | "two developers working together on a single PC" | S12 |
| **Test First Design** (= Test Driven Development) | "means that you write the tests before you write the code to make the test pass" | S13 |
| **Average number of staff** | "divide the total person-months of effort by the optimal schedule" (40 person-months ÷ 10 months = 4) | S14 |
| **Project manager** | "oversees the overall progress of the development effort" | S17 |
| **Functional lead** | "usually assigned to manage a group of analysts" | S17 |
| **Technical lead** | "oversees the progress of a group of programmers and more technical staff members" | S17 |
| **Motivation** | "has been found to be the number one influence on people's performance" | S19 |
| **Extrinsic motivation** | "when you use external factors to encourage your team to do what you want" (pay raises, time off, bonus checks, threat of job loss) | S19 |
| **Intrinsic motivation** | "is internal. It's about having a personal desire to overcome a challenge, to produce high-quality work, or to interact with team members you like and trust" | S19 |
| **20 percent rule** | "20 percent of an employee's time should be spent on some idea in which they believe" (it need not be related to the project; start with 10 percent) | S21 |
| **"Now That" awards** | "small signs of appreciation for doing a great job … not given by a manager to an employee but from an employee to a peer of the employee … monetary, but … very small, typically \$50" | S22 |
| **Group cohesiveness** | "the attraction that members feel to the group and to other members"; it "contributes more to productivity than do project members' individual capabilities or experiences" | S26 |
| **Environment workflow** | "primarily deals with choosing the correct set of tools that will be used throughout the development process and identifying the appropriate set of standards to be followed during the development process" | S28 |
| **Infrastructure management workflow** | "deals with choosing the appropriate level and type of documentation that will be created during the development process" | S28 |
| **CASE** (computer-aided software engineering) | "a category of software that automates all or part of the development process" | S29 |
| **Upper CASE** | "CASE software packages that are used primarily to support the analysis workflow to create integrated diagrams of the system and to store information regarding the system components" | S29 |
| **Lower CASE** | "Support the design workflow that can be used to generate code for database tables and system functionality" | S29 |
| **Integrated CASE (I-CASE)** | "contains functionality found in both upper CASE and lower CASE tools in that it supports tasks that happen throughout the system-development process" | S29 |
| **Round-trip engineering** | only named, as "a development technique" that many modern object-oriented CASE tools support; **not defined** 🔎 | S30 |
| **CASE repository** (= information repository = data dictionary) | "The central component of any CASE tool … stores the diagrams and other project information, such as screen and report designs, and it keeps track of how the diagrams fit together" | S31 |
| **Standards** | no one-line definition. Purpose: shared work gets "pretty confusing", and people get reassigned, so "their project knowledge does not leave with them and … their replacements can get up to speed quickly"; 5 types on S33 | S32–S33 |

---

## 4. Lists to memorize (exactly as on the slides)

### 4.1 Staffing the project includes (4 items) [S4]
1. Determining how many people should be assigned to the project
2. Matching people's skills with the needs of the project
3. Motivating them to meet the project's objectives
4. Minimizing the conflict that will occur over time

**Deliverables:**
- a **staffing plan**: the number and kinds of people who will work on the project, and the **overall reporting structure**
- the **project charter**: the project's objectives and rules

### 4.2 Five characteristics of a jelled team (DeMarco & Lister) [S8–S10]
1. **First**, jelled teams have a very low turnover during a project.
2. **Second**, jelled teams have a strong sense of identity.
3. **Third**, the strong sense of identity tends to lead the team into feeling a sense of eliteness.
4. **Fourth**, during the development process, jelled teams feel that the team owns the information system being developed and not any one individual member.
5. **The final** characteristic of a jelled team is that they really enjoy (have fun) doing their work.

Keywords: **Low turnover · Identity · Eliteness · Team ownership · Fun**

### 4.3 Ten Steps To More Productive Development Teams [S11–S13]
1. Give Them Their Own Space
2. Try Agile Development Methods
3. Maximise Communication, Minimise Bureaucracy. The slide's ways to do it:
   - daily standup meetings
   - Pair Programming
   - group design sessions round a whiteboard
4. No More Heroes
5. Let Them Grow
6. Give them Play Time and Rest Time
7. Trust the Team
8. Work Iteratively and Incrementally
9. Use Test First Design
10. Get A Team Coach

### 4.4 Team size & staffing-plan rules [S14, S16–S18]
- **Average staff** = total person-months of effort ÷ optimal schedule. Example: 40 ÷ 10 = **4** full-time staff.
- "**Adding staff resources does not translate into increased productivity**". Staff size and productivity share "a disproportionate relationship".
- Keep team sizes to **fewer than eight to ten people**. If more people are needed, **create sub-teams**.
- **Possible team configuration:**
  - Project manager → **Functional lead** → Analyst, Analyst, Analyst
  - Project manager → **Technical lead** → Programmer, Programmer
- Assignments must consider both **technical skills** and **interpersonal skills**.

### 4.5 Types of motivation [S19–S20]
- **Extrinsic** (external factors): pay raises, time off, bonus checks, the threat of job loss.
- **Intrinsic** (internal): the desire to overcome a challenge, to produce high-quality work, or to interact with team members you like and trust.
- **Sub-types in the S20 picture:**
  - *Intrinsic:* Attitude, Competence, Achievement, Physiological, Creative, Introjected
  - *Extrinsic:* Fear, Incentive, Social, Power, Identified

### 4.6 Motivation DO's: principles for twenty-first century firms [S21–S23]
*Starting point: money and bonuses are "the last thing that should be done."*
1. **20 percent rule.** 20 percent of an employee's time goes to some idea in which they believe. Gmail and Google News came from this. Start with 10 percent if needed.
2. **Fund small "Now That" awards.** They go from an employee to a peer and are typically \$50.
3. **Periodically give each employee a day to work on anything they want,** as long as it produces some deliverable: a utility program, a prototype, or an improvement to an internal business process.
4. **Provide a high-end development environment,** meaning special hardware and software environments.
5. **Let team members feel that what they do can make a difference.** Encourage them to tackle problems that can make a difference in people's lives, for example through the 20 percent rule.

The S25 quiz lists four more valid "do" suggestions:
- Setting realistic deadlines
- Recognize and reward good efforts
- Reward those with outstanding quality and effort
- Having a good working environment

### 4.7 Motivational DON'Ts, with the slide's reasons [S24]
1. **Assign unrealistic deadlines.** Few people will work hard if they realize that a deadline is impossible to meet.
2. **Ignore good efforts.** People will work harder if they feel like their work is appreciated. Often, all it takes is public praise for a job well done.
3. **Create a low-quality product.** Few people can be proud of working on a project that is of low quality.
4. **Give everyone on the project a raise.** If everyone is given the same reward, then high-quality people will believe that mediocrity is rewarded—and they will resent it.
5. **Make an important decision without the team's input.** Buy-in is very important. If the project manager needs to make a decision that greatly affects the members of her team, she should involve them in the decision-making process.
6. **Maintain poor working conditions.** A project team needs a good working environment or motivation will go down the tubes. This includes lighting, desk space, technology, privacy from interruptions, and reference resources.

### 4.8 Handling conflict: first steps and what a charter may describe [S26]
- **First steps:**
  - clearly define the roles on the project
  - hold team members accountable for their tasks
  - develop a project charter, which lists the project's norms and ground rules
- **A charter may describe:**
  - when the project team should be at work
  - when staff meetings will be held
  - how the group will communicate with each other
  - the procedures for updating the workplan as tasks are completed

### 4.9 Conflict-Avoidance Strategies (6) [S27]
1. Clearly define plans for the project.
2. Make sure the team understands how the project is important to the organization.
3. Develop detailed operating procedures and communicate these to the team members.
4. Develop a project charter.
5. Develop schedule commitments ahead of time.
6. Forecast other priorities and their possible impact on the project.

*(Source on the slide: Thamhain & Wilemon, Sloan Management Review, 1975.)*

### 4.10 Environment vs infrastructure management workflows [S28]
- **Environment workflow:** choose the correct set of **tools** and identify the appropriate set of **standards**.
- **Infrastructure management workflow:** choose the appropriate **level and type of documentation**.

### 4.11 Three kinds of CASE [S29]
1. **Upper CASE** supports the **analysis** workflow: integrated diagrams and stored information about system components.
2. **Lower CASE** supports the **design** workflow: it can generate code for database tables and system functionality.
3. **Integrated CASE (I-CASE)** has the functionality of both and supports tasks throughout the system-development process.

### 4.12 Benefits of using CASE [S30]
1. Tasks can be completed and altered much faster.
2. Development information is centralized.
3. Information is illustrated through diagrams, which are typically easier to understand.
4. *Potentially:* reduce maintenance costs.
5. *Potentially:* improve software quality.
6. *Potentially:* enforce discipline.
7. Some teams use CASE to assess the magnitude of changes to the project.
8. Many modern object-oriented CASE tools support round-trip engineering.

### 4.13 CASE repository [S31]
- **Also called:** information repository, data dictionary.
- **Stores:** diagrams and other project information, such as screen and report designs.
- **Keeps track of how the diagrams fit together.** Example: a warning if a field on a screen design doesn't exist in the structural model.

### 4.14 Why standards are needed [S32]
1. Many people have access privileges, and working together "can get pretty confusing".
2. People get reassigned mid-project. Their project knowledge must not leave with them, and their replacements must get up to speed quickly.

### 4.15 Types of Standards (5), each with one example [S33]
1. **Documentation standards.** Example: "The date and project name should appear as a header on all documentation."
2. **Coding standards.** Example: "On average, every program should include one line of comments for every five lines of code."
3. **Procedural standards.** Example: "Record actual task progress in the work plan every Monday morning by 10 AM."
4. **Specification requirement standards.** The spec must contain: name of program, description of the program's purpose, special calculations, business rules, pseudocode, due date.
5. **User interface design standards.** Example: "The tab order of the screen will move from top left to bottom right."

All examples are in the S33 table.

---

## 5. Cases & questions from class, answered from the slides

> The S2 and S3 questions test W4 material, and this deck does **not** contain their answers. The answers below therefore quote the **W4 class slides** [W4-S#]. That is still class material (Track A), not outside research. The S25 question is answered from this deck alone.

### 5.1 [S2] Q1: "The science (or art) of project management is in making ___ of size, time and cost."
**Answer: (c) Trade-offs.**
- W4 states it word for word: "The science (or art) of project management is in making **trade-offs** among three important concepts: the functionality of the system, the time to complete the project (when the project will be finished), and the cost of the project." [W4-S26]
- The question's "size" corresponds to W4's "functionality of the system".
- "Analytical and educated estimates" is the tempting distractor, because W4 discusses estimation on the same slide. But the quoted sentence ends in *trade-offs*.

### 5.2 [S2] Q2: "The most common reason for schedule and cost overruns is ___"
**Answer: (d) Scope creep.**
- W4: "the most common reason for schedule and cost overruns—scope creep—occurs after the project is under way. Scope creep happens when new requirements are added to the project after the original project scope was defined and frozen." [W4-S33]
- Two distractors are real problems that this deck discusses, which is what makes them tempting:
  - **team conflict** (S26–S27)
  - **adding people to a late project** (S14: "Adding staff resources does not translate into increased productivity")

  They are problems, but not "the most common reason".

### 5.3 [S3] The Micah case
> Micah is a fairly new project manager. He estimated for a project plan (on the planning phase) that the project would cost \$50,000 and take 20 weeks. According to the margin of error guidelines for well-done estimates, that could range from:
> - (a) \$0 and \$100,000 – and between 15 and 25 weeks
> - (b) \$10,000 and \$60,000 – and between 12 and 28 weeks
> - (c) \$0 and \$100,000 – and between 0 and 40 weeks
> - (d) \$5,000 and \$100,000 – and between 10 and 30 weeks
> - (e) \$25,000 and \$75,000 – and between 10 and 30 weeks

**Answer: (a) \$0 and \$100,000, and between 15 and 25 weeks.**
- **The rule** comes from W4's hurricane-model slide, not from this deck: "a well-done project plan (prepared at the end of inception) has a **100 percent margin of error for project cost** and a **25 percent margin of error for schedule time**." [W4-S37]
- Micah's estimate is a **project plan**, the earliest kind of estimate, so the rule applies:
  - **Cost:** \$50,000 ± 100% = \$50,000 ± \$50,000 → **\$0 to \$100,000**
  - **Time:** 20 weeks ± 25% = 20 ± 5 weeks → **15 to 25 weeks**
- **Why the other options are wrong:**
  - **(c)** applies 100% to the schedule too (0–40 weeks), but the schedule margin is only 25%.
  - **(e)** uses ±50% for both cost and time, which matches neither 100% nor 25%.
  - **(b)** and **(d)** aren't even centred on Micah's estimate.
- **The bigger idea from W4:** "A project manager should expect to be satisfied with broad ranges of estimates that become more and more specific as the project's product becomes better defined" [W4-S36]. The W4 hurricane-model figure [W4-S38] shows the same thing: the cone of possible schedule times narrows from Inception → Elaboration → Construction → Transition.

### 5.4 [S3] The Mya case
> Mya is managing a project. Unfortunately, the entire project team lost four days due to a hurricane in the area and a couple of the project team lost even more time when dealing with insurance claims and rebuilding. At the six-week mark of a nine-week project, she figures the team is one week behind. What might be the BEST solution?
> - (a) Add several people to the project to get it back to schedule
> - (b) Do not change the schedule, but expect the project and development teams to work longer days and every-other weekend.
> - (c) Since the project is about 16% behind, increase the project to about 10-and-one-half weeks
> - (d) Since the project is about 20% behind, increase the project to about 12 week.
> - (e) Add three people to the project – AND – increase the overall project by one week (to a total of ten weeks)

**Best answer: (c) "Since the project is about 16% behind, increase the project to about 10-and-one-half weeks."**

**Step 1. The W4 table "Possible Actions When a Schedule Date Is Missed"** [W4-S40–41], in short form:

| If you assume… | Action | Risk |
|---|---|---|
| the rest of the project is simpler than the late part **and** simpler than originally believed, so you can make up the lost time | **Do not change schedule** | **High** |
| the rest is simpler than the late part and no more complex than originally estimated, so you can't make up the lost time but won't lose more | **Increase the entire schedule by the total amount of time you are behind** (e.g., 2 weeks late → move the rest of the dates 2 weeks later; any padded time at the end may absorb it) | **Moderate** |
| the rest is as complex as the late part, i.e. the original estimates were too optimistic | **Increase the entire schedule by the percentage of weeks you are behind** (e.g., 2 weeks late on an 8-week part → +25% on all remaining estimates). If the new date is unacceptable to the sponsor, reduce the scope | **Low** |

**Step 2. Option (c) is the low-risk action, and its maths is consistent.**
- 1 week behind at the 6-week mark → 1 ÷ 6 ≈ 16.7%, which is "about 16%".
- 9 weeks × 1.167 ≈ **10.5 weeks**.

**Step 3. Why the other options are worse:**
- **(a) Add several people.** This deck: "**Adding staff resources does not translate into increased productivity**… it is more difficult to coordinate a large number of staff members" [S14]. The Ringelmann effect [S6–S7] and the growing number of communication lines [S15] make the same point.
- **(b) Same schedule, longer days, every other weekend.** "Do not change schedule" is the **high-risk** action [W4-S40]. It also clashes with this deck's motivation content:
  - the don't "Assign unrealistic deadlines – Few people will work hard if they realize that a deadline is impossible to meet" [S24]
  - Ten Steps #6, "Give them Play Time and Rest Time" [S13]
- **(d) "20%" → 12 weeks.** The numbers don't match: even a 20% increase on 9 weeks gives ≈10.8 weeks, not 12.
- **(e) +3 people AND +1 week.** Extending by the week that was lost is the **moderate-risk** action [W4-S40], but adding three people brings back the S14 problem.

**Nuance (worth one sentence in an essay answer):** the delay came from a one-off hurricane, not from optimistic estimates. So the moderate-risk action, simply moving the dates by 1 week to 10 weeks, would also be defensible **if it were offered on its own**. It isn't: the only +1-week option also adds three people. Among the five options, **(c)** is the BEST: it is the lowest-risk action, its maths is consistent, it adds no extra staff and it imposes no overtime.

### 5.5 [S25] "Suggestions for motivation might include all of these EXCEPT:"
**Answer: (b) Giving all team members the same bonus on a project.** It is the S24 don't "Give everyone on the project a raise": "If everyone is given the same reward, then high-quality people will believe that mediocrity is rewarded—and they will resent it."

Each of the other four options is the reverse of an S24 don't:

| S25 option (valid suggestion) | Reverse of this S24 don't |
|---|---|
| (a) Setting realistic deadlines | Assign unrealistic deadlines |
| (c) Recognize and reward good efforts | Ignore good efforts |
| (d) Reward those with outstanding quality and effort | Give everyone on the project a raise (reward quality, not mediocrity) |
| (e) Having a good working environment | Maintain poor working conditions |

**Is there a conflict with S21?** S21 says money is "the last thing that should be done". There is no contradiction. The deck's position is that money should not be the *main* motivator, but **when** you reward people, reward **real quality**, never the same amount to everyone.

---

## 6. Likely exam questions (built only from these slides)

> Study the class questions in §5 first (S2, S3, S25); they are the ones most likely to come back word for word. The questions below are new and built from this deck's content.

1. **(MCQ)** According to DeMarco and Lister, a *jelled team* is:
   - a) a team whose members each have the strongest individual skills
   - b) a group of people so strongly knit that the whole is greater than the sum of the parts
   - c) any team with fewer than eight to ten members
   - d) a team in which one 'lone ranger' produces most of the code
2. **(List)** List the five characteristics of a jelled team.
3. **(True/False)**
   - (a) Jelled teams have a high turnover during a project.
   - (b) In a jelled team, the team, not any one individual member, owns the information system being developed.
   - (c) In a jelled team, a member who is not producing is breaking their bond of trust with the other members.
4. **(MCQ)** The Ringelmann effect is:
   - a) the tendency for individual members of a group to become increasingly less productive as the size of their group increases
   - b) the tendency for a group's output to grow in proportion to its size
   - c) the most common reason for schedule and cost overruns
   - d) the attraction that members feel to the group and to other members
5. **(Calculation)** A project needs 60 person-months of effort, and the optimal schedule is 12 months. Using the slide's method, what is the average number of staff? Why might the actual number change during the project?
6. **(True/False)** "Adding staff resources translates into increased productivity, because more people can share the work."
7. **(What should the PM do?)** A project manager works out that the project needs 15 people. According to the slides, how should the team be organized?
8. **(MCQ)** In the "possible configuration of a project team", who oversees the progress of a group of programmers and more technical staff members?
   - a) the project manager
   - b) the functional lead
   - c) the technical lead
   - d) the analysts
9. **(MCQ)** Which is NOT one of the "Ten Steps To More Productive Development Teams"?
   - a) Give Them Their Own Space
   - b) No More Heroes
   - c) Add more programmers when the project is late
   - d) Use Test First Design
   - e) Get A Team Coach
10. **(Short answer)** According to the slides, what do *Test First Design* and *Pair Programming* mean?
11. **(MCQ)** Which of these is an *extrinsic* motivator?
    - a) a personal desire to overcome a challenge
    - b) the wish to produce high-quality work
    - c) bonus checks
    - d) enjoying working with team members you like and trust
12. **(True/False)** "Most project managers agree that rewarding staff with money and bonuses is the first thing that should be done to motivate them."
13. **(MCQ)** "Now That" awards are:
    - a) large annual bonuses given by the project manager
    - b) small monetary awards, typically \$50, given by an employee to a peer
    - c) a day off given after the project ends
    - d) promotions for the most productive programmer
14. **(What should the PM do?)** A PM keeps the team in separate cubicles with bad lighting and old computers, and makes a major technology decision without asking the team. Which motivational don'ts is the PM breaking, and what reason does the slide give for each? Which of the Ten Steps is also being ignored?
15. **(List + define)** List the six conflict-avoidance strategies. Then define *group cohesiveness*, and give two things a project charter may describe.
16. **(Matching)** Match each CASE type with its description.
    - Types: (1) upper CASE, (2) lower CASE, (3) I-CASE
    - Descriptions:
      - (A) supports the design workflow and can generate code for database tables and system functionality
      - (B) contains the functionality of both and supports tasks throughout the system-development process
      - (C) supports the analysis workflow, creating integrated diagrams of the system and storing information about its components
17. **(Fill in + list)** "The central component of any CASE tool, otherwise known as the information repository or data dictionary, is the ______." Then name four benefits of using CASE.
18. **(MCQ + short)** "Record actual task progress in the work plan every Monday morning by 10 AM" is an example of which type of standard?
    - a) Documentation standards
    - b) Coding standards
    - c) Procedural standards
    - d) User interface design standards

    Also: which workflow chooses the tools and identifies the standards, the environment workflow or the infrastructure management workflow?

### Answers
1. **b** [S5]
2. The five characteristics [S8–S10]:
   - very low turnover during a project
   - strong sense of identity
   - a sense of eliteness
   - the team owns the information system, not any one individual member
   - they really enjoy (have fun) doing their work
3. Three true/false statements:
   - (a) **False.** Jelled teams have a *very low* turnover [S8].
   - (b) **True** [S9].
   - (c) **True** [S9].
4. **a** [S6]. Option b is the opposite, as the S7 graph shows. Option c describes scope creep (S2; W4). Option d is group cohesiveness [S26].
5. 60 ÷ 12 = **5** full-time staff on average. The number "may change over time as different specialists enter and leave the team (e.g., business analysts, programmers, technical writers)" [S14].
6. **False.** "Adding staff resources does not translate into increased productivity". Staff size and productivity share a disproportionate relationship, mainly because it is more difficult to coordinate a large number of staff [S14]. See also the Ringelmann effect [S6–S7] and the team pictures [S15].
7. Keep each team to **fewer than eight to ten people** and **create sub-teams**. Each sub-team keeps its communication effective internally and communicates to a contact at a higher level [S16]. One possible structure is PM → functional lead (analysts) + technical lead (programmers) [S17–S18].
8. **c** [S17–S18]. The functional lead manages a group of analysts.
9. **c.** It isn't one of the ten steps on S11–S13, and it contradicts S14.
10. Test First Design (also called Test Driven Development) "means that you write the tests before you write the code to make the test pass" [S13]. Pair Programming is "two developers working together on a single PC" [S12].
11. **c** [S19]. Options a, b and d are intrinsic.
12. **False.** It is "the last thing that should be done". "The more often managers reward team members with money, the more they expect it—and most times monetary motivation won't work" [S21].
13. **b** [S22].
14. The PM is breaking two don'ts [S24], and also ignoring one of the Ten Steps:
    - **"Maintain poor working conditions."** Reason: "A project team needs a good working environment or motivation will go down the tubes. This includes lighting, desk space, technology, privacy from interruptions, and reference resources."
    - **"Make an important decision without the team's input."** Reason: "Buy-in is very important… she should involve them in the decision-making process."
    - **Ten Steps #1, "Give Them Their Own Space."** Cubicles shield people "well enough to stop them communicating easily, but not well enough to stop them being distracted" [S11]. S23 also recommends a high-end development environment.
15. **The six strategies** [S27]:
    - Clearly define plans for the project.
    - Make sure the team understands how the project is important to the organization.
    - Develop detailed operating procedures and communicate these to the team members.
    - Develop a project charter.
    - Develop schedule commitments ahead of time.
    - Forecast other priorities and their possible impact on the project.

    **Group cohesiveness** is "the attraction that members feel to the group and to other members" [S26]. **A charter may describe** any two of these [S26]:
    - when the team should be at work
    - when staff meetings will be held
    - how the group will communicate
    - the procedures for updating the workplan
16. **1–C, 2–A, 3–B** [S29]
17. The **CASE repository** [S31]. Any four of these benefits [S30]:
    - tasks completed and altered much faster
    - development information centralized
    - information illustrated through diagrams
    - reduced maintenance costs
    - improved software quality
    - enforced discipline
    - assessing the magnitude of changes
    - support for round-trip engineering
18. **c, procedural standards** [S33]. The **environment** workflow chooses the tools and the standards; the infrastructure management workflow chooses the level and type of documentation [S28].

---

## 7. Self-check

- [ ] I can list the 4 things "staffing the project includes" and name its deliverables: a staffing plan with the reporting structure, and a project charter. [S4]
- [ ] I can quote DeMarco & Lister's definition of a jelled team and list its 5 characteristics in order. [S5, S8–S10]
- [ ] I can define the Ringelmann effect, explain the tug-of-war example, and describe the Potential vs Actual graph and its "process loss". [S6–S7]
- [ ] I can compute average staff (person-months ÷ optimal schedule) and explain why adding people doesn't raise productivity and why teams should stay under 8–10 people, with sub-teams. [S14–S16]
- [ ] I can draw the possible project-team configuration and say what the project manager, the functional lead and the technical lead each do. [S17–S18]
- [ ] I can name all Ten Steps To More Productive Development Teams and explain steps 1, 3, 4 and 9. [S11–S13]
- [ ] I can contrast extrinsic and intrinsic motivation, state the 5 twenty-first-century motivation principles, and list the 6 motivational don'ts with their reasons. [S19–S24]
- [ ] I can define group cohesiveness, say what a project charter may describe, and list the 6 conflict-avoidance strategies. [S26–S27]
- [ ] I can explain the environment and infrastructure management workflows, define CASE, upper/lower/I-CASE and the CASE repository, and list the benefits of CASE. [S28–S31]
- [ ] I can explain why standards matter, name the 5 types of standards with an example of each, and answer the class questions: S2, Micah, Mya and S25. [S32–S33, §5]
