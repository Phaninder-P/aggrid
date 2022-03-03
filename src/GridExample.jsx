import React, { useState, useMemo } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import CustomTooltip from './CustomTooltip';
import { useNavigate } from 'react-router-dom';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const NameDesc = (params) =>
{
 let data=params.data.Description
    return `${data.name}-${data.rating}` 
    
}
const sorting=(nodeA,nodeB)=>
{

    return nodeA.data.Description['rating']-nodeB.data.Description['rating']
    
}

const DeltaIndicator = (params) => {
    const colors = {
        "Delivered": "green",
        "OFD": "blue",
        "Picked": "purple",
        "Left": "yellow",
        "PackingFinished": "pink",
        "Arrived": "orange"
    };
    return <div className={colors[params.value]}><FontAwesomeIcon icon={faCircle} /> {params.value}</div>;
}
const DateFormatter = (params) => {
    let start = moment(params.value,'DD/MM/YYYY')
    let currdate=moment().startOf('day')
 let diff=currdate.diff(start,'days')
 console.log('start',start,'currdate',currdate,'diff',diff)
    return  diff===0?'Today':diff===1?'Yesterday':params.value

}
const customComparator = (valueA, valueB) => {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  };


const GridExample = () => {
    const [columnDefs] = useState([
        {

            field: 'TrackingID',
            maxWidth: 150,
            pinned: 'left',
            lockPinned: true,
            cellClass: 'lock-pinned',
        },
        {
            field: 'ProductName',
            minWidth: 200,
            comparator: customComparator         
        },
        {
            field: 'Description',
            minWidth: 200,
            valueGetter: NameDesc,
            filter: 'agTextColumnFilter',
            comparator: sorting,
        },
        {
            field: 'Status',
            minWidth: 200,
            cellRenderer: DeltaIndicator,
            tooltipField: 'Status',
            tooltipComponentParams: { color: '#ececec' },
        },

        {
            field: 'LastUpdated',
            minWidth: 200,
            valueFormatter: DateFormatter,
            pinned: 'right',
            lockPinned: true,
            cellClass: 'lock-pinned',      
        },

    ]);
    const [defaultColDef] = useState({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        tooltipComponent: CustomTooltip,
        
    });
    const statusBar = useMemo(() => {
        return {
          statusPanels: [
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' },
          ],
        };
      }, []);
  
    const [tooltipShowDelay] = useState(0);
    const [tooltipHideDelay] = useState(2000);
    const [rowData] = useState(
        [
            { TrackingID: 1, ProductName: 'Pen', Description: {name:'This is a nice Pen', rating:4}, Status: 'Delivered', LastUpdated: '03/3/2022' },
            { TrackingID: 2, ProductName: 'Book', Description: {name:'This is a nice Pen',rating:3}, Status: 'OFD', LastUpdated: '02/3/2022' },
            { TrackingID: 3, ProductName: 'ball', Description: {name:'This is a nice Ball',rating:2}, Status: 'Picked', LastUpdated: '1/2/2022' },
            { TrackingID: 4, ProductName: 'Bat', Description: {name:'This is a nice Bat',rating:5}, Status: 'Left', LastUpdated: '03/3/2022' },
            { TrackingID: 5, ProductName: 'Book2', Description: {name:'This is a nice Book2',rating:4}, Status: 'OFD', LastUpdated: '02/3/2022' },
            { TrackingID: 6, ProductName: 'Ball2', Description: {name:'This is a nice Ball2',rating:3}, Status: 'Picked', LastUpdated: '4/2/2022' },
        ]
    );
    
    const navigate = useNavigate();
    const getContextMenuItems = (params) => {
        var result = [
            {
                // custom item
                name: 'Get Details ',
                action: function () {
                    navigate("/trackingId/" + params.value);
                },
            },
        ];
        return result;
    };
    return (
        <div
            className="ag-theme-balham"
            style={{
                height: '225px',
                width: '1000px'
            }}
        >
            
            <div className="title" >
                <p>ALL ORDERS</p>
            </div>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                getContextMenuItems={getContextMenuItems}
                allowContextMenuWithControlKey={true}
                tooltipShowDelay={tooltipShowDelay}
                tooltipHideDelay={tooltipHideDelay}
                enableRangeSelection={true}
                rowSelection={'multiple'}
                statusBar={statusBar}
            ></AgGridReact>
        </div>
    );
}


export default GridExample;