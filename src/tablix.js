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

        //SORT
        this.sortedColumn = null; // Sıralanan sütun bilgisi
        this.sortOrder = null;    // Sıralama yönü



        this.init();
    }

    async fetchData() {
        const response = await fetch(this.options.api);
        const data = await response.json();

        this.data = data;
        this.dataPathBase = dataByPath(this.options.apiBasePath, data);
        this.formattedData = this.dataPathBase;
    }

    sortData(columnKey, sortOrder) {
        this.sortedColumn = columnKey;
        this.sortOrder = sortOrder;
    
        this.formattedData.sort((a, b) => {
            let aValue = a[columnKey];
            let bValue = b[columnKey];
    
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;

            
            
            return 0;
        });
    
        this.reInit();  // Tabloyu yeniden render et
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
        const thead = new TableHeader(this.options.columns, {
            ...this.options,
            sortedColumn: this.sortedColumn, 
            sortOrder: this.sortOrder,       
            onSort: (columnKey, sortOrder) => {
                this.sortData(columnKey, sortOrder); 
            }
        }).render();
        const tbody = new TableBody(this.options.columns, this.options, useData).render();

        


        this.tableWrapper.innerHTML = "";
        if(this.formattedData.length != 0){
            table.appendChild(thead);
            table.appendChild(tbody);
            this.tableWrapper.appendChild(table);
            this.pagination.render();
        }else{
            const dataNotFound = document.createElement('h1');
            dataNotFound.innerText = "Data not found";
            dataNotFound.style.textAlign="center";
            this.tableWrapper.appendChild(dataNotFound);
            this.pagination.render();
        }

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
                if(this.pagination){
                    this.pagination.render();
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
                if(this.pagination){
                    this.pagination.setCurrentPage();
                    this.pagination.render();
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

        //Style
        const link = document.createElement('link');
        this.container.classList.add(this.options.theme)
        link.rel='stylesheet';
        link.href='./output/theme.min.css';

        document.head.appendChild(link);
    }

    reInit() {
        this.renderTable();
    }

    async init() {
        if (!this.container) return;
        this.container.classList.add('tablix');
        
        //DATA spec
        if (this.options.api) {            
            await this.fetchData();
        }

        //HTML TEMPLATE
        this.htmlTemplate();

        this.pluginSet();

        if (!this.pagination) {
            this.reInit();
        }
    }
}