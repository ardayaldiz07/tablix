import { TABLE } from "./components/BaseElements.js";
import CategoryFilter from "./components/CategoryFilter.js";
import dataByPath from "./components/helpers/dataByPath.js";
import specEnabled from "./components/helpers/specEnabled.js";
import Search from "./components/Search.js";
import TableBody from "./components/TableBody.js";
import TableHeader from "./components/TableHeader.js";

export default class Tablix {

    constructor(container, options) {
        this.container = document.querySelector(container);

        //OPTIONS
        const defaultOptions = {};
        this.options = Object.assign(defaultOptions, options);

        //TABLE
        this.tableWrapper = document.createElement('div');
        this.tableWrapper.className = 'tx-table-wrapper';


        //DATA
        this.data = Object.assign([], this.options.data);
        this.dataPathBase = Object.assign([], this.options.data);
        this.formattedData = Object.assign([], this.options.data);



        this.init();
    }

    async fetchData() {
        const response = await fetch(this.options.api);
        const data = await response.json();

        this.data = data;
        this.dataPathBase = dataByPath(this.options.apiBasePath, data);
        this.formattedData = this.dataPathBase;
    }

    renderTable() {

        const table = TABLE();
        const thead = new TableHeader(this.options.columns, this.options).render();
        const tbody = new TableBody(this.options.columns, this.options, this.formattedData).render();

        table.appendChild(thead);
        table.appendChild(tbody);

        this.tableWrapper.innerHTML = "";
        this.tableWrapper.appendChild(table);

    }

    setupPagination() {

    }

    setupSearch() {
        this.searchPlugin = new Search(this.container,
            this.options,
            (newData) => {
                this.formattedData = newData;
                this.reInit();
            });

    }

    setupCategoryFilter() {
         
        this.categoryFilter = new CategoryFilter(this.container,this.options,
            (filteredData) => {
            this.formattedData = filteredData;
            this.reInit();
        })
        
    }


    pluginSet() {
        if (this.searchPlugin) {
            this.searchPlugin.setData(this.dataPathBase);
        }
        if (this.categoryFilter) {
            this.categoryFilter.setData(this.dataPathBase);
        }
    }

    htmlTemplate() {

        if (specEnabled(this.options.search)) {
            this.setupSearch();
        }

        if (specEnabled(this.options.pagination)) {
            this.setupPagination();
        }

        if(specEnabled(this.options.filter)){
            this.setupCategoryFilter();
        }
    
        this.container.appendChild(this.tableWrapper);

    }
    reInit() {
        this.renderTable();
    }
    async init() {
        if (!this.container) return;

        this.container.classList.add('tablix');

        //HTML TEMPLATE
        this.htmlTemplate();

        //DATA spec
        if (this.options.api) {
            await this.fetchData();
        }

        this.pluginSet();



        this.reInit();
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