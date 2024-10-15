import { TABLE } from "./components/BaseElements.js";
import Filter from "./components/Filter.js";
import dataByPath from "./components/helpers/dataByPath.js";
import paginate from "./components/helpers/paginate.js";
import specEnabled from "./components/helpers/specEnabled.js";
import Pagination from "./components/Pagination.js";
import Search from "./components/Search.js";
import TableBody from "./components/TableBody.js";
import TableHeader from "./components/TableHeader.js";

export default class Tablix {

    constructor(container, options) {
        this.container = document.querySelector(container);

        //OPTIONS
        const defaultOptions = {};
        this.options = Object.assign(defaultOptions, options);
        this.reUpdate = false;

        //TOP AREA
        this.topArea = document.createElement('div');
        this.topArea.className = 'tx-top';

        //TABLE
        this.tableWrapper = document.createElement('div');
        this.tableWrapper.className = 'tx-table-wrapper';

        //BOTTOM AREA
        this.bottomArea = document.createElement('div');
        this.bottomArea.className = 'tx-bottom';

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
        let useData = this.formattedData;

        if (this.pagination) {
            const paginatedData = paginate(this.formattedData, parseInt(this.paginationLength), parseInt(this.paginationIndex));
            this.pagination.setPaginatedData(paginatedData);
            if (!this.reUpdate) {
                this.pagination.render();   
            }
            useData = paginatedData.visibleData;
        }


        const table = TABLE();
        const thead = new TableHeader(this.options.columns, this.options).render();
        const tbody = new TableBody(this.options.columns, this.options, useData).render();

        table.appendChild(thead);
        table.appendChild(tbody);

        this.tableWrapper.innerHTML = "";
        this.tableWrapper.appendChild(table);

    }

    setupPagination() {

        this.pagination = new Pagination(this.bottomArea,
            this.options, (index, length, reupdate = false) => {
                this.paginationIndex = index;
                this.paginationLength = length;
                if (reupdate) {
                    this.reUpdate = reupdate;
                    this.reInit();
                }
            },
        );

        this.reInit();
    }


    setupSearch() {
        this.searchPlugin = new Search(this.topArea,
            this.options,
            (data) => {
                this.formattedData = data;
                if (this.filter) {
                    this.filter.clear();
                }
                this.reInit();
            }
        );
    }

    setupFilter() {

        this.filter = new Filter(this.topArea, this.options,
            (data) => {
                this.formattedData = data;
                if (this.searchPlugin) {
                    this.searchPlugin.clear();
                }
                this.reInit();
            }
        );

    }


    pluginSet() {
        if (this.searchPlugin) {
            this.searchPlugin.setData(this.dataPathBase);
        }

        if (this.filter) {
            this.filter.setData(this.dataPathBase);
        }
    }

    htmlTemplate() {

        //TOP
        if (specEnabled(this.options.filter)) {
            this.setupFilter();
        }
        if (specEnabled(this.options.search)) {
            this.setupSearch();
        }

        if (this.topArea.innerHTML) {
            this.container.appendChild(this.topArea);
        }
        //TOP


        //BODY
        this.container.appendChild(this.tableWrapper);
        //BODY

        //BOTTOM
        if (specEnabled(this.options.pagination)) {
            this.setupPagination();
        }
        if (this.bottomArea.innerHTML) {
            this.container.appendChild(this.bottomArea);
        }
        //BOTTOM
    }

    reInit() {
        console.log("reInit");
        this.renderTable();
    }

    async init() {
        if (!this.container) return;

        this.container.classList.add('tablix');

        //DATA spec
        if (this.options.api) {
            await this.fetchData();
        }

        // //HTML TEMPLATE
        this.htmlTemplate();

        this.pluginSet();

        if (!this.pagination) {
            this.reInit();
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