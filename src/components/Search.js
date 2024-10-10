export default class Search {
    constructor(data, change, searchFields,container) {
        this.container = container;
        this.data = data;
        this.change = change;
        this.searchFields = searchFields;
        this.inputValue = '';
        console.log(this.data);

        this.init();
    }

    init() {
        this.createSearchInput();
    }

    createSearchInput() {
        const wrapper = document.createElement('div');

        this.inputElement = document.createElement('input');
        this.inputElement.type = 'search';
        this.inputElement.placeholder = `Search: ${this.searchFields.join(', ')}`;
        this.inputElement.className = 'mb-2 border border-gray-600 p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500';

        this.inputElement.addEventListener('input', this.handleInputChange.bind(this));

        wrapper.appendChild(this.inputElement);
        this.container.appendChild(wrapper); // İstediğiniz bir konteynere ekleyin
    }

    handleInputChange(event) {
        const value = event.target.value;
        this.inputValue = value;

        const filteredData = this.data.filter(item => {
            return this.searchFields.some(field => {
                const fieldValue = field.split('.').reduce((acc, curr) => acc && acc[curr], item);
                return String(fieldValue).toLowerCase().includes(value.toLowerCase());
            });
        });

        this.change(filteredData);
    }
}
