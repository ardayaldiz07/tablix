import { TBODY, TR, TD } from "./BaseElements.js";
import dataByPath from "./helpers/dataByPath.js";
import splitField from "./helpers/splitField.js";


export default class TableBody {
    constructor(columns, options, data) {
        this.columns = columns;
        this.options = options;
        this.data = data;

        this.render();
    }

    render() {

        const tbody = TBODY();

        for (let i = 0, trLength = this.data.length; i < trLength; i++) {
            const tr = TR();
            const item = this.data[i];

            for (let j = 0, colLength = this.columns.length; j < colLength; j++) {
                const col = this.columns[j];
                const td = TD();
                
                if (col.splitField) {
                    td.innerHTML = splitField(col,item);
                }else{
                    td.innerHTML = dataByPath(col.field, item);
                }
                

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        // for (let i = 0, length = this.columns.length; i < length; i++) {
        //     const item = this.columns[i];
        //     const td = TD();
        //     td.innerHTML = item.text;

        //     tr.appendChild(td);
        // }


        return tbody;

    }
}