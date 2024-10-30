import { LightningElement } from 'lwc';

export default class DashboardProgress extends LightningElement {
    renderedCallback() {
        if (!this.chartInitialized) {
            this.initializeCharts();
            this.chartInitialized = true;
        }
    }

    initializeCharts() {
        this.initializeDoughnutChart('schedule-progress', ['As per schedule', 'Ahead of schedule', 'Lagging behind'], [40, 50, 60], ['#f86d7d', '#6295f8', '#615cff']);
        this.initializeDoughnutChart('completion-progress', ['Completed', 'Not Completed'], [100, 50], ['#28a745', '#dcdcdc']);
        this.initializeBarChart('project-progress', ['Not Started', 'In progress', 'Completed'], [70, 70, 15], ['#ff6384', '#36a2eb', '#4caf50']);
        this.initializeBarChart('module-progress', ['Module 1', 'Module 2', 'Module 3', 'Module 4'], [80, 70, 60, 50], ['#27ae60', '#0d6efd', '#e74c3c', '#95a5a6']);
    }

    initializeDoughnutChart(canvasId, labels, data, backgroundColors) {
        const ctx = this.template.querySelector(`[data-id="${canvasId}"]`).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }

    initializeBarChart(canvasId, labels, data, backgroundColors) {
        const ctx = this.template.querySelector(`[data-id="${canvasId}"]`).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }
}
