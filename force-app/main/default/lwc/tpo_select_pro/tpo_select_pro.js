import { LightningElement, track } from 'lwc';
import sJT_goBackArrowIcon from '@salesforce/resourceUrl/sJT_goBackArrowIcon';
import sJT_DropDownIcon from '@salesforce/resourceUrl/sJT_DropDownIcon';
import sJT_CalenderIcon from '@salesforce/resourceUrl/sJT_CalenderIcon';
import { NavigationMixin } from 'lightning/navigation';

export default class SJTStudentSearch extends NavigationMixin(LightningElement) {
    // Resource URL Icons
    goBackArrowIcon = sJT_goBackArrowIcon;
    dropDownIcon = sJT_DropDownIcon;
    calenderIcon = sJT_CalenderIcon;

    // Search and Filter Properties
    searchKey = '';
    selectedProgram = 'All Programs';
    selectedcourse = 'All Courses';
    visibleRecords = [];

    // Static Data for Filtering and Pagination
    @track allRecords = [
        { id: 1, rowNumber: 1, Name: 'Java Full Stack with React', noofcourses :25 , totalstudents: 30 },
        { id: 2, rowNumber: 2, Name: 'Python Full Stack with Vue',  noofcourses:22,totalstudents: 25,  },
        { id: 3, rowNumber: 3, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25, },
        { id: 4, rowNumber: 4, Name: 'Python Full Stack with Vue',noofcourses: 22,totalstudents: 25,  },
        { id: 5, rowNumber: 5, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25,  },
        { id: 6, rowNumber: 6, Name: 'Python Full Stack with Vue', noofcourses: 22,totalstudents: 25, },
        { id: 7, rowNumber: 7, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25,},
        { id: 8, rowNumber: 8, Name: 'Python Full Stack with Vue',noofcourses: 22, totalstudents: 25,}
      ,  { id: 9, rowNumber: 1, Name: 'Java Full Stack with React', noofcourses: 25, totalstudents: 30,  },
        { id: 10, rowNumber: 2, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25, },
        { id: 11, rowNumber: 3, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25,  },
        { id: 12, rowNumber: 4, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25, },
        { id: 13, rowNumber: 5, Name: 'Python Full Stack with Vue', noofcourses: 22, totalstudents: 25, },
        { id: 14, rowNumber: 6, Name: 'Python Full Stack with Vue', noofcourses: 22,totalstudents: 25,  },
        { id: 15, rowNumber: 7, Name: 'Python Full Stack with Vue', noofcourses: 22,totalstudents: 25,  },
    ];

    // Program, Year, and Semester Options
    programOptions = [
        { label: 'All Programs', value: 'All Programs' },
        { label: 'Java Full Stack with React', value: 'Java Full Stack with React' },
        { label: 'Testing with Selenium using Java', value: 'Testing with Selenium using Java' },
        { label: 'MERN', value: 'MERN' },
        { label: 'Data Science', value: 'Data Science' },
        { label: 'DevOps', value: 'DevOps' }
    ];
   courseOptions = [
        { label: 'All Courses', value: 'All Programs' },
        { label: 'Java Full Stack with React', value: 'Java Full Stack with React' },
        { label: 'Testing with Selenium using Java', value: 'Testing with Selenium using Java' },
        { label: 'MERN', value: 'MERN' },
        { label: 'Data Science', value: 'Data Science' },
        { label: 'DevOps', value: 'DevOps' }
    ];


    // Lifecycle Hook
    connectedCallback() {
        setTimeout(() => {
            this.showSpinner = false;  // Hide the spinner after data load
        }, 1000);
    }

    // Event Handlers
    handleSearch(event) {
        this.searchKey = event.target.value;
       
    }

    handleProgramChange(event) {
        this.selectedProgram = event.detail.value;
      
    }
    handlecourseChange(event) {
        this.selectedProgram = event.detail.value;
      
    }
    handleUpdate(event) {
        this.visibleRecords = event.detail.records;
    }



}