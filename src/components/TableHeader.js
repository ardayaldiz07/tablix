import { THEAD, TR, TH } from "./BaseElements.js";

export default class TableHeader {
    constructor(columns, options) {
        this.columns = columns;
        this.options = options;
        
        this.render();
    }

    render() {

        const thead = THEAD();
        const tr = TR();

        for (let i = 0, length = this.columns.length; i < length; i++) {
            const item = this.columns[i];
            const th = TH();
            th.innerHTML = item.text;

            tr.appendChild(th);
        }

        thead.appendChild(tr);
        return thead;

    }
}