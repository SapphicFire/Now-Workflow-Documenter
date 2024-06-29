var verGr = new GlideRecord('wf_workflow_version');
verGr.addEncodedQuery('published=true^active=true');
//verGr.setLimit(50);
verGr.query();

var currentWorkflows = [];

while(verGr.next()){
	// Build outer object
	var workflow = {};
	workflow.name = verGr.getValue('name');
	workflow.condition = verGr.getValue('condition') == null ? "" : verGr.getValue('condition');
	workflow.isValid = true;

	// Get first activity
	var initGr = verGr.start.getRefRecord();
	if(!initGr.isValidRecord()){
		workflow.isValid = false;
		currentWorkflows.push(workflow);
		continue;
	}
	
	var tree = new WorkflowTree();
	tree.start = new Activity(initGr);
	tree.start.conditions = getConditions(tree.start.sys_id);
	workflow.tree = tree;
	currentWorkflows.push(workflow);
}

gs.info(JSON.stringify(currentWorkflows,null,2));

function handleActivity(){
	// TODO: create activity nodes, enumerate conditions, traverse transitions and recurse
}

function getConditions(activityId){
	var conditionGr = new GlideRecord('wf_condition');
	conditionGr.addEncodedQuery('activity=' + activityId);
	conditionGr.query();

	var conditionArr = [];
	while(conditionGr.next()){
		var condition = new Condition(conditionGr);
		conditionArr.push(condition);
	}
	return conditionArr;
}

// Activity node object
function Activity(details){
	this.name = details.getValue('name');
	this.sys_id = details.getUniqueValue();
	this.definition = details.getValue('activity_definition');
	this.parent = null;
	this.children = [];
	this.conditions = [];
}

function WorkflowTree(){
	this.start = null;
}

function Condition(details){
	this.name = details.getValue('name');
	this.condition = details.getValue('condition') == null ? "" : details.getValue('condition');
	this.sys_id = details.getUniqueValue();
	this.isElse = details.getValue('else_flag');
	this.isError = details.getValue('error');
	this.isPositive = details.getValue('is_positive');
	this.shortDescription = details.getValue('short_description') == null ? "" : details.getValue('short_description');
}
