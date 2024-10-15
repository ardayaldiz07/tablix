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
        
        this.nav.numbers.innerHTML = "";
        this.nav.numbers.appendChild(this.renderPageNumbers(true));
    }

    setPaginatedData(data) {
        this.paginatedData = data;
    }

    lengthFilter() {
        if (this.options.pagination.length) {
            const lengthWrapper = document.createElement('div');
            lengthWrapper.className = "tx-length";

            const select = document.createElement('select');
            select.className = "txt-length-select";
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

    renderPageNumbers(unwrapper=false) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('tx-page-number-wrapper');
        wrapper.style.display = 'flex';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = "tx-page-number-container";

        console.log("renderPageNumbers", this.paginatedData);

        const totalPages = this.paginatedData.totalPages;
        const visiblePages = this.paginatedData.itemsPerPage;

        let startPage = Math.max(0, this.currentPage - Math.floor(visiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
        
        console.log(startPage,endPage)

        for (let i = startPage; i <= endPage; i++) {
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

                this.nav.numbers.innerHTML = "";
                this.nav.numbers.appendChild(this.renderPageNumbers(true));
                
            });
            buttonContainer.appendChild(pageButton);
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
        nextButton.className = "txt-next-btn";
        nextButton.innerHTML = 'Sıradaki';
        nextButton.addEventListener("click", () => {

            if (this.currentPage < this.paginatedData.totalPages - 1) {
                this.currentPage++;
                this.callback(this.currentPage, this.selectedLength, true);
            }
        });

        return nextButton;
    }

    prevButton() {
        const prevButton = document.createElement('button');
        prevButton.className = "txt-prev-btn";
        prevButton.innerHTML = 'Önceki';

        prevButton.addEventListener("click", () => {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.callback(this.currentPage, this.selectedLength, true);
            }
        });
        return prevButton;
    }

    startButton() {
        const goToStartButton = document.createElement('button');

        goToStartButton.innerText = 'Başa dön';
        goToStartButton.addEventListener('click', () => {
            if (this.currentPage > 0) {
                this.currentPage = 0;
                this.callback(this.currentPage, this.selectedLength, true);
            }
        });

        return goToStartButton;
    }

    endButton() {
        const goToEndButton = document.createElement('button');
        goToEndButton.innerText = 'Sona git';

        goToEndButton.addEventListener('click', () => {
            this.currentPage = parseInt(this.paginatedData.totalPages - 1);
            this.callback(this.currentPage, this.selectedLength, true);
        });
        return goToEndButton;
    }

    renderButtons() {
        const wrapper = document.createElement('div');
        wrapper.className = "txt-navigate-buttons";

        const navigationMap = {
            "prev": this.prevButton(),
            "next": this.nextButton(),
            "start": this.startButton(),
            "end": this.endButton(),
            "numbers": this.renderPageNumbers()
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
        const wrapper = document.createElement('div');
        wrapper.className = "tx-pagination";

        const renderButtons = this.renderButtons();
        const lengthFilter = this.lengthFilter();

        if (lengthFilter) {
            wrapper.appendChild(lengthFilter);
        }
        wrapper.appendChild(renderButtons);

        this.container.appendChild(wrapper);

    }
}