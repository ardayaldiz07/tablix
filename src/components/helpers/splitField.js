import dataByPath from "./dataByPath.js";


const splitField = (col, item) => {
    const fields = dataByPath(col.field, item) || [];
    let html = "";
    for (let i = 0, fieldLength = fields.length; i < fieldLength; i++) {
        const element = fields[i];

        const splitSymbol = i != (fieldLength -1) ? col.splitBy: '';
        
        html += `${dataByPath(col.splitField, element)} ${splitSymbol} `;
    }

    return html;
};
export default splitField;