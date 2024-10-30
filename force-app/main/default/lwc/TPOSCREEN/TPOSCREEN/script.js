document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('schedule-progress').getContext('2d');

    const scheduleProgress = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['As per schedule', 'Ahead of schedule', 'Lagging behind'],
            datasets: [{
                label: 'Course Progress',
                data: [40, 50, 60],  // Sample data
                backgroundColor: ['#f86d7d', '#6295f8', '#615cff'],  // Custom colors
                borderColor: '#ffffff',  // White gaps between segments
                borderWidth: 5,  // Adjust the gap size
                borderRadius: 6  // This makes the edges rounded
            }]
        },
        options: {
            cutout: '70%',  // Creates space inside the doughnut chart
            plugins: {
                legend: {
                    display: false  // Hides the legend
                },
                tooltip: {
                    enabled: true  // Tooltips are enabled
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    const ctx = document.getElementById('completion-progress').getContext('2d');

const completionprogress = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'Not Completed'],
        datasets: [{
            data: [100, 50], // Change these values as needed
            backgroundColor: ['#28a745', '#dcdcdc'],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Allow the canvas to resize properly
        cutout: '90%',
        rotation: -90, // Starts the chart at the top
        circumference: 180, // Half circle
        plugins: {
            legend: {
                display: false // Remove legend from the chart
            },
            tooltip: {
                enabled: false // Disable tooltips
            }
        }
    }
});

    // Project Progress Graph
const ctx3 = document.getElementById('project-progress').getContext('2d');
const projectProgress = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Not started', 'In progress', 'Completed'], // Labels will be hidden
        datasets: [{
            data: [70, 70, 15],
            backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
            borderRadius: 10,
            barThickness: 50,  // Adjust bar thickness
            borderWidth: 0  // Remove border from bars
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                min: 10,
                max: 70,
                ticks: {
                    stepSize: 10
                },
                grid: {
                    display: false  // Remove horizontal grid lines
                }
            },
            x: {
                grid: {
                    display: false  // Remove vertical grid lines
                },
                ticks: {
                    display: false  // Remove x-axis labels
                }
            }
        },
        plugins: {
            legend: {
                display: false  // Hide legend
            },
            tooltip: {
                enabled: true  // Enable tooltips
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        barPercentage: 0.8,  // Adjust bar width
        categoryPercentage: 0.2,  // Decrease spacing between bars
    }
});

    const ctx5 = document.getElementById('module-progress').getContext('2d');

const moduleProgressChart = new Chart(ctx5, {
    type: 'bar',
    data: {
        labels: ['Module 1', 'Module 2', 'Module 3','Module 4','Module 5','Module 6','Module 7','Module 8','Module 9','Module 10','Module 11'],  // Display only the first 3 modules
        datasets: [
            {
                label: 'Completed',
                data: [100, 70, 60],
                backgroundColor: '#27ae60'  // Green
            },
            {
                label: 'Reading',
                data: [50, 60, 40],
                backgroundColor: '#0d6efd'  // Blue
            },
            {
                label: 'Skipped',
                data: [30, 20, 10],
                backgroundColor: '#e74c3c'  // Red
            },
            {
                label: 'No data',
                data: [20, 30, 40],
                backgroundColor: '#95a5a6'  // Gray
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false  // Hide legend from below the chart
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' students';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,      // Start y-axis from 0
                max: 150,    // Set y-axis maximum value to 150
                ticks: {
                    stepSize: 10  // Set the gap between ticks to 10 units
                },
                title: {
                    display: true,
                    text: 'Students'
                },
                grid: {
                    display: false  // Remove grid lines on the y-axis
                }
            },
            x: {
                title: {
                    display: false,
                    text: 'Modules'
                },
                grid: {
                    display: false,
                    drawBorder: true, // Remove grid lines on the x-axis
                    borderColor: 'black', // Set border color
                    borderWidth: 2 // Set border width (thickness)
                }
            }
        }
    }
});

// Create a custom legend container
const legendContainer = document.getElementById('custom-legend');
legendContainer.style.backgroundColor = '#fffacd';  // Light yellow background
legendContainer.style.padding = '8px';
legendContainer.style.borderRadius = '10px';
legendContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';  // Add a subtle shadow
legendContainer.style.display = 'flex'; // Use flex to align items vertically
legendContainer.style.flexDirection = 'column'; // Set direction to column

const legendItems = [
    { color: '#27ae60', text: 'Completed' },  // Green
    { color: '#0d6efd', text: 'Reading' },    // Blue
    { color: '#e74c3c', text: 'Skipped' },    // Red
    { color: '#95a5a6', text: 'No data' }     // Gray
];

// Generate legend items
legendItems.forEach(item => {
    const legendItem = document.createElement('div');
    legendItem.style.display = 'flex'; // Flex for item alignment
    legendItem.style.alignItems = 'center';
    legendItem.style.marginBottom = '3px';
    legendItem.style.fontSize='10px';

    
    const colorBox = document.createElement('span');
    colorBox.style.width = '12px';
    colorBox.style.height = '12px';
    colorBox.style.borderRadius = '50%';
    colorBox.style.backgroundColor = item.color;
    colorBox.style.display = 'inline-block';
    colorBox.style.marginRight = '9px';
    
    const text = document.createElement('span');
    text.innerText = item.text;
    
    legendItem.appendChild(colorBox);
    legendItem.appendChild(text);
    legendContainer.appendChild(legendItem);
});

   

});