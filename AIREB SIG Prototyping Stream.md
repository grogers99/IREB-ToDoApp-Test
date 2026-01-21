# AIREB SIG Prototyping Stream

## Introduction
The IREB AI Special Interest Group was set up to provide a forum for discussion of the impact and use of AI in RE. This broad ranging discussion covered many topics including how to optimally use AI in many typical RE activities, leading among other things to the recently published IREB AI4RE Micro Credential.

While the use of AI to support RE activities as they are currently understood is well worth examining, a question that may also be asked is what if AI so fundamentally changes the software development process that future RE activities are no longer recognisable? Indeed, will the term RE even be relevant? If a brief interaction with an AI can lead directly to working software, what role will requirements and those responsible for producing them play?

To examine these more far reaching questions we established a separate stream within the SIG, with a somewhat greater degree of freedom to explore whatever areas seemed most interesting.

### Degree of AI Involvement

In early discussion we categorised the degree of AI involvement in a software process as follows:
1. AI supports existing software engineering activities.
2. AI is used to generate prototypes.
3. AI is used to generate the solution.
4. AI is the solution.

Investigate 2 as a starting point, with the intention of exploring 3 and 4 later.

### Prototyping Definitions
- Protoyping as Ux design
- Prototyping to elicit and validate requirements with stakeholders
- Prototyping as technical feasibility

## Aims
Of prototyping project:
1. Investigate tools
2. What are prerequisites of AI prototyping process? (Goals? Requirements?)
3. What are the outputs? (when do we know when we're finished and ready to develop for real?)
4. What form do requirements take? Are prompts requirements? Is the prototype a requirement?
5. Do prompts need to be documented? Do requirements need to be generated after the fact?
6. What is the process and who is involved in validating the prototype?
7. Explainability of prototype?
8. What skills does the RE/prototyper need?
9. Risks/limitations/pitfalls of process (eg. prototype understood to be the solution, lack of stakeholder involvement, lack of explainability, etc.))
1. Can AI Agents be used as additional/replacement stakeholders?

## Project Setup and Tools
Visual studio (html, javascript, markdown), Cline (with Memory Bank, Claude as base model), Copilot, Github (Project/Issues, Github Pages), Render, Agent technology?

## Results
- Cline able to generate comprehensive (sometimes verbose) documentation in addition to code itself
- Cline and copilot able to generate functioning frontend prototypes
- Some requirements imply design changes which can significantly increase the complexity of the prototype
- Decisions concerning click dummies versus architectural/design prototypes...
- Cline can quickly move in its own direction, after which it is difficult to return it to the original intention
- Necessity of working in small increments, and working in a logical sequence
- Possibility of working with separate branches to limit complexity, though might be confusing for stakeholders
- Higher-level, goal-oriented prompts/requirements work better than lower-level, system requirements

## Links to deliverables:
- github repo, working prototype, memory bank docs, this report, miro

## Conclusions
- must differentiate among different possible goals of prototyping: elicitation & validation with stakeholders, technical feasibility, UI/UX design, architecture design, etc.
- define boundary between prototype and development of production system
- prerequisites (goal definition, stakeholder identification, constraints, system context) are as (or perhaps more) relevant as before
- boundaries to complexity of prototype: active context of AI, time taken to generate, explainability to operators/stakeholders, AI resources/costs, bugs/internal stability
- RE and system development to be seen as a learning process
- 





### Documentation Alignment (Current Session)
**Status**: In Progress - Aligning all project documentation with updated project brief
**Goal**: Ensure consistent messaging about AI-assisted development and requirements engineering focus
**Progress**: Major documentation updates completed, cross-reference validation in progress
- ✅ CRUD operations working perfectly
- ✅ localStorage persistence implemented
