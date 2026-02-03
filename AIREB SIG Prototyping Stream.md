# AIREB SIG Prototyping Stream

## Introduction
The IREB AI Special Interest Group was set up to provide a forum for discussion of the impact and use of AI in RE. This broad ranging discussion covered topics including how to optimally use AI in typical RE activities. This work has already led among other things to the recently published IREB AI4RE Micro Credential.

While the use of AI to support RE activities as they are currently understood is well worth examining, a question that may also be asked is what if AI so fundamentally changes the software development process that future RE activities are no longer recognisable? Indeed, will the term RE even be relevant? If a brief interaction with an AI can lead directly to working software, what role will requirements and those responsible for producing them play?

To examine these more far reaching questions we established a separate stream within the SIG, which later became known as the Prototyping stream.

### Degrees of AI Involvement in Sofware Development

In early discussions we first tried to categorise the different degrees of AI involvement (whether real or theoretical) in a software development process. We came up with the following list together with associated questions regarding the impact on RE:
1. **AI supports existing RE paradigm** - ie. AI is a tool used by human REs to perform traditional RE tasks.
2. **AI within a prototype-driven process** - ie. AI is used to rapidly produce prototypes using prompting techniques, and these prototypes are in turn used to elicit and validate requirements for the final solution. How does this change the nature of requirements and the overall process?
3. **AI is used to generate the solution** - ie. AI generates a working solution directly from prompts. What role would requirements play, if any, in such a process?
4. **AI ***is*** the solution** - ie. AI provides ad-hoc solutions to user needs without any traditional software development process. In what situations is this feasible and does RE have a role in defining such situations?

We decided then that the initial focus of our efforts should be to examine point 2 in more detail. Though prototyping itself is not a new idea, we were of the view that the use of AI might accelerate or otherwise change the process in ways that were worth examining. This, in turn, would hopefully provide indicators of how AI might fundamentally change RE processes and indeed software development as a whole in the future.

### Supporting Ideas

We formulated the following ideas which we felt might be used to evaluate the above options and perhaps help to define boundaries around AI capabilities:
1. **Deterministic engineering processes vs. human learning and discovery** - traditionally RE has been often been seen as a process of capturing known goals and needs and transforming these in a deterministic way first into system requirements and then ultimately to a demonstrably correct solution. Modern approaches including agile methods view software development rather as an iterative process in which needs and opportunities are frequently discovered during the development process. Understanding the differences between these paradigms and where each is most applicable may also have an impact on an appropriate use of AI.
1. **Systems development as knowledge acquisition** - it is important to understand that in addition to working software other outputs of systems development include knowledge acquisition in a more general sense within the organisation itself: detailed knowledge gained around the system context, decisions taken during development regarding the implemented processes and data structures, knowledge of how the system itself is to be operated and maintained. This knowledge is therefore both instantiated within the software (eg. coded business rules), but also exists within documentation, processes and simply in the heads of the individuals involved. This perspective seems significant when evaluating the use of AI: supposing AI is capable of generating perfect working software, do we though run the danger of by-passing other essential learning activities in the organisation more generally?
1. **Limits of natural language specification** - the CPRE course material discusses the pros and cons of natural language requirements and compares these with other, more formal, specification methods such as ... Is there an analogy to be drawn here with the use of LLMs ie. in situations where natural language requirements are inappropriate, do we also see limitations for our interactions with LLM's, which also rely on a natural language interface? Or can this limitation be overcome by providing other inputs (eg. in the form of code or data) to the AI?

### Prototyping Definitions
Before setting out to explore the use of AI in prototyping we first considered definitions of the term prototyping. Here we noted that term can be used in different ways and with subtly different aims:
- Protoyping as a means to elicit and validate requirements with stakeholders - ie. as with wireframes or click dummies, prototypes can help work within a Ux design process and enable conversations with stakeholders that will validate requirements
- Prototyping as technical feasibility - as with the development of hardware products (eg. prototype vehicles), prototyping can also be performed with the intention of testing new designs in simplified solutions before a decision is made for one solution path or another.

While as Requirements Engineers we are typically more interested in the former, we also observed that with AI these boundaries can be easily blurred, and care should be taken before prototypes go too far down the road of technical feasibility.

## Project Aims
In order then to investigate the topic of AI-assisted prototyping, we decided to create an experimental project which we would work on together playing the various roles of customer, requirements engineer and developer. We opted to choose a simple topic for our experimental application, which we thought would allow us to focus on the tools and process rather than spending too much time on the subject matter itself. The selected application area was therefore a ToDo app.

We set out the following aims for our project:
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
- pros and cons of overly simplistic, well understood project
- pros and cons of conversing with AI within a coding IDE
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
