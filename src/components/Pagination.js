export default class Pagination {
    constructor(container, options, callback) {
        this.container = container;
        this.options = options;
        this.callback = callback;
        this.selectedLength = 5;
        this.currentPage = 0;
        this.paginatedData=[];
        // this.data = [];


        this.render();
    }

    handleChange(index) {
        this.selectedLength = index;
        this.callback(0, this.selectedLength);
    }

    setPaginatedData(data){
        this.paginatedData = data;
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

    renderButtons(){
        const wrapper = document.createElement('div');

        //Sıradaki
        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Sıradaki';
        nextButton.addEventListener("click", ()=>{
            if(this.currentPage<this.paginatedData.totalPages-1){
                this.currentPage++;
                this.callback(this.currentPage, this.selectedLength);
            }
            // else{
            //     nextButton.classList.toggle('tx-disabled');
            // }
        });

        //Önceki
        const prevButton = document.createElement('button');
        prevButton.innerHTML = 'Önceki';

        prevButton.addEventListener("click", ()=>{
            if(this.currentPage>0){
                this.currentPage--;
                this.callback(this.currentPage, this.selectedLength);        
            }
            // else{
            //     nextButton.classList.toggle('tx-disabled');
            // }
        });

        wrapper.appendChild(prevButton);
        wrapper.appendChild(nextButton);

        return wrapper;
    }

    render() {
        const wrapper = document.createElement('div');
        const buttons = this.renderButtons();
        wrapper.className = "tx-pagination";


        wrapper.appendChild(this.lengthFilter());
        wrapper.appendChild(buttons);
        this.container.appendChild(wrapper);

        this.callback(this.currentPage, this.selectedLength);
    }
}