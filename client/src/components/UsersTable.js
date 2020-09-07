import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import $ from "jquery";
import { array } from 'prop-types';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
export default function UsersTable() {
  //const { users, match: { params } } = props;
  //const [users, usersSet] = React.useState([]);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'Name' },
      { title: 'Role', field: 'Role' },
      { title: 'Email', field: 'Email', editable: 'onAdd' },
      { title: 'Password', field: 'Password' }
    ],
    data: []

  });
  React.useEffect(() => {
    async function fetchUsers() {
      const fullResponse = await fetch('/usersTable');
      const responseJson = await fullResponse.json();
      console.log("All Users: " + responseJson);
      setState((prevState) => {
        const data = [...prevState.data];
        responseJson.forEach(item => {
          let x = { 'Name': item.name, 'Role': item.type, 'Email': item.email, 'Password': item.password1 };
          data.push(x);
        })
        // data.push(usersHelp);
        return { ...prevState, data };
      });
      console.log("All Users: " + state.data);

    }

    fetchUsers();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        title="Users"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                var data = { email: newData.Email, name: newData.Name, password: newData.Password, type: newData.Role };
                $.ajax({
                  type: "POST",
                  url: "/AddUser",
                  data: data,
                })
                  .done(function (res) {
                    if (res == 'Error') {
                      alert("Error- User not Added");
                    }
                    else {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }
                  })
                  .fail(function (jqXhr) { });
                //  console.log(res);                   
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  var data = { email: newData.Email, name: newData.Name, password: newData.Password, type: newData.Role };
                  $.ajax({
                    type: "POST",
                    url: "/UpdateUser",
                    data: data,
                  })
                    .done(function (res) {
                      if (res == 'Error') {
                        alert("Error- User not Added");
                      }
                      else {
                        sessionStorage.setItem("name", newData.Name);
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    })
                    .fail(function (jqXhr) { });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                //let res=RemoveUserFromServer(oldData);
                var data = { email: oldData.Email };
                // const res = await fetch('/removeUser', { method: 'POST', body: {email:user.Email} });
                $.ajax({
                  type: "POST",
                  url: "/removeUser",
                  data: data,
                })
                  .done(function (res) {
                    if (res == 'Error') {
                      alert("Error- User not deleted");
                    }
                    else {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }
                  })
                  .fail(function (jqXhr) { });
                //  console.log(res);            
              }, 600);
            }),
        }}
      ></MaterialTable>
    </div>
  );
}
