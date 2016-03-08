# Take the jeer out of JIRA

An immersive command line interface (CLI) for JIRA

## Install

```
npm install aaronshaf-jira-cli -g
```

## Commands

```
jira

  help [command...]                    Provides help for a given command.
  exit                                 Exits application.
  comment <issue key> <comment...>     Comment on an issue.
  configure                            Set username, password, host, etc.
  describe project <project key>       Describe a project by project key.
  list rapid views                     List rapid views.
  list projects                        List projects.
  mine                                 List my issues.
  search <query...>                    Search with query string (jql).
  show <issue key>                     Show an issue.
  use project <project key>            Use a project.
  use rapid view <rapid view name...>  Use a rapid view.
```

Supports autocomplete. Press tab to complete a command or argument.

## See also

* [germanrcuriel/jira-cmd](https://github.com/germanrcuriel/jira-cmd)
* [knomedia/ticketme](https://github.com/knomedia/ticketme)
