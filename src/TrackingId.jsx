import React,{useState, useCallback, useMemo} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {getData} from './data' ;
import { useParams } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from './CustomTooltip';

const DeltaIndicator = (params) => {
    const colors = {
        "Delivered": "green",
        "OFD": "blue",
        "Picked": "purple",
        "Left": "yellow",
        "PackingFinished": "pink",
        "Arrived": "orange",
        
    };
    return <div className={colors[params.value]}><FontAwesomeIcon icon={faCircle} /> {params.value}</div>;
}
const Tracking = () => {
    const params = useParams();
    const [columnDefs] = useState([
      { field: 'Time' },
      { field: 'Location' },
      { field: 'Status', cellRenderer: DeltaIndicator,tooltipField: 'Status', tooltipComponentParams: { color: '#ececec' }},
      { field: 'Description' },
    ]);
    const defaultColDef = useMemo(() => {       
      return {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        tooltipComponent: CustomTooltip,
      };
    }, []);
    const autoGroupColumnDef = useMemo(() => {
      return {
        headerName: 'Date',
        maxWidth: 150,
        cellRendererParams: {
        suppressCount: true,
        },
      };
    }, []);
    const getDataPath = useCallback(function (data) {
      return data.date;
    }, []);

    
    const [tooltipShowDelay] = useState(0);
    const [tooltipHideDelay] = useState(2000);
    const [rowData] = useState(getData(params.id));

    return(
        
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
                <div className="tracking"><p>Tracking ID: {params.id}</p> </div> 
                <AgGridReact         
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}                
                    allowContextMenuWithControlKey={true}
                    tooltipShowDelay={tooltipShowDelay}
                    tooltipHideDelay={tooltipHideDelay}
                    animateRows={true}
                    treeData={true}
                    groupDefaultExpanded={0}
                    getDataPath={getDataPath}
                    autoGroupColumnDef={autoGroupColumnDef}
                ></AgGridReact>
            </div>   
    );
};

export default Tracking;