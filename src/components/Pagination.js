import paginate from "./helpers/paginate.js";


export default class Pagination {
    constructor(container, options, callback) {
        this.container = container;
        this.options = options;
        this.callback = callback;
        this.selectedLength = 5;

        // this.data = [];


        this.render();
    }


    handleChange(index) {
        this.selectedLength = index;
        this.callback(0, this.selectedLength);
    }

    lengthFilter() {

        const select = document.createElement('select');
        for (let i = 0, length = this.options.pagination.length.length; i < length; i++) {
            const item = this.options.pagination.length[i];

            const option = document.createElement('option');
            option.value = item.value;
            option.text = item.text;
            option.selected = item.selected || false;

            if (item.selected) {
                this.selectedLength = item.value;
            }

            select.appendChild(option);
        }
        select.addEventListener('change', (e) => {
            this.handleChange(e.target.value);
        });

        return select;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = "tx-pagination";


        wrapper.appendChild(this.lengthFilter());
        this.container.appendChild(wrapper);

        this.callback(0, this.selectedLength);
    }
}