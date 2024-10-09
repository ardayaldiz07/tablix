import { TABLE } from "./components/BaseElements.js";
import dataByPath from "./components/helpers/dataByPath.js";
import Search from "./components/Search.js";
import TableBody from "./components/TableBody.js";
import TableHeader from "./components/TableHeader.js";

export default class Tablix {
    
    constructor(container, options) {
        this.container = document.querySelector(container);
        const defaultOptions = {};
        this.options = Object.assign(defaultOptions, options);
        this.data = [];
        this.dataPathBase = [];
        this.formattedData = [];
        this.init();
        this.searchQuery;

    }

    async fetchData() {
        const response = await fetch(this.options.api);
        const data = await response.json();

        this.data = data;
        this.dataPathBase = dataByPath(this.options.apiBasePath, data);
        this.formattedData = this.dataPathBase;
        
        this.reInit();

        // Yeri değişecek
        new Search(this.formattedData,(newData) => {
            this.formattedData = newData
            this.reInit();
        },this.options.search.fields,document.body);
    
    }

    renderTable() {

        const table = TABLE();
        const thead = new TableHeader(this.options.columns, this.options).render();
        const tbody = new TableBody(this.options.columns, this.options, this.formattedData).render();

        table.appendChild(thead);
        table.appendChild(tbody);
        
        this.container.innerHTML = '';



        this.container.appendChild(table);
    }

    setupPagination() {

    }

    setupFilter() {

    }

    reInit() {
        this.renderTable();
    }

    init() {


        if (this.options.api) {
            this.fetchData();

        } else {
            this.reInit()
        }



    }
}


//USAGE
// new Tablix("#table", {
//     api: 'https://apiv2.haberturk.com/api/v1/tummansetler',
//     apiBasePath: 'body.content.items',
//     theme:'theme-01',
//     data: [],
//     search: {
//         enabled: true,
//         fields: ['newsId', 'title', 'spot']
//     },
//     filter: {
//         enabled: true,
//         items: ['Gündem', 'Ekonomi', 'Dünya']
//     },
//     columns: [
//         { field: 'newsId', text: 'ID', sort: true, sorted: true },
//         { field: 'title', text: 'Başlık', sort: true },
//         { field: 'category.items', sort: true, text: 'Kategori', splitField: 'name', splitBy: '/' },
//         { field: 'spot', text: 'Spot', sort: true }
//     ],
//     itemPerPage: 5,
//     pagination: true,
//     usePage: false,
//     pageOptions: [
//         { text: '5', value: 5 },
//         { text: '10', value: 10 },
//         { text: '20', value: 20 },
//         { text: '30', value: 30 },
//         { text: '40', value: 40 },
//         { text: '50', value: 50 }
//     ]
// });