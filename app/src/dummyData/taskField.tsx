export const taskFormJson = {
  id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
  name: 'GetInfo-taskform.frm',
  model: {
    taskName: 'GetInfo',
    processId: 'itorders.orderhardware',
    name: 'task',
    properties: [
      {
        name: 'orderNumber',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [
            {
              name: 'field-readOnly',
              value: true,
            },
          ],
        },
      },
      {
        name: 'requestor',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [
            {
              name: 'field-readOnly',
              value: true,
            },
          ],
        },
      },
      {
        name: 'started',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.Boolean',
          multiple: false,
        },
        metaData: {
          entries: [
            {
              name: 'field-readOnly',
              value: true,
            },
          ],
        },
      },
      {
        name: '_age',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.Integer',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_comment',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_date',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_float',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.Float',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_ok',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.Boolean',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_status',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_sure',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.Boolean',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_uname',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
      {
        name: '_weather',
        typeInfo: {
          type: 'BASE',
          className: 'java.lang.String',
          multiple: false,
        },
        metaData: {
          entries: [],
        },
      },
    ],
    formModelType: 'org.kie.workbench.common.forms.jbpm.model.authoring.task.TaskFormModel',
  },
  fields: [
    {
      maxLength: 10,
      placeHolder: 'Enter Username',
      id: 'field_7125',
      name: '_uname',
      label: 'Username',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'Enter firstname last and lastname first',
      binding: '_uname',
      standaloneClassName: 'java.lang.String',
      code: 'TextBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
    },
    {
      id: 'field_3894',
      name: 'started',
      label: 'Started',
      required: false,
      readOnly: true,
      validateOnChange: true,
      helpMessage: '',
      binding: 'started',
      standaloneClassName: 'java.lang.Boolean',
      code: 'CheckBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition',
    },
    {
      maxLength: 100,
      placeHolder: 'Requestor',
      id: 'field_771602590070024E11',
      name: 'requestor',
      label: 'Requestor',
      required: false,
      readOnly: true,
      validateOnChange: true,
      helpMessage: '',
      binding: 'requestor',
      standaloneClassName: 'java.lang.String',
      code: 'TextBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
    },
    {
      maxLength: 100,
      placeHolder: 'OrderNumber',
      id: 'field_154220786670795E12',
      name: 'orderNumber',
      label: 'OrderNumber',
      required: false,
      readOnly: true,
      validateOnChange: true,
      helpMessage: '',
      binding: 'orderNumber',
      standaloneClassName: 'java.lang.String',
      code: 'TextBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
    },
    {
      placeHolder: 'Type comment here',
      rows: 4,
      id: 'field_9086',
      name: '_comment',
      label: 'Enter a comment',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'This is an unhelpful help message',
      binding: '_comment',
      standaloneClassName: 'java.lang.String',
      code: 'TextArea',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textArea.definition.TextAreaFieldDefinition',
    },
    {
      placeHolder: 'enter age',
      maxLength: 100,
      id: 'field_15063',
      name: '_age',
      label: 'Age',
      required: false,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'Wha age are you anyway?',
      binding: '_age',
      standaloneClassName: 'java.lang.Integer',
      code: 'IntegerBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.integerBox.definition.IntegerBoxFieldDefinition',
    },
    {
      maxLength: 100,
      placeHolder: 'Enter Date',
      id: 'field_520685',
      name: '_date',
      label: 'Date',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'Enter yesterdays date',
      binding: '_date',
      standaloneClassName: 'java.lang.String',
      code: 'TextBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
    },
    {
      placeHolder: 'floating away...',
      maxLength: 100,
      id: 'field_6813',
      name: '_float',
      label: 'Floating Number',
      required: false,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'Enter a float number for the craic',
      binding: '_float',
      standaloneClassName: 'java.lang.Float',
      code: 'DecimalBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.decimalBox.definition.DecimalBoxFieldDefinition',
    },
    {
      id: 'field_770899',
      name: '_ok',
      label: 'Click checkbox if all is ok',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'Is is really ok?',
      binding: '_ok',
      standaloneClassName: 'java.lang.Boolean',
      code: 'CheckBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition',
    },
    {
      id: 'field_4407',
      name: '_sure',
      label: 'Sure ?',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'Really really sure?',
      binding: '_sure',
      standaloneClassName: 'java.lang.Boolean',
      code: 'CheckBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition',
    },
    {
      options: [
        {
          value: 'red',
          text: 'red',
        },
        {
          value: 'blue',
          text: 'blue',
        },
        {
          value: 'yellow',
          text: 'yellow',
        },
      ],
      defaultValue: 'blue',
      inline: false,
      dataProvider: '',
      id: 'field_9005',
      name: '_status',
      label: 'Choose a colour',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'red is the colour usually',
      binding: '_status',
      standaloneClassName: 'java.lang.String',
      code: 'RadioGroup',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.selectors.radioGroup.definition.StringRadioGroupFieldDefinition',
    },
    {
      options: [
        {
          value: 'soft',
          text: 'soft day',
        },
        {
          value: 'wet',
          text: 'wet',
        },
        {
          value: 'wetter',
          text: 'very wet',
        },
        {
          value: 'lashing',
          text: 'lashing',
        },
      ],
      defaultValue: 'soft',
      addEmptyOption: true,
      dataProvider: '',
      id: 'field_9712',
      name: '_weather',
      label: 'Whats the weather like?',
      required: true,
      readOnly: false,
      validateOnChange: true,
      helpMessage: 'singing in the rain',
      binding: '_weather',
      standaloneClassName: 'java.lang.String',
      code: 'ListBox',
      serializedFieldClassName:
        'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.selectors.listBox.definition.StringListBoxFieldDefinition',
    },
  ],
  layoutTemplate: {
    version: 3,
    style: 'FLUID',
    layoutProperties: {},
    rows: [
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName: 'org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent',
                properties: {
                  HTML_CODE: '<h3>Inputs:</h3>',
                },
                parts: [],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_154220786670795E12',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'TextBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_771602590070024E11',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'TextBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_3894',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'CheckBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Check Box Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_7125',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'TextBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_9086',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'TextArea',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_15063',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'IntegerBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_520685',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'TextBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_6813',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'DecimalBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Field Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_770899',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'CheckBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Check Box Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [],
            layoutComponents: [
              {
                dragTypeName:
                  'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                properties: {
                  field_id: 'field_4407',
                  form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                },
                parts: [
                  {
                    partId: 'CheckBox',
                    cssProperties: {},
                  },
                  {
                    partId: 'Check Box Label',
                    cssProperties: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        height: '12',
        properties: {},
        layoutColumns: [
          {
            span: '12',
            height: '12',
            properties: {},
            rows: [
              {
                height: '12',
                properties: {},
                layoutColumns: [
                  {
                    span: '12',
                    height: '6',
                    properties: {},
                    rows: [],
                    layoutComponents: [
                      {
                        dragTypeName:
                          'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                        properties: {
                          field_id: 'field_9712',
                          form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                        },
                        parts: [
                          {
                            partId: 'ListBox',
                            cssProperties: {},
                          },
                          {
                            partId: 'Field Label',
                            cssProperties: {},
                          },
                        ],
                      },
                    ],
                  },
                  {
                    span: '12',
                    height: '6',
                    properties: {},
                    rows: [],
                    layoutComponents: [
                      {
                        dragTypeName:
                          'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                        properties: {
                          field_id: 'field_9005',
                          form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                        },
                        parts: [
                          {
                            partId: 'RadioGroup',
                            cssProperties: {},
                          },
                          {
                            partId: 'Field Label',
                            cssProperties: {},
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            layoutComponents: [],
          },
        ],
      },
    ],
  },
};
