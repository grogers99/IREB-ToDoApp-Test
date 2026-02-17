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
- after experimenting with several alternatives (GPT, Bolt, Vercel) we selected to work within Visual Studio to create prototypes. AI support was provided both by CoPilot (with GPT-5 mini as configured LLM) and then by Cline (https://docs.cline.bot/introduction/welcome), which was installed as an extension (available for Linux version of VS) and which in turn used Claude as the underlying LLM.
- The prototype itself was generated as a front-end web application with HTML and Javascript. 
- Github was used as a repository and Github Projects as a backlog and issue management tool. 
- The app was deployed either using Github Pages or later with Render. 

## Method
The project ran for a period of months with a core team of 6-8 participants and some other peripheral attendees on calls. We met in virtual meetings initially every two weeks and later monthly. After initial, more theoretical discussions we assigned roles to the group members such as customer, prototyper/requirements engineer or tool expert. The customers were then able to communicate their needs, wishes and ideas either during meetings or offline as Github issues. The prototyper intermittently developed prototypes and deployed these for testing as described above. Virtual meetings were a mix of role-playing within the fictitious project and brainstorming and reflection on the meta-goals of the project: i.e. what we were learning about the impact of AI on RE and what we should investigate next.


## Results

### Deliverables
The project repository containing all code and documentation can be found here: https://github.com/grogers99/IREB-ToDoApp-Test. Instructions on how to check out and deploy and contained in the Readme.

We experimented will different code branches for a purely front-end prototype (repository: https://github.com/grogers99/IREB-ToDoApp-Test/tree/frontend; deployed here: https://grogers99.github.io/IREB-ToDoApp-Test/) and a more sophisticated model which simulated a multi-user solution (repository: https://github.com/grogers99/IREB-ToDoApp-Test/tree/spring-boot-test; deployed here: https://ireb-todoapp-test.onrender.com/).

The AI-generated documentation (Cline Memory Bank) consists of six files:
- **[Project Brief](memory-bank/projectbrief.md)** - Defines project scope, core requirements and goals
- **[Product Context](memory-bank/productContext.md)** - Why this project exists, problems it solves, and user needs
- **[Active Context](memory-bank/activeContext.md)** - Current work focus, recent changes and next steps
- **[Progress](memory-bank/progress.md)** - Current status, completed features, and known issues
- **[System Patterns](memory-bank/systemPatterns.md)** - Architecture patterns and design decisions
- **[Tech Context](memory-bank/techContext.md)** - Technical constraints, technologies used and dependencies

Links to the respective files for each of the branches can also be found in the Readmes.


### General Observations
- the tested AI's were well capable of generating convincing working front-end prototypes for typical ToDo app functionality, mostly on the basis of minimal prompting ('Generate a basic todo web application')
- the AI's supported iterative and incremental development, for example adding task categorisation or prioritisation to basic task management, and retaining existing functionality and project context
- high-level prompting (eg. 'I would like to add task prioritisation to my todo application') was sufficient; lower-level, solution-oriented requirements (eg. 'When a new task is created the user shall be able to set the task priority', 'when editing an existing task the user shall be able to modify task priority' etc.) seemed largely superfluous, as the AI was able to intuit such elements, often better (with greater thoroughness) than the requirements engineer!
- at least within this well-understood domain the AI was frequently able to suggest potential new requirements (e.g. due dates and reminders, categories or tags, sub-tasks or nested todo's) even before being prompted to do so
- Cline was able to generate comprehensive (at times overly verbose) project documentation, covering both technical design and *requirements*. The requirements consisted of a Problem Statement, Target User Profiles, Needs and Goals (see **[Product Context](memory-bank/productContext.md)**) as well as Functional, Technical and User Experience Requirements (see **[Project Brief](memory-bank/projectbrief.md)**). These requirements were in part derived from prompts fed to the AI, but to a larger part hypothesised and expanded upon by the AI itself. Once again, at least in a well-understood domain such as this, the requirements were credible and thorough.
- we therefore had a 3-way relationship among the following elements: prompts; requirements; protoype (code) - where the all of the following transitions were possible:
  1. the protoype (code) could be generated from prompts (possibly using documentation as context)
  1. requirements could be generated from prompts (using code as context)
  1. requirements could be manually created and modified and these in turn used by further prompting to generate code.

### Risks and Issues
- as the complexity of the prototype increased, the likelihood of errors in the prototype (eg. buttons not working due to glitches initialising the event handling) also gradually increased. In general the AI was able to fix such issues itself, once instructed to do so.
- Cline in particular showed a tendency to make more wholesale changes than were strictly requested, and at times to follow its own design decisions. An example was a particular prototype that was using a posgres DB, with Cline repeatedly switching to an in-memory storage option due to problems connecting. The *act mode* especially had to be used with caution: it was usually better to work in *plan* mode until the approach was clear and only switching to *act* later.
- If the AI did did go in the wrong design direction, it was not always straightforward to revert back. While UI glitches were generally fixed quickly, fixing deeper design errors could rapidly become a time-consuming activity with the AI tending to generate more and more code and complexity increasing. It therefore seemed sensible to work with source control and backups as well as to use separate branches to explore more complex topics.
- It was important to differentiate between prompting for incremental improvement within an existing design (e.g. add a feature such as priorities or due dates within the front end app design) and prompts which implied a design change e.g. 'It should be possible to assign a task to a team member', which implied user management and logins and more generally a frontend/backend application. In the latter case, it was useful to first talk through design options with the AI e.g. build a working backend prototype, or simulate a multi-user environment with a dropdown within the simple front-end solution.
- A key skill of the prototyper was therefore to choose appropriate increments, or prototyping iterations, and to recognise requirements that implied significant design changes, choosing an appropriate prototyping strategy (full working model, simulation) in these cases.

## Conclusions

The ToDo app project was a useful experiment in the use of AI tools for a prototype-based requirements process. While the simplicity of the subject matter (ToDo app) did indeed allow us to focus on the tools and process, it was at the same time a limitation in the sense that this well-understood domain did not test the limits of AI capabilities. Nevertheless, the capabilities of AI in generating credible functional prototypes running to thousands of lines of code and on the basis of minimal prompts were clear.

Even in our fictitious project setting many of the prerequisites for any requirements process - goal setting, stakeholder identification, clear roles for participants, the stating of technical and process constraints - were just as significant as in a non-AI-assisted process. Perhaps even more so, as the speed of working with AI can reduce the time for reflection and course correction later in the process. Establishing a clean project start, therefore, continues to be a key role for the requirements engineer.

Secondly, knowing where to stop is equally important. Is the goal of the prototyping process a validated set of requirements, an agreed upon UI design or a working solution design that feeds directly into development? In our experiment we stated our primary goal as the validation of requirements, which meant we could step back from developing prototypes which moved too far into the complexity of the final product design. Setting clear goals for prototyping and knowing the right point to switch from prototyping to development of the final product will be key skills for the Requirements Engineer in this process.

In our project setup we recognised advantages to working directly within an IDE such as Visual Studio: the context of the prototype could always be reestablished from the code (overcoming limits to the active context of the AI, as well as a potential lack of precision in natural language) and the code allowed other opportunities to fine-tune the results, at least for those with requisite skills. Conversely, this approach places new demands on the Requirements Engineer, who will benefit most from the above if comfortable working at a deeper technical level.

Working with a software engineering AI such as Cline provided additional context information in the form of documented goals, requirements and technical design. In our experiment the requirements generated by the AI were highly credible, and it was instructive for a Requirements Engineer to use these as an input to discussions with stakeholders. At the same time, there is a risk that such AI-generated requirements might be used as a box-ticking exercise in generating project documentation, by-passing real elicitation activities with stakeholders. We also observed that the generated documentation was at times verbose, and as such might prove to be a distraction as much as an assistance.

In summary, then, AI-assisted prototyping is undoubtedly a powerful new tool in the requirement engineer's toolset. Creating such prototypes does not require exhaustive lists of detailed user interface requirements - indeed, once validated, the prototype itself provides an alternative and in many ways more comprehensive expression of such requirements than textual forms. In this sense, at least, prototyping with AI offers an alternative to some traditional RE activities.

Even with AI, developing a prototype iteratively requires a good initial understanding of stakeholder needs and the potential impact of each on the design. With this knowledge meaningful increments can be planned and dependencies managed. Without it, the prototype is likely to quickly become weighed down under its own complexity. Many of the core skills and techniques of the requirements engineer in capturing goals and developing this understanding are therefore as valuable here as they were without the assistance of AI. Furthermore, it is not necessarily evident from the resulting prototype alone what the original goals of the undertaking were and which design decisions have been consciously taken during the process. It is our view that such artifacts remain critical for end product development and are additional to the prototype - though we note that AI may also play a role in helping to generate them. 



Topics for further investigation:
- use of agents
- less well-known domains, other scaling factors
- ???







