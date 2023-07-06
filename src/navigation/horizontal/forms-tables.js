// ** Icons Import
import { Edit, Copy, Circle, Box, Package, AlertTriangle, RotateCw, Server, Grid } from 'react-feather'

export default [
  {
    id: 'formsAndTable',
    title: 'Forms & Tables',
    roleArr: [],
    icon: <Edit />,
    children: [
      {
        id: 'formElements',
        roleArr: ["ADMIN"],
        title: 'Form Elements',
        icon: <Copy />,
        children: [
          {
            id: 'input',
            roleArr: ["ADMIN"],
            title: 'Input',
            icon: <Circle />,
            navLink: '/forms/elements/input'
          },
          {
            id: 'inputGroup',
            roleArr: ["ADMIN"],
            title: 'Input Groups',
            icon: <Circle />,
            navLink: '/forms/elements/input-group'
          },
          {
            id: 'inputMask',
            roleArr: ["ADMIN"],
            title: 'Input Mask',
            icon: <Circle />,
            navLink: '/forms/elements/input-mask'
          },
          {
            id: 'textarea',
            roleArr: ["ADMIN"],
            title: 'Textarea',
            icon: <Circle />,
            navLink: '/forms/elements/textarea'
          },
          {
            id: 'checkbox',
            roleArr: ["ADMIN"],
            title: 'Checkbox',
            icon: <Circle />,
            navLink: '/forms/elements/checkbox'
          },
          {
            id: 'radio',
            roleArr: ["ADMIN"],
            title: 'Radio',
            icon: <Circle />,
            navLink: '/forms/elements/radio'
          },
          {
            id: 'switch',
            roleArr: ["ADMIN"],
            title: 'Switch',
            icon: <Circle />,
            navLink: '/forms/elements/switch'
          },
          {
            id: 'select',
            roleArr: ["ADMIN"],
            title: 'Select',
            icon: <Circle />,
            navLink: '/forms/elements/select'
          },
          {
            id: 'numberInput',
            roleArr: ["ADMIN"],
            title: 'Number Input',
            icon: <Circle />,
            navLink: '/forms/elements/number-input'
          },
          {
            id: 'fileUploader',
            roleArr: ["ADMIN"],
            title: 'File Uploader',
            icon: <Circle />,
            navLink: '/forms/elements/file-uploader'
          },
          {
            id: 'quillEditor',
            roleArr: ["ADMIN"],
            title: 'Editor',
            icon: <Circle />,
            navLink: '/forms/elements/editor'
          },
          {
            id: 'date_&_timePicker',
            roleArr: ["ADMIN"],
            title: 'Date & Time Picker',
            icon: <Circle />,
            navLink: '/forms/elements/pickers'
          }
        ]
      },
      {
        id: 'formLayouts',
        roleArr: ["ADMIN"],
        title: 'Form Layout',
        icon: <Box />,
        navLink: '/forms/layout/form-layout'
      },
      {
        id: 'wizard',
        roleArr: ["ADMIN"],
        title: 'Form Wizard',
        icon: <Package />,
        navLink: '/forms/wizard'
      },
      {
        id: 'formValidation',
        roleArr: ["ADMIN"],
        title: 'Form Validation',
        icon: <AlertTriangle size={12} />,
        navLink: '/forms/form-validation'
      },
      {
        id: 'formRepeater',
        roleArr: ["ADMIN"],
        title: 'Form Repeater',
        icon: <RotateCw />,
        navLink: '/forms/form-repeater'
      },
      {
        id: 'tablesReactstrap',
        roleArr: ["ADMIN"],
        title: 'Table',
        icon: <Server />,
        navLink: '/tables/reactstrap'
      },
      {
        id: 'dataTable',
        roleArr: ["ADMIN"],
        title: 'DataTable',
        icon: <Grid />,
        children: [
          {
            id: 'dtBasic',
            roleArr: ["ADMIN"],
            title: 'Basic',
            icon: <Circle />,
            navLink: '/datatables/basic'
          },
          {
            id: 'dtAdvance',
            roleArr: ["ADMIN"],
            title: 'Advanced',
            icon: <Circle />,
            navLink: '/datatables/advance'
          }
        ]
      }
    ]
  }
]
