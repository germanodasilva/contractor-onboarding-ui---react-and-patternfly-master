export const taskFormJson = [
  {
    id: 'df0083ba-6e50-4712-8d6a-46c239216de4',
    name: 'address',
    model: {
      source: 'INTERNAL',
      className: 'org.jbpm.demo.itorders.address',
      name: 'address',
      properties: [
        {
          name: 'street',
          typeInfo: {
            type: 'BASE',
            className: 'java.lang.String',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'enter street',
              },
              {
                name: 'field-placeHolder',
                value: 'enter street',
              },
            ],
          },
        },
        {
          name: 'houseNumber',
          typeInfo: {
            type: 'BASE',
            className: 'java.lang.Integer',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'house number',
              },
              {
                name: 'field-placeHolder',
                value: 'house number',
              },
            ],
          },
        },
      ],
      formModelType: 'org.kie.workbench.common.forms.data.modeller.model.DataObjectFormModel',
    },
    fields: [
      {
        maxLength: 100,
        placeHolder: 'enter street',
        id: 'field_90027',
        name: 'street',
        label: 'enter street',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'steet helper',
        binding: 'street',
        standaloneClassName: 'java.lang.String',
        code: 'TextBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
      },
      {
        placeHolder: 'house number',
        maxLength: 100,
        id: 'field_5552',
        name: 'houseNumber',
        label: 'house number',
        required: false,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'enter house number',
        binding: 'houseNumber',
        standaloneClassName: 'java.lang.Integer',
        code: 'IntegerBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.integerBox.definition.IntegerBoxFieldDefinition',
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
                  dragTypeName:
                    'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                  properties: {
                    field_id: 'field_5552',
                    form_id: 'df0083ba-6e50-4712-8d6a-46c239216de4',
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
                    field_id: 'field_90027',
                    form_id: 'df0083ba-6e50-4712-8d6a-46c239216de4',
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
      ],
    },
  },
  {
    id: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
    name: 'org_jbpm_demo_itorders_dog',
    model: {
      source: 'INTERNAL',
      className: 'org.jbpm.demo.itorders.dog',
      name: 'dog',
      properties: [
        {
          name: 'size',
          typeInfo: {
            type: 'BASE',
            className: 'java.lang.String',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'size',
              },
              {
                name: 'field-placeHolder',
                value: 'size',
              },
            ],
          },
        },
        {
          name: 'addressDog',
          typeInfo: {
            type: 'OBJECT',
            className: 'org.jbpm.demo.itorders.address',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'EnterAddress',
              },
              {
                name: 'field-placeHolder',
                value: 'EnterAddress',
              },
            ],
          },
        },
        {
          name: 'name',
          typeInfo: {
            type: 'BASE',
            className: 'java.lang.String',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'name of dog',
              },
              {
                name: 'field-placeHolder',
                value: 'name of dog',
              },
            ],
          },
        },
        {
          name: 'type',
          typeInfo: {
            type: 'BASE',
            className: 'java.lang.String',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'breed',
              },
              {
                name: 'field-placeHolder',
                value: 'breed',
              },
            ],
          },
        },
        {
          name: 'age',
          typeInfo: {
            type: 'BASE',
            className: 'java.lang.Integer',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'age',
              },
              {
                name: 'field-placeHolder',
                value: 'age',
              },
            ],
          },
        },
      ],
      formModelType: 'org.kie.workbench.common.forms.data.modeller.model.DataObjectFormModel',
    },
    fields: [
      {
        maxLength: 10,
        placeHolder: 'name of dog',
        id: 'field_2746426634815776E12',
        name: 'name',
        label: 'name of dog',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'enter a name for dog',
        binding: 'name',
        standaloneClassName: 'java.lang.String',
        code: 'TextBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
      },
      {
        maxLength: 100,
        placeHolder: 'breed',
        id: 'field_560811456806829E11',
        name: 'type',
        label: 'breed',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'what type of dog',
        binding: 'type',
        standaloneClassName: 'java.lang.String',
        code: 'TextBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition',
      },
      {
        options: [
          {
            value: 'small',
            text: 'small',
          },
          {
            value: 'big',
            text: 'big',
          },
          {
            value: 'huge',
            text: 'huge',
          },
        ],
        addEmptyOption: true,
        dataProvider: '',
        id: 'field_0882824530967157E11',
        name: 'size',
        label: 'size',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'choose a size',
        binding: 'size',
        standaloneClassName: 'java.lang.String',
        code: 'ListBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.selectors.listBox.definition.StringListBoxFieldDefinition',
      },
      {
        placeHolder: 'age',
        maxLength: 100,
        id: 'field_567403233585151E11',
        name: 'age',
        label: 'age',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'what is the dogs age',
        binding: 'age',
        standaloneClassName: 'java.lang.Integer',
        code: 'IntegerBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.integerBox.definition.IntegerBoxFieldDefinition',
      },
      {
        nestedForm: 'df0083ba-6e50-4712-8d6a-46c239216de4',
        container: 'FIELD_SET',
        id: 'field_1606',
        name: 'addressDog',
        label: 'EnterAddress',
        required: false,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'Address helper',
        binding: 'addressDog',
        standaloneClassName: 'org.jbpm.demo.itorders.address',
        code: 'SubForm',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition',
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
                  dragTypeName:
                    'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                  properties: {
                    field_id: 'field_2746426634815776E12',
                    form_id: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
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
                    field_id: 'field_560811456806829E11',
                    form_id: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
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
                            field_id: 'field_0882824530967157E11',
                            form_id: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
                          },
                          parts: [
                            {
                              partId: 'Field Label',
                              cssProperties: {},
                            },
                            {
                              partId: 'ListBox',
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
                            field_id: 'field_567403233585151E11',
                            form_id: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
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
              ],
              layoutComponents: [],
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
                    field_id: 'field_1606',
                    form_id: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
                  },
                  parts: [],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: '8173c6c5-5db8-4d0a-916f-eb290717da3d',
    name: 'org_jbpm_demo_itorders_aDate',
    model: {
      source: 'INTERNAL',
      className: 'org.jbpm.demo.itorders.aDate',
      name: 'aDate',
      properties: [
        {
          name: 'adate',
          typeInfo: {
            type: 'BASE',
            className: 'java.util.Date',
            multiple: false,
          },
          metaData: {
            entries: [
              {
                name: 'field-label',
                value: 'A Date',
              },
              {
                name: 'field-placeHolder',
                value: 'A Date',
              },
            ],
          },
        },
      ],
      formModelType: 'org.kie.workbench.common.forms.data.modeller.model.DataObjectFormModel',
    },
    fields: [
      {
        placeHolder: 'Enter adate',
        showTime: true,
        id: 'field_4746318907980087E11',
        name: 'adate',
        label: 'What is the date',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: '',
        binding: 'adate',
        standaloneClassName: 'java.util.Date',
        code: 'DatePicker',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.datePicker.definition.DatePickerFieldDefinition',
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
                  dragTypeName:
                    'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                  properties: {
                    field_id: 'field_4746318907980087E11',
                    form_id: '8173c6c5-5db8-4d0a-916f-eb290717da3d',
                  },
                  parts: [
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
    },
  },
  {
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
          name: '_address',
          typeInfo: {
            type: 'OBJECT',
            className: 'org.jbpm.demo.itorders.address',
            multiple: false,
          },
          metaData: {
            entries: [],
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
            type: 'OBJECT',
            className: 'org.jbpm.demo.itorders.aDate',
            multiple: false,
          },
          metaData: {
            entries: [],
          },
        },
        {
          name: '_dog',
          typeInfo: {
            type: 'OBJECT',
            className: 'org.jbpm.demo.itorders.dog',
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
      {
        f: '8173c6c5-5db8-4d0a-916f-eb290717da3d',
        container: 'FIELD_SET',
        id: 'field_6',
        name: '_date',
        label: 'Enter Start date',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'Helper text for date',
        binding: '_date',
        standaloneClassName: 'org.jbpm.demo.itorders.aDate',
        code: 'SubForm',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition',
      },
      {
        placeHolder: 'floating away...',
        maxLength: 100,
        id: 'field_6813',
        name: '_float',
        label: 'Floating Number',
        required: true,
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
        placeHolder: 'enter age',
        maxLength: 100,
        id: 'field_15063',
        name: '_age',
        label: 'Age',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'What age are you anyway?',
        binding: '_age',
        standaloneClassName: 'java.lang.Integer',
        code: 'IntegerBox',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.integerBox.definition.IntegerBoxFieldDefinition',
      },
      {
        nestedForm: 'df0083ba-6e50-4712-8d6a-46c239216de4',
        container: 'FIELD_SET',
        id: 'field_2174',
        name: '_address',
        label: '_address',
        required: true,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'Enter Main Address',
        binding: '_address',
        standaloneClassName: 'org.jbpm.demo.itorders.address',
        code: 'SubForm',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition',
      },
      {
        nestedForm: '8dbe4ee9-e884-4995-9453-b2bbb5566ac2',
        container: 'FIELD_SET',
        id: 'field_2874',
        name: '_dog',
        label: '_dog',
        required: false,
        readOnly: false,
        validateOnChange: true,
        helpMessage: 'Enter Dog details',
        binding: '_dog',
        standaloneClassName: 'org.jbpm.demo.itorders.dog',
        code: 'SubForm',
        serializedFieldClassName:
          'org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition',
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
                  dragTypeName:
                    'org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent',
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
                    field_id: 'field_2174',
                    form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                  },
                  parts: [
                    {
                      partId: 'Legend Text',
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
                    field_id: 'field_6',
                    form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                  },
                  parts: [
                    {
                      partId: 'Legend Text',
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
              rows: [],
              layoutComponents: [
                {
                  dragTypeName:
                    'org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent',
                  properties: {
                    field_id: 'field_2874',
                    form_id: 'a2e10b1a-cde1-431f-86f3-a906990c5a96',
                  },
                  parts: [
                    {
                      partId: 'Legend Text',
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
  },
];
