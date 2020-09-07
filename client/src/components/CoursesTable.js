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
import BackupIcon from '@material-ui/icons/Backup';

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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    BackupIcon: forwardRef((props, ref) => <BackupIcon {...props} ref={ref} />)
};
export default function CoursesTable() {
    //const { users, match: { params } } = props;
    //const [users, usersSet] = React.useState([]);
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'Name' },
            { title: 'Description', field: 'Description' },
            { title: 'Source', field: 'Src', type: 'string' },
            { title: 'Price', field: 'Price', type: 'currency' }

        ],
        data: [],
        action: [
            {
                icon: BackupIcon,
                tooltip: 'upload Image',
                onClick: (event, rowData) => {
                    document.getElementById("file-input").click();
                    console.log(document.getElementById("file-input").value)
                    let newSource = document.getElementById("file-input").value;
                    let newRow = { Name: rowData.Name, Description: rowData.Description, Src: newSource, Price: rowData.Price }
                    console.log("src new row is " + newRow.Src);
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(rowData)] = newRow;
                        return { ...prevState, data };
                    });
                    //rowData.Src=document.getElementById("file-input").value
                }
            }
        ]

    });
    React.useEffect(() => {
        async function fetchCourses() {
            const fullResponse = await fetch('/getCatalog2');
            const responseJson = await fullResponse.json();
            console.log("All Courses: " + responseJson);
            setState((prevState) => {
                const data = [...prevState.data];
                responseJson.forEach(item => {
                    console.log("source :" + item.src)
                    let source = "";
                    source += item.src
                    let x = { 'Name': item.name, 'Description': item.description, 'Src': source, 'Price': item.price };
                    data.push(x);
                })
                return { ...prevState, data };
            });
        }

        fetchCourses();
    }, []);
    return (
        <div style={{ width: "100%" }}>

            <MaterialTable
                icons={tableIcons}
                title="Courses"
                columns={state.columns}
                data={state.data}
                actions={state.action}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                console.log(newData)
                                var data = { name: newData.Name, description: newData.Description, src: newData.Src, price: newData.Price };
                                console.log(data)

                                $.ajax({
                                    type: "POST",
                                    url: "/AddCourse",
                                    data: data,
                                })
                                    .done(function (res) {
                                        if (res == 'Error') {
                                            alert("Error- Course not Added");
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
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    var data = { name1: oldData.Name, name2: newData.Name, description: newData.Description, src: newData.Src, price: newData.Price };
                                    $.ajax({
                                        type: "POST",
                                        url: "/UpdateCourse",
                                        data: data,
                                    })
                                        .done(function (res) {
                                            if (res == 'Error') {
                                                alert("Error- Course not Added");
                                            }
                                            else {
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
                                var data = { name: oldData.Name };
                                console.log("the data is : " + data)
                                $.ajax({
                                    type: "POST",
                                    url: "/removeCourse",
                                    data: data,
                                })
                                    .done(function (res) {
                                        if (res == 'Error') {
                                            alert("Error- Course not deleted");
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
            >
            </MaterialTable>
            <input id="file-input" type="file" accept="images/*" style={{ display: 'none' }}></input>
        </div>
    );
}
