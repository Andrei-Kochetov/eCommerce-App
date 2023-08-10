The repository has a main **development** branch - _develop_, into which the results of each sprint are merged from *sprint_#* branch after pull request(PR) and approval of **EVERY** team member. Then PR into _main_ branch and deploy of the task on the _gh-pages_ or _netlify_ are created.

At the each sprint _Team Lead_ creates a *sprint_#* branch from _develop_ branch into which team members merge their results of *feature* branch after PR and approval of **EVERY** team member.

At the each sprint every team member creates INDEPENDENTLY **their own** *feature* branch from the *sprint_#* branch and implements this feature functionality.

After feature implementation completion a team member creates PR into the *sprint_#* branch, **notifies** his colleagues in DISCORD about it. Other team members review the code, add their comments to PR and write if this feature can be merged into the *sprint_#* or must be corrected. If approval from every team member is taken PR can be merged by its author (_fixing all appeared conflicts if necessary_).