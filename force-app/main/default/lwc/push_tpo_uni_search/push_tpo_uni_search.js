import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getTopHeadersData from '@salesforce/apex/SJTC.getTopHeadersData';
import getUniversityWiseData from '@salesforce/apex/SJTC.getUniversityWiseData';
export default class Push_tpo_uni_search extends NavigationMixin(LightningElement){
    @track totalUniversities = 0;
    @track totalStudents = 0;
    @track totalMentors = 0;
    @track totalPrograms = 0;
    @track totalCourses = 0;

    searchQuery = '';
    visibleRecords = [];
    allRecords = [];

    connectedCallback() {
        this.fetchData();
    }

    fetchData() {
        getTopHeadersData()
            .then((result) => {
                console.log('getTopHeadersData', result);
                this.totalUniversities = result.UniqueUniversities;
                this.totalStudents = result.UniqueContacts;
                this.totalMentors = result.UniqueMentors;
                this.totalPrograms = result.UniquePrograms;
                this.totalCourses = result.UniqueCourses;
            })
            .catch((error) => {
                console.error('Error fetching top header data', error);
            });

        getUniversityWiseData()
            .then((result) => {
                console.log('getUniversityWiseData', result);
                this.allRecords = result;
                this.visibleRecords = this.getDataWithRowNumbers(this.filteredRecords.slice(0, 5)); 
            })
            .catch((error) => {
                console.error('Error fetching university-wise data', error);
            });
    }


    get filteredRecords() {
        return this.allRecords.filter((item) =>
            item.University.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }


    getDataWithRowNumbers(records) {
        return records.map((item, index) => ({
            ...item,
            rowNumber: index + 1 
        }));
    }

    handleSearch() {
        this.searchQuery = this.template.querySelector('.search-input').value;
        this.visibleRecords = this.getDataWithRowNumbers(this.filteredRecords.slice(0, 5)); 
    }

    handleUpdate(event) {
        this.visibleRecords = this.getDataWithRowNumbers(event.detail.records); 
    }

    handleUniversityClick(event) {
        const universityName = event.target.dataset.name;
    
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'sJTStudentSearch__c', 
            },
            state: {
                universityName: universityName 
            },
        }).then(url => {
            window.open(url, '_blank');
        });
    }
    
}
    