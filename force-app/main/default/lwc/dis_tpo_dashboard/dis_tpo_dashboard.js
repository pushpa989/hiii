

import { LightningElement, track } from 'lwc';

export default class dis_tpo_dashboard extends LightningElement {
    @track number = 150;
    @track description = 'Java Full Stack with React';
    @track progressBar1 = 70; // out of this.number
    @track progressBar2 = 50; // out of this.number
    @track progressBar3 = 30; // out of this.number

    renderedCallback() {
        const radius = 21.5;  // Radius of the progress circle
        const circumference = 2 * Math.PI * radius;

        // Ensure the progress circles start where the last one ended
        this.setCircularProgress('.progress-bar1', this.progressBar1, circumference, 0);
        this.setCircularProgress('.progress-bar2', this.progressBar2, circumference, this.progressBar1);
        this.setCircularProgress('.progress-bar3', this.progressBar3, circumference, this.progressBar1 + this.progressBar2);
    }

    setCircularProgress(selector, value, circumference, offset) {
        const progress = circumference * (value / this.number); // Adjusted for dynamic number of students
        const dashArray = `${progress} ${circumference - progress}`;
        const dashOffset = circumference * (offset / this.number); // Adjusted for dynamic number of students

        const element = this.template.querySelector(selector);
        if (element) {
            element.style.strokeDasharray = dashArray;
            element.style.strokeDashoffset = -dashOffset; // Ensure the bar starts from the correct offset
        }
    }

    // Getter methods to check if each progress bar has a value greater than 0
    get hasProgressBar1() {
        return this.progressBar1 > 0;
    }

    get hasProgressBar2() {
        return this.progressBar2 > 0;
    }

    get hasProgressBar3() {
        return this.progressBar3 > 0;
    }
}