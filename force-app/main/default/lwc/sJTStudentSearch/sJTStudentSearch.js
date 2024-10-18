import { LightningElement,track } from 'lwc';
import sJT_goBackArrowIcon from '@salesforce/resourceUrl/sJT_goBackArrowIcon'; 
import sJT_DropDownIcon from '@salesforce/resourceUrl/sJT_DropDownIcon'; 
import sJT_CalenderIcon from '@salesforce/resourceUrl/sJT_CalenderIcon'; 
import { NavigationMixin } from 'lightning/navigation';
import getAllStudentsData from '@salesforce/apex/SJTrackerController.getAllStudentsData';
import getUniqueProgramNames from '@salesforce/apex/SJTrackerController.getUniqueProgramNames';
export default class SJTStudentSearch extends NavigationMixin(LightningElement) {
    
    goBackArrowIcon = sJT_goBackArrowIcon;
    dropDownIcon = sJT_DropDownIcon;
    calenderIcon = sJT_CalenderIcon;
    @track showSpinner=true;
    @track searchInput = ''; 
    @track searchKey = ''; 
    @track selectedProgram = 'All Programs';
    @track programOptions = []; 
    @track visibleRecords = []; 
    @track allRecords = []; 
    @track selectedYear='';
    @track selectedSemister='';
    @track selectedUniversity='' ;
    @track yearOptions=[
    {label:'I', value:'I'},
        {label:'II', value:'II'},
        {label:'III', value:'III'},
        {label:'IV', value:'IV'},        
        {label:'All Years', value:''}
    ]
    semisterOptions=[
        {label:'Sem-I',value:'Sem-I'},
        {label:'Sem-II',value:'Sem-II'},
        {label:'Sem-III',value:'Sem-III'},
        {label:'Sem-IV',value:'Sem-IV'},
        {label:'Sem-V',value:'Sem-V'},
        {label:'Sem-VI',value:'Sem-VI'},
        {label:'Sem-VII',value:'Sem-VII'},
        {label:'Sem-VIII',value:'Sem-VIII'},
        {label:'All Sems', value:''}
    ]
    connectedCallback(){
        
        const queryParams = new URLSearchParams(window.location.search);
        this.selectedUniversity = queryParams.get('universityName');
        this.fetchInitialData();
        this.fetchPrograms();
       
    }
    fetchInitialData() {
        console.log('Fetching initial data...');
        this.showSpinner = true;
    
        getAllStudentsData({
            searchKey: '',                
            selectedUniversity: this.selectedUniversity,
            selectedProgram: '',           
            selectedYear: '',              
            selectedSemester: ''
        })
        .then((result) => {
            console.log('Received Data:', result);
            this.allRecords = result.map(student => {
                return {
                    ...student,
                    skillList: student.Skills.split(';') 
                };
            });
            this.visibleRecords = this.getDataWithRowNumbers(this.allRecords.slice(0, 50));
            this.showSpinner = false;
        })
        .catch((error) => {
            console.error('Error fetching student data', error);
            this.showSpinner = false;
        });
    }
    
    fetchPrograms(){
        this.showSpinner = true; 
    
        getUniqueProgramNames({                   
            selectedUniversity: this.selectedUniversity           
        })
        .then((result) => {
            console.log('Received Programs:', result); 
            let options = [{ label: 'All Programs', value: 'All Programs' }]; 
            result.forEach(program => {
                options.push({ label: program, value: program });
            });
    
            this.programOptions = options; 
            this.showSpinner = false;  
        })
        .catch((error) => {
            console.error('Error fetching programs', error);
            this.showSpinner = false; 
        });
    }
    
    
    handleSearchInputChange(event) {
        this.searchKey = event.target.value; 
        
    }

    handleSearch() {
        this.showSpinner = true;
    
        getAllStudentsData({
            searchKey: this.searchKey,
            selectedUniversity: this.selectedUniversity,
            selectedProgram: this.selectedProgram,
            selectedYear: this.selectedYear,
            selectedSemester: this.selectedSemister
        })
        .then((result) => {
            this.allRecords = result.map(student => {
                return {
                    ...student,
                    skillList: student.Skills.split(';') 
                };
            });
            this.visibleRecords = this.getDataWithRowNumbers(this.allRecords.slice(0, 50));
            this.showSpinner = false;
        })
        .catch((error) => {
            console.error('Error fetching student data', error);
            this.showSpinner = false;
        });
    }
    
    

    handleProgramChange(event) {
        this.selectedProgram = event.detail.value; 
        
    }
    handleYearChange(event) {
        this.selectedYear = event.detail.value; 
        
    }
    handleSemisterChange(event) {
        this.selectedSemister = event.detail.value; 
        
    }
    getDataWithRowNumbers(records) {
        return records.map((item, index) => ({
            ...item,
            rowNumber: index + 1, 
            StudentName: item.StudentName ? item.StudentName : 'Unknown Student' 
        }));
    }
    
    
    handleUpdate(event) {
        const paginatedRecords = event.detail.records;
        this.visibleRecords = this.getDataWithRowNumbers(paginatedRecords); 
    }
    
    
    

    handleStudentClick(event) {
        const studentId = event.target.dataset.studentId;  
        const studentName = event.target.dataset.name;
        console.log('studentId',studentId);
        this[NavigationMixin.GenerateUrl]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Test_Page__c' 
            },
            state: {
                studentId: studentId 
            }
        }).then(url => {
            window.open(url, '_blank'); 
        });
    }
    
    
}