import { LightningElement, track } from 'lwc';
import sJT_goBackArrowIcon from '@salesforce/resourceUrl/sJT_goBackArrowIcon';
import { NavigationMixin } from 'lightning/navigation';

export default class Tpo_pro_filter extends NavigationMixin(LightningElement) {
    goBackArrowIcon = sJT_goBackArrowIcon;

    // Variables
    selectedProgram = 'All Programs';
    selectedcourse = 'All Courses';
    allprograms = [{ id: 1, Name: 'Java Full Stack with React', noofcourses: 25, totalstudents: 30 }];
    
    // Dropdown Options
    academicYearOptions= [{ label: '2022', value: '2022' }, { label: '2023', value: '2023' }];
    batchYearOptions = [{ label: '2022-2023', value: '2022-2023' }, { label: '2023-2024', value: '2023-2024' }];
    semesterOptions = [{ label: 'Semester 1', value: '1' }, { label: 'Semester 2', value: '2' }];

    handleGoBack() {
        this[NavigationMixin.GenerateUrl]({
            type: 'comm__namedPage',
            attributes: { name: 'akhiltestpage__c' }
        }).then(url => {
            window.open(url, '_blank');
        });
    }

    handleBatchYearChange(event) {
        this.batchYear = event.detail.value;
    }

    handleAcademicYearChange(event) {
        this.academicYear = event.detail.value;
    }

    handleSemesterChange(event) {
        this.semester = event.detail.value;
    }

    handleViewDashboard() {
        console.log('View Dashboard clicked');
        // Add your logic here to navigate to the dashboard or filter data
    }
}
