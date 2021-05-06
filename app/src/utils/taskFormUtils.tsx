import _find from 'lodash/find';
import _clone from 'lodash/cloneDeep';

const addDefaults = (fields, defaults) => {
  //get number of levels
  // handles 2 levels only
  // TODO get this to work recursivesly on multiple levels
  for (let idx = 0; idx < fields.length; idx++) {
    if (fields[idx].level === 0 && defaults[fields[idx].name]) {
      fields[idx].defaultValue = defaults[fields[idx].name];
    } else if (
      fields[idx].level === 1 &&
      defaults[fields[idx].parent?.name] &&
      defaults[fields[idx].parent?.name][fields[idx].name]
    ) {
      fields[idx].defaultValue = defaults[fields[idx].parent?.name][fields[idx].name];
    }
  }
};

const addFieldLevels = (field, level, parent) => {
  field.level = level;
  // if in sub form add the parent so it can de referenced in the UI
  if (level > 0) {
    field.parent = parent;
    // set to readonly if parent is readonly
    if (parent.readOnly) {
      field.readOnly = true;
    }
  }
};

// the input taskform contains input fields but may also contain multiple levels of subforms
// need to parse the input taskform into a nested tree using recursion so that we can display nested forms in the UI
const doRecurse = (fields, sorted, level, parent, fieldsOriginal) => {
  // check if there's a sub form
  const isSubForm = _find(fields, { code: 'SubForm' });

  //recusrion end condition - when there are no more sub forms, we are done
  if (!isSubForm) {
    // console.log('done ', fields.length, level, parent, JSON.stringify(fields))
    for (let idx = 0; idx < fields.length; idx++) {
      addFieldLevels(fields[idx], level, parent);
      sorted.push(fields[idx]);
    }
    return; // finished - results are in parsedFields array
  }

  for (let idx = 0; idx < fields.length; idx++) {
    // if it's not a subform add fields to output array
    if (fields[idx].code !== 'SubForm') {
      // console.log('adding field ', level, fields[idx])
      addFieldLevels(fields[idx], level, parent);
      sorted.push(fields[idx]);
    } else {
      // found a subform -
      // find the subform in the original task form object
      const subFields = _find(fieldsOriginal, { rootId: fields[idx].nestedForm });
      if (subFields) {
        // console.log('found subform ', level, subFields)
        const _subFields = _clone(subFields);
        doRecurse(_subFields, sorted, level + 1, fields[idx], fieldsOriginal);
      }
    }
  }
};

const parseTaskForm = (taskFormObj, defaultsIn) => {
  // the taskFormObj is an array of form objects..  Each object contains a fields object which has as array of fields.
  // the first object in the taskFormObj array is the root form (name: <form name>.frm)
  // the other array objects are subforms
  // there can be multiple layers of subforms
  // this function uses recursion to parse the input root form object and add any subforms into a flattened array for rendering in UI
  // {level: 0} is added to the root fields
  // {level: n} and {parent: <fields details>} is added to easl layer of subforms

  // quick validation
  if (!Array.isArray(taskFormObj) || taskFormObj.length < 1) {
    return [];
  }

  // just need the fields object from the input form.
  // extract the fields arrays and add in the form id
  const fieldsOriginal: [] = [];
  for (let index = 0; index < taskFormObj.length; index++) {
    taskFormObj[index].fields.rootId = taskFormObj[index].id;
    fieldsOriginal.push(taskFormObj[index].fields);
  }

  // start recursion using:
  // the root form:fieldsOriginal[fieldsOriginal.length - 1]
  // the output array: parsedFields
  // the root level: 0
  const parsedFields = [];
  doRecurse(fieldsOriginal[0], parsedFields, 0, null, fieldsOriginal);
  addDefaults(parsedFields, defaultsIn);

  return parsedFields;
};

const setFormOut = (taskFormObj, inputData) => {
  const formOutObj = {};
  const fields = taskFormObj[0].fields;
  for (let idx = 0; idx < fields.length; idx++) {
    //no need to return readonly
    if (fields[idx].readOnly) {
      continue;
    }

    if (fields[idx].code === 'SubForm') {
      const subForm = _find(taskFormObj, { id: fields[idx].nestedForm });
      const subFields = subForm?.fields.map(field => field.name) || [];
      formOutObj[fields[idx].name] = {};
      for (let i = 0; i < subFields.length; i++) {
        formOutObj[fields[idx].name][subFields[i]] = inputData[subFields[i]];
      }
    } else {
      formOutObj[fields[idx].name] = inputData[fields[idx].name];
    }
  }

  return formOutObj;
};

export const TaskFormUtils = {
  setFormOut,
  parseTaskForm,
};
