import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";
import { style } from "@mui/system";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [

  {
    type: FieldType.Div,
    style:{
      display: "flex",
    },
    fields:[
      {
        type: FieldType.Div,
        style:{
          width: '30%',
        },
        fields:[
            {
              type: FieldType.Paper,
              style:{
                width: '70%',
                margin: 'auto',
                height: '70%',
              },
            },
            {
              type: FieldType.Rating,
            },
        ]
      },
      {
        type: FieldType.Div,
        style:{
          width: '70%',
        },
        fields:[
          {
            type: FieldType.Line,
            title: "Профиль",
          },
          {
            type: FieldType.Combo,
            name: "Пол",
            title: "Пол",
          },
          {
            type: FieldType.Combo,
            name: "Cписки",
            title: "Списки",
          },
          {
            type: FieldType.Div,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
            },  
            fields:[
              {
                type: FieldType.Text,
                name: "keyword",
                title: "Кодовая фраза",
                outlined: false,
                disabled: true,
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "completed",
                title: "Кодовая фраза",
                disabled: false,
              },
            ],
          },
        ]
      },
    ],
  },



  {
    type: FieldType.Line,
    title: "Общая информация",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "Имя",
    description: 'First Name',
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Фамилия",
    description: "Last Name",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Возраст",
    description: 'Age',
  },

  {
    type: FieldType.Expansion,
    description: 'Подписка на уведомления',
    title: 'Подписка',
    
  },

  {
    type: FieldType.Hero,
    style:{
      width: '100%',
    }
    
  },

  {
    type: FieldType.Div,
    style: {
      display: "flex",
    },  
    fields: [
      {
        type: FieldType.Div,
        style: {
          width: '50%',
        }, 
        fields:[
          {
            type: FieldType.Line,
            title: "Работа",
          },
          {
            type: FieldType.Text,
            name: "jobTitle",
            title: "Должность",
          },
          {
            type: FieldType.Text,
            name: "jobArea",
            title: "Место работы",
          },
        ],
      },

      {
        type: FieldType.Div,
        style: {
          width: '50%',
        }, 
        fields:[
          {
            type: FieldType.Line,
            title: "Домашний адрес",
          },
          {
            type: FieldType.Text,
            name: "country",
            title: "Страна",
          },
          {
            type: FieldType.Text,
            name: "city",
            title: "Город",
          },
          {
            type: FieldType.Text,
            name: "state",
            title: "Область",
          },
          {
            type: FieldType.Text,
            name: "address",
            title: "Адрес",
          },
        ],
        
      },
    ],
  },
  

  
  
];






export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [
    fetchApi<ITodoItem>(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
