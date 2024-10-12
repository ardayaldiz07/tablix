export default class Search {
    constructor(container, options, change) {
        this.container = container;
        this.data = [];
        this.change = change;
        this.defaultKeyword = options.search.default || '';
        this.searchFields = options.search.fields;

        this.init();
    }

    init() {
        this.createSearchInput();
    }

    setData(data) {
        this.data = data;

        if (this.defaultKeyword) {
            this.inputElement.value = this.defaultKeyword;
            this.change(this.filteredData(this.defaultKeyword));
        }
    }


    filteredData(value) {
        return this.data.filter(item => {
            return this.searchFields.some(field => {
                const fieldValue = field.split('.').reduce((acc, curr) => acc && acc[curr], item);
                return String(fieldValue).toLowerCase().includes(value.toLowerCase());
            });
        });
    }

    handleInputChange(event) {
        console.log(event);
        const value = event.target.value;
        this.change(this.filteredData(value));
    }


    createSearchInput() {
        const wrapper = document.createElement('div');
        wrapper.className = "tx-filter";

        this.inputElement = document.createElement('input');
        this.inputElement.type = 'search';
        this.inputElement.placeholder = `Search: ${this.searchFields.join(', ')}`;
        this.inputElement.className = 'tx-search-input';

        this.inputElement.addEventListener('input', this.handleInputChange.bind(this));

        wrapper.appendChild(this.inputElement);
        this.container.appendChild(wrapper);
    }
}
