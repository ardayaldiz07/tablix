import dataByPath from "./helpers/dataByPath.js";

export default class CategoryFilter {
    constructor(container,options, setFilteredData) {
        this.options = options;
        this.data=[];
        this.container = container;
        this.filterItems = options.filter.items;
        this.setFilteredData = setFilteredData;
        this.render();
    }

    setData(data){
        this.data = data;
    }

    handleCategoryChange(category) {
        if (category === '') {
            this.setFilteredData(this.data);
        } else {
            const filteredData = this.data.filter(item => {
                const categoryItems = dataByPath(this.options.filter.field,item)  || [];  //item.category?.items || [];
                console.log(item);
                return categoryItems.some(cat => cat.name.toLowerCase() === category.toLowerCase());
            });
            this.setFilteredData(filteredData);
        }
    }

    render() {
        const select = document.createElement('select');
        select.className = 'tx-category';

        // Varsayılan seçenek: Tüm Kategoriler
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Tüm Kategoriler';
        select.appendChild(defaultOption);

        // Kategorileri doldur
        this.filterItems.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            select.appendChild(option);
        });
        
        select.addEventListener('change', (e) => {
            this.handleCategoryChange(e.target.value);
        });

        this.container.appendChild(select);
    }
}
