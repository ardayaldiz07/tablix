export default class Pagination {
    constructor(container, options, callback) {
        this.container = container;
        this.options = options;
        this.callback = callback;
        this.selectedLength = 5;
        this.currentPage = 0;
        this.paginatedData = [];
        // this.data = [];
        this.nav = [];

        this.setPaginateList();
    }
    


    handleChange(index) {
        this.selectedLength = index;
        this.callback(0, this.selectedLength, true);
        
        if(this.nav.numbers){
            this.nav.numbers.innerHTML = "";
            this.nav.numbers.appendChild(this.renderPageNumbers(true));
        }
        
    }

    setPaginatedData(data) {
        this.paginatedData = data;
    }

    lengthFilter() {
        if (this.options.pagination.length) {
            const lengthWrapper = document.createElement('div');
            lengthWrapper.className = "tx-length";

            const select = document.createElement('select');
            select.className = "tx-length-select";
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
            lengthWrapper.appendChild(select);
            return lengthWrapper;
        }
        return null;
    }

    renderPageNumbers(unwrapper=false,start,end) {
        const wrapper = document.createElement('div');

   
        wrapper.classList.add('tx-page-number-wrapper');
        wrapper.style.display = 'flex';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = "tx-page-number-container";

        const totalPages = this.paginatedData.totalPages;
        const visiblePages =3;

        let startPage = start?? Math.max(0, this.currentPage - Math.floor(visiblePages / 2));
        let endPage = end?? Math.min(totalPages - 1, startPage + visiblePages - 1);

        if(this.currentPage > 1){
            const startButton = this.startButton("1");
            const point = document.createElement('span');
            point.innerText=' . . . ';
            
            buttonContainer.appendChild(startButton);
            buttonContainer.appendChild(point);
        }

        const goLeft = document.createElement('button');
        goLeft.innerText = '<';
        buttonContainer.appendChild(goLeft);
        goLeft.addEventListener('click', () =>{
            if(startPage>0){
                startPage--;
                endPage--;
                
                if(this.nav.numbers){
                    this.nav.numbers.innerHTML = "";
                    this.nav.numbers.appendChild(this.renderPageNumbers(true,startPage,endPage));
                }
                
            }
        });

        for (let i =  this.currentPage == totalPages-1 ? startPage-1 : startPage ; i <= endPage; i++) {
         
            const pageButton = document.createElement('button');
            pageButton.style.margin = '5px';
            pageButton.style.cursor = 'pointer';
            pageButton.innerText = i + 1;
            pageButton.classList.add('tx-page-number');

            if (i === this.currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                this.currentPage = i;
                this.callback(this.currentPage, this.selectedLength, true);

                if(this.nav.numbers){
                    this.nav.numbers.innerHTML = "";
                    this.nav.numbers.appendChild(this.renderPageNumbers(true));
                }
            });
            buttonContainer.appendChild(pageButton);
        }

        const goRight = document.createElement('button');
        goRight.innerText = '>';
        buttonContainer.appendChild(goRight);
        goRight.addEventListener('click', () =>{
            if(endPage<totalPages-1){
                startPage++;
                endPage++;
                if(this.nav.numbers){
                    this.nav.numbers.innerHTML = "";
                    this.nav.numbers.appendChild(this.renderPageNumbers(true,startPage,endPage));
                }
            }
        });


        if(this.currentPage < totalPages-3){
            const point = document.createElement('span');
            point.innerText=' . . . ';
            buttonContainer.appendChild(point);
            
            const endButton = this.endButton(totalPages);
            buttonContainer.appendChild(endButton);
        }

        if (!unwrapper) {
            wrapper.appendChild(buttonContainer);
            return wrapper;    
        }else{
            return buttonContainer;
        }
        
    }

    nextButton() {
        const nextButton = document.createElement('button');
        nextButton.className = "tx-next-btn";
        nextButton.innerHTML = 'Sıradaki';
        nextButton.addEventListener("click", () => {

            if (this.currentPage < this.paginatedData.totalPages - 1) {
                this.currentPage++;
                this.callback(this.currentPage, this.selectedLength, true);

                if(this.nav.numbers){
                    this.nav.numbers.innerHTML = "";
                    this.nav.numbers.appendChild(this.renderPageNumbers(true));
                }

            }
        });

        return nextButton;
    }

    prevButton() {
        const prevButton = document.createElement('button');
        prevButton.className = "tx-prev-btn";
        prevButton.innerHTML = 'Önceki';

        prevButton.addEventListener("click", () => {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.callback(this.currentPage, this.selectedLength, true);

                if(this.nav.numbers){
                    this.nav.numbers.innerHTML = "";
                    this.nav.numbers.appendChild(this.renderPageNumbers(true));
                }
            }
        });
        return prevButton;
    }

    renderSelectbox(){
        const selectBox = document.createElement('select');
        selectBox.className = 'tx-selectBox';
        for(let i=0; i<this.paginatedData.totalPages; i++){
            const option = document.createElement('option');
            option.value = i;
            option.innerText = (i+1);
            selectBox.appendChild(option);
        };

        selectBox.addEventListener('change',(event)=>{
            this.currentPage = parseInt(event.target.value);
            this.callback(this.currentPage,this.selectedLength,true);

            if(this.nav.numbers){
                this.nav.numbers.innerHTML = "";
                this.nav.numbers.appendChild(this.renderPageNumbers(true));
            }
        });
        return selectBox;
    }
    setCurrentPage(){
        this.currentPage=0;
        this.callback(this.currentPage, this.selectedLength, true);
    }

    startButton(text) {
        const goToStartButton = document.createElement('button');

        goToStartButton.innerText = text;
        goToStartButton.addEventListener('click', () => {
            if (this.currentPage > 0) {
                this.currentPage = 0;
                this.callback(this.currentPage, this.selectedLength, true);

                if(this.nav.numbers){
                    this.nav.numbers.innerHTML = "";
                    this.nav.numbers.appendChild(this.renderPageNumbers(true));
                }
                
            }
        });

        return goToStartButton;
    }

    endButton(text) {
        const goToEndButton = document.createElement('button');
        goToEndButton.innerText = text;

        goToEndButton.addEventListener('click', () => {
            this.currentPage = parseInt(this.paginatedData.totalPages - 1);
            this.callback(this.currentPage, this.selectedLength, true);
            if(this.nav.numbers){
                this.nav.numbers.innerHTML = "";
                this.nav.numbers.appendChild(this.renderPageNumbers(true));
            }
        });
        return goToEndButton;
    }

    renderButtons() {
        const wrapper = document.createElement('div');
        wrapper.className = "tx-navigate-buttons";

        const navigationMap = {
            "prev": this.prevButton(),
            "next": this.nextButton(),
            "start": this.startButton('Başa Dön'),
            "end": this.endButton('Sona Git'),
            "numbers": this.renderPageNumbers(),
            "selectPage":this.renderSelectbox()
        };

        for (let i = 0, length = this.options.pagination.buttons.length; i < length; i++) {
            const name = this.options.pagination.buttons[i];
            this.nav[name] = navigationMap[name];
            wrapper.appendChild(this.nav[name]);
        }

        return wrapper;
    }

    getPaginateLength() {
        for (let i = 0, length = this.options.pagination.length.length; i < length; i++) {
            const item = this.options.pagination.length[i];
            if (item.selected) {
                this.selectedLength = item.value;
            }
        }
    }

    setPaginateList() {
        this.getPaginateLength();

        this.callback(this.currentPage, this.selectedLength);
    }

    render() {
        if (this.paginationWrapper) {
            this.paginationWrapper.remove();
        }
        this.paginationWrapper = document.createElement('div');
        this.paginationWrapper.className = "tx-pagination";
       
        const renderButtons = this.renderButtons();
        const lengthFilter = this.lengthFilter();

        // const selectBox = this.renderSelectbox();

        if (lengthFilter) {
            this.paginationWrapper.appendChild(lengthFilter);
        }

        if(this.nav.numbers){
            this.nav.numbers.innerHTML = "";
            this.nav.numbers.appendChild(this.renderPageNumbers(true));
        }

        this.paginationWrapper.appendChild(renderButtons);
        // this.paginationWrapper.appendChild(selectBox);

        this.container.appendChild(this.paginationWrapper);

    }
}