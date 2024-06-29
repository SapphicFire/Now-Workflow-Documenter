### Workflow definitions
##### Workflow `wf_workflow`:
- Name, description, scoping, domains, table, Template
##### Workflow Version `wf_workflow_version`:
- References Workflow for details
- References Starting Activity (first `wf_activity`)
- References Full sequences (list of `wf_activity` paths, separated by `|`)
  - While this seems useful, it is not consistently declared in instances I have access to. Falling back to enumeration from starting activity
##### Workflow Activity `wf_activity`:
- Instantiated
- References workflow version
- Timeout field indicates timeout duration
- Will capture out of date and if version is pinned
- Has input object and databus lookup ID
- References Workflow element definition (`wf_element_definition`)
##### Workflow Transitions `wf_transition`:
- References condition (`wf_condition`) which governs the transition
- References source activity
- References target activity
##### Workflow Condition `wf_condition`:
- Instantiated
- Refers to its Activity (`wf_activity`)
- Can reference a Default condition (`wf_condition_default`)
##### Workflow Instance `wf_workflow_instance`
- Connects workflows to subflows
- Can provide returned objects
- Uses Workflow version to reference calling workflow, and uses Workflow + Activity references to subflow
### Activity Designer Definition 
##### Version `wf_versionable`:
- Versioning for activities, including published status & checkout details

##### Activity Designer `wf_element_activity`
- Custom activity definitions
- TODO

### Workflow runtime
##### Workflow Binding `wf_workflow_binding`
- Ties workflow version to table and sys_id of run record
##### Workflow Context `wf_context`
- Instantiated runtime of a workflow
##### Workflow Execution `wf_workflow_execution`
- Docs indicate 'Synthetic "current" records for workflows that run on Global.'
- Table only has 'Name' column
##### Workflow Executing Activity `wf_executing`
- Activity executions for active (?) contexts
- Connects to instantiated activity, context, parent, previous Workflow Activity History (`wf_history`), workflow version, and holds domain, input and output, scratchpad, events, and other config
##### Workflow Queued Command `wf_command`
- Currently executing commands(?) for active contexts
##### Workflow Activity History `wf_history`
- History of individual activities for contexts
- References context, activity, and parent, and relates to transition history and scratchpad
##### Workflow Log Entry `wf_log`
- Log table, includes events and errors
##### Workflow Transition History `wf_transition_history`
- Transitions that have occurred in active contexts

### Other stuff
##### Condition Default `wf_condition_default`:
- Unique to a Activity definition (`wf_activity_definition`)
- Derived definition seems to hold sys_ids
##### Column Renderer `column_renderer`
- Renders stages for a stage column
##### Workflow SC Variable `wf_variable`
- Ties workflow version to a variable
