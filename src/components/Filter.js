import dataByPath from "./helpers/dataByPath.js";

export default class Filter {
    constructor(container, options, setFilteredData) {
        this.container = container;
        this.options = options;

        this.data = [];
        this.filterItems = options.filter.items;
        this.setFilteredData = setFilteredData;

        this.render();
    }

    setData(data) {
        this.data = data;
    }

    handleChange(val) {
        console.log(val);
        if (val == 0) {
            this.setFilteredData(this.data);
        } else {
            const filteredData = this.data.filter(item => {
                const items = dataByPath(this.options.filter.field, item) || [];
                return items.some(cat => cat.name.toLowerCase() === val.toLowerCase());
            });
            this.setFilteredData(filteredData);
        }
    }

    clear(){
        this.select.value = 0;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = "tx-filter";

        this.select = document.createElement('select');

        const defaultOption = document.createElement('option');
        defaultOption.value = 0;
        defaultOption.text = 'Tüm Kategoriler';
        this.select.appendChild(defaultOption);

        this.filterItems.forEach((item) => {
            const option = document.createElement('option');
            option.value = item;
            option.text = item;
            this.select.appendChild(option);
        });

        this.select.addEventListener('change', (e) => {
            this.handleChange(e.target.value);
        });
        
        wrapper.appendChild(this.select);
        this.container.appendChild(wrapper);
    }
}
