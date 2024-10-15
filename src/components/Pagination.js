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

    renderPageNumbers() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('tx-page-numbers');
        wrapper.style.display='flex';


        const totalPages = 20;
        const visiblePages = 5;

        let startPage = Math.max(0, this.currentPage - Math.floor(visiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('p');
            pageButton.style.margin='5px';
            pageButton.style.cursor ='pointer';
            pageButton.innerText = i + 1;
            pageButton.classList.add('tx-page-number');

            if (i === this.currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                this.currentPage = i;
                this.callback(this.currentPage, this.selectedLength);
                this.renderPageNumbers();
            });

            wrapper.appendChild(pageButton);
        }

        return wrapper;
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
            //     nextButton.classList.toggle('tx-btn-disabled');
            // }
        });
        //Sıradaki



        //Önceki
        const prevButton = document.createElement('button');
        prevButton.innerHTML = 'Önceki';

        prevButton.addEventListener("click", ()=>{
            if(this.currentPage>0){
                this.currentPage--;
                this.callback(this.currentPage, this.selectedLength);        
            }
            // else{
            //     prevButton.classList.add('tx-btn-disabled');
            // }
        });
        //Önceki

     
        wrapper.appendChild(prevButton);
        wrapper.appendChild(nextButton);

        // Ekstra Butonlar
        if(this.options.pagination.enabledExtra){
            const goToStartButton = document.createElement('button');
            const extraButtonsWrapper = document.createElement('div');
            extraButtonsWrapper.className ='tx-extra-buttons';

            goToStartButton.innerText = 'Başa dön';
            goToStartButton.addEventListener('click', () =>{
                this.callback(0,this.selectedLength);
            });

            const goToEndButton = document.createElement('button');
            goToEndButton.innerText = 'Sona git';
    
            goToEndButton.addEventListener('click', ()=>{
                this.callback(this.paginatedData.totalPages-1,this.selectedLength);
            });

            extraButtonsWrapper.appendChild(goToStartButton);
            extraButtonsWrapper.appendChild(goToEndButton);

            wrapper.appendChild(extraButtonsWrapper);
        }
        // Ekstra Butonlar

        return wrapper;
    }

    render() {
        const wrapper = document.createElement('div');
        const buttons = this.renderButtons();
        const lengthFilter = this.lengthFilter();
        const pageNumbers = this.renderPageNumbers();

        wrapper.className = "tx-pagination";


        wrapper.appendChild(lengthFilter);
        wrapper.appendChild(buttons);
        wrapper.appendChild(pageNumbers);

        
        this.container.appendChild(wrapper);

        this.callback(this.currentPage, this.selectedLength);
    }
}