import { LightningElement, track } from 'lwc';
import sJT_goBackArrowIcon from '@salesforce/resourceUrl/sJT_goBackArrowIcon'; 
import sJT_DropDownIcon from '@salesforce/resourceUrl/sJT_DropDownIcon'; 
import sJT_CalenderIcon from '@salesforce/resourceUrl/sJT_CalenderIcon'; 
import { NavigationMixin } from 'lightning/navigation';

export default class Push_tpo_programwise extends NavigationMixin(LightningElement) {  
    goBackArrowIcon = sJT_goBackArrowIcon;
    dropDownIcon = sJT_DropDownIcon;
    calenderIcon = sJT_CalenderIcon;

    @track showSpinner = true;
    @track searchKey = ''; 
    @track visibleRecords = []; 
    @track allRecords = []; 
    @track selectedYear1 = '';
    @track selectedYear = '';
    @track selectedSemister = '';
    @track selectedUniversity = '';
    @track isDropdownOpen = false;
    @track selectedProgramLabel = 'All Programs';

    @track year1Options = [
        { label: '2019-2020', value: '2019-2020' },
        { label: '2020-2021', value: '2020-2021' },
        { label: '2021-2022', value: '2021-2022' },
        { label: '2022-2023', value: '2022-2023' },        
        { label: '2023-2024', value: '2023-2024' },
        { label: 'All year', value: '' }
    ];

    @track programOptions = [
        { label: 'Java Full Stack with React', value: 'Java Full Stack with React' },
        { label: 'Testing with Selenium using Java', value: 'Testing with Selenium using Java' },
        { label: 'MERN', value: 'MERN' },
        { label: 'Testing with Selenium using Python', value: 'Testing with Selenium using Python' },
        { label: 'Python Full Stack with React', value: 'Python Full Stack with React' },
        { label: 'Python with AWS with Vue', value: 'Python with AWS with Vue' },
        { label: 'Java Full Stack with Vue', value: 'Java Full Stack with Vue' },
        { label: 'MLOPS', value: 'MLOPS' },
        { label: 'Data Science', value: 'Data Science' },
        { label: 'Data Engineering', value: 'Data Engineering' },
        { label: 'Cyber Security', value: 'Cyber Security' },
        { label: 'DevOps', value: 'DevOps' },
        { label: 'Web Development with React', value: 'Web Development with React' },
        { label: 'Web Development with Vue', value: 'Web Development with Vue' },
        { label: 'Web Development with Node', value: 'Web Development with Node' },
        { label: 'Cloud Engineering', value: 'Cloud Engineering' },
        { label: 'All Programs', value: 'All Programs' }
    ];
    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    handleProgramSelect(event) {
        this.selectedProgramLabel = event.target.dataset.value;
        this.isDropdownOpen = false;
    }

    @track yearOptions = [
        { label: '1st Year', value: '1st Year' },
        { label: '2nd Year', value: '2nd Year' },
        { label: '3rd Year', value: '3rd Year' },
        { label: '4th Year', value: '4th Year' },
        { label: 'All Years', value: '' }
    ];

    @track semisterOptions = [
        { label: '1st Sem', value: '1st Sem' },
        { label: '2nd Sem', value: '2nd Sem' },
        { label: '3rd Sem', value: '3rd Sem' },
        { label: '4th Sem', value: '4th Sem' },
        { label: '5th Sem', value: '5th Sem' },
        { label: '6th Sem', value: '6th Sem' },
        { label: '7th Sem', value: '7th Sem' },
        { label: '8th Sem', value: '8th Sem' },
        { label: 'All Sems', value: '' }
    ];
    @track visibleRecords = [
        {
            id: 1, rowNumber: 1,Name: 'Java Full Stack with React', sem1: 25,sem2: 30, sem3: 28, sem4: 32, sem5: 27,sem6: 24,sem7: 20,sem8: 18},
        {   id: 2,rowNumber: 2, Name: 'Python Full Stack with Vue', sem1: 22,sem2: 25, sem3: 24, sem4: 30,sem5: 28, sem6: 26,sem7: 20,sem8: 16},
        {   id: 3,rowNumber: 3, Name: 'Python Full Stack with Vue', sem1: 22,sem2: 25, sem3: 24,sem4: 30, sem5: 28, sem6: 26,sem7: 20,sem8: 16},
        {   id: 4,rowNumber: 4, Name: 'Python Full Stack with Vue', sem1: 22,sem2: 25, sem3: 24,sem4: 30, sem5: 28, sem6: 26,sem7: 20,sem8: 16},
        {   id: 5,rowNumber: 5, Name: 'Python Full Stack with Vue',sem1: 22,sem2: 25,sem3: 24, sem4: 30, sem5: 28, sem6: 26, sem7: 20,sem8: 16 },
        {   id: 6,rowNumber: 6, Name: 'Python Full Stack with Vue',sem1: 22,sem2: 25,sem3: 24,sem4: 30,sem5: 28,sem6: 26,sem7: 20,sem8: 16 },
        {   id: 7,
            rowNumber: 7, Name: 'Python Full Stack with Vue',sem1: 22, sem2: 25,sem3: 24, sem4: 30,sem5: 28,sem6: 26,sem7: 20,sem8: 16},
        {
            id: 8,
            rowNumber: 8,
            Name: 'Python Full Stack with Vue',
            sem1: 22,
            sem2: 25,
            sem3: 24,
            sem4: 30,
            sem5: 28,
            sem6: 26,
            sem7: 20,
            sem8: 16
        },
      
    ];

}