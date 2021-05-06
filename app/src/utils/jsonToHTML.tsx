import { FormGroup, List, ListItem, TextInput } from '@patternfly/react-core';
import React from 'react';

const jsonToHTML = (data, level) => {
  level = level + 1;
  return (
    <List className="root-list">
      {Object.keys(data).map(key => {
        if (typeof data[key] == 'object' && data[key] !== null) {
          level = level + 1;
          return (
            <ListItem className="list-item" key={key}>
              {<span className="list-key">{key} :</span>}
              <List className="sub-list">{jsonToHTML(data[key], level)}</List>
            </ListItem>
          );
        } else {
          return (
            <ListItem key={key}>
              <FormGroup label={key} fieldId="something">
                <TextInput isDisabled type="text" value={data[key]} aria-label={data[key]} />
              </FormGroup>
            </ListItem>
          );
        }
      })}
    </List>
  );
};

export { jsonToHTML };
