import { LightningElement, api, track } from 'lwc';

export default class Pagination extends LightningElement {
    @track currentPage = 1;
    @track totalRecords;
    @api recordSize = 5;
    @track totalPage = 0;
    @track visibleRecords = [];
    @track pageList = [];

    get records() {
        return this.visibleRecords;
    }

    @api
    set records(data) {
        if (data) {
            this.totalRecords = data;
            console.log('Pagination total records', this.totalRecords);
            this.recordSize = Number(this.recordSize);
            this.totalPage = Math.ceil(data.length / this.recordSize);
            this.generatePageList();
            this.updateRecords();
        }
    }

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPage;
    }

    generatePageList() {
        this.pageList = [];
        for (let i = 1; i <= this.totalPage; i++) {
            this.pageList.push(i);
        }
    }

    handlePreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.updateRecords();
        }
    }

    handleNextPage() {
        if (this.currentPage < this.totalPage) {
            this.currentPage = this.currentPage + 1;
            this.updateRecords();
        }
    }

    handlePageClick(event) {
        const selectedPage = parseInt(event.target.dataset.page, 10);
        if (selectedPage && selectedPage !== this.currentPage) {
            this.currentPage = selectedPage;
            this.updateRecords();
        }
    }

    updateRecords() {
        const start = (this.currentPage - 1) * this.recordSize;
        const end = this.recordSize * this.currentPage;
        this.visibleRecords = this.totalRecords.slice(start, end);

        this.dispatchEvent(new CustomEvent('update', {
            detail: {
                records: this.visibleRecords
            }
        }));
    }
}
