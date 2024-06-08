import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-graphs',
  templateUrl: './student-graphs.component.html',
  styleUrls: ['./student-graphs.component.css'],
})
export class StudentGraphsComponent implements OnInit {
  students: Student[] = [];

  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'GPA',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };
  barChartType: ChartType = 'bar';

  constructor(
    private studentService: StudentService,
    //private cdr: ChangeDetectorRef // Need to enable if charts don't display
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
      this.processMajorData();
      this.processGpaData();
      //setTimeout(() => this.cdr.detectChanges(), 50000); // Need to enable if charts don't display
    });
  }

  // Pie chart data
  processMajorData(): void {
    const majorCountMap: { [key: string]: number } = {};
    const backgroundColor = [
      '#FF6384',
      '#4A90E2',
      '#FFCE56',
      '#FF9F40',
      '#4BC0C0',
      '#9966FF',
      '#BD10E0',
      '#B8E986',
    ];
    this.students.forEach((student) => {
      if (majorCountMap[student.major]) {
        majorCountMap[student.major]++;
      } else {
        majorCountMap[student.major] = 1;
      }
    });

    this.pieChartData.labels = Object.keys(majorCountMap);
    this.pieChartData.datasets[0].data = Object.values(majorCountMap);
    this.pieChartData.datasets[0].backgroundColor = backgroundColor.slice(
      0,
      Object.keys(majorCountMap).length
    );
  }

  // Bar chart data
  processGpaData(): void {
    const gpaCountMap: { [key: number]: number } = {};

    this.students.forEach((student) => {
      if (student.gpa !== undefined) {
        if (gpaCountMap[student.gpa]) {
          gpaCountMap[student.gpa]++;
        } else {
          gpaCountMap[student.gpa] = 1;
        }
      }
    });

    const sortedGPAEntries = Object.entries(gpaCountMap)
      .map(([gpa, count]) => ({ gpa: parseFloat(gpa), count }))
      .sort((a, b) => a.gpa - b.gpa);

    const labels = sortedGPAEntries.map((entry) => entry.gpa.toFixed(2));
    const data = sortedGPAEntries.map((entry) => entry.count);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Frequency',
          data: data,
          backgroundColor: 'rgba(19, 192, 225, 1)',
          borderColor: 'rgba(255, 225, 225, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
