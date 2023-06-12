import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/assets/UserService';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  size = 6;
  questions: any[] = [];
  questionText: string | undefined;
  code: string | undefined;
  weight: string | undefined;
  reactiveForm!: FormGroup;;


  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      
        ques: new FormControl(null, Validators.required),
        code: new FormControl(null, Validators.required),
        marks: new FormControl(null, Validators.required)
        
    });

    this.fetchQuestions('fetch');
  }

  fetchQuestions(id: any) {
    if (typeof id === 'number') {
      this.questions = this.questions.filter((values) => {
        return values.id !== id;
      });
    } else {
      const headers = this.userService.getRequestHeaders();

      this.http.get(
        `https://dev.platformcommons.org/gateway/assessment-service/api/v1/questions?page=1&size=${this.size}`,
        headers
      )
        .subscribe(
          (response) => {
            this.questions = response as any[];
          },
          (error) => {
            console.error(error);
          }
        );
    }

    this.questions.forEach((question) => {
      question.editMode = false;
    });
  }




  addQuestion() {

    // this.reactiveForm.reset();
    console.log(this.reactiveForm)  
    this.fetchQuestions('fetch');
  }

  editQuestion(question: any) {
    question.editMode = true;
  }




  saveQuestion(question: any) {
    const headers = this.userService.getRequestHeaders();
  
    const updatedFormData = {
      uuid: 'b4dea6d3-f82f-434d-8d38-7d70e8c1742c',
      id: question.id,
      defaultOptionsList: [],
      questionComprehensionList: [],
      domain: 'DOMAIN.HEALTH',
      ltldskillList: [],
      questionClass: {
        code: 'QUESTION_CLASS.QUESTION',
        labels: [
          {
            id: 3,
            text: 'Question class question',
            language: {
              code: 'ENG',
              label: 'English'
            }
          }
        ],
        refClass: {
          code: 'REF.QUESTION_CLASS'
        }
      },
      questionCode: 'FB_001',
      questionName: [],
      questionSubtype: {
        code: 'QUESTION_SUB_TYPE.SUBJECTIVE',
        labels: [
          {
            id: 5,
            text: 'Question sub type subjective',
            language: {
              code: 'ENG',
              label: 'English'
            }
          }
        ],
        refClass: {
          code: 'REF.QUESTION_SUB_TYPE'
        }
      },
      questionText: [
        {
          id: question.id,
          text: question.questionText[0].text,
          language: {
            code: 'ENG',
            label: 'English'
          }
        }
      ],
      questionSubText: [
        {
          id: 1860,
          text: '',
          language: {
            code: 'ENG',
            label: 'English'
          }
        }
      ],
      questionType: {
        code: 'QUESTION_TYPE.NUMBER',
        labels: [
          {
            id: 324,
            text: 'Number',
            language: {
              code: 'ENG',
              label: 'English'
            }
          }
        ],
        refClass: {
          code: 'REF.QUESTION_TYPE'
        }
      },
      tenant: 0,
      weight: question.weight,
    };
  
    this.http.patch('https://dev.platformcommons.org/gateway/assessment-service/api/v1/questions', updatedFormData, headers)
      .subscribe(
        (response) => {
          console.log('Question updated');
          question.editMode = false;
        },
        (error) => {
          console.error('Error updating question:', error);
        }
      );
  }
  

  submitQuestion() {
    const headers = this.userService.getRequestHeaders();

    const formData = {
      "id": 0,
      "tenant": 0,
      "domain": "DOMAIN.HEALTH",
      "questionCode": "FB_001",
      "questionClass": {
        "code": "QUESTION_CLASS.QUESTION"
      },
      "questionType": {
        "code": "QUESTION_TYPE.SUBJECTIVE_LONG"
      },
      "questionText": [
        {
          "text": this.reactiveForm.value.ques,
          "language": {
            "code": this.reactiveForm.value.code,
            "label": "English"
          }
        }
      ],
      "questionSubText": [
        {
          "text": "",
          "language": {
            "code": "ENG",
            "label": "English"
          }
        }
      ],
      "questionName": [],
      "weight": this.reactiveForm.value.marks,
      "tenantId": 0,
      "questionImageURL": "",
      "defaultOptionsList": [],
      "questionSubtype": {
        "code": "QUESTION_SUB_TYPE.SUBJECTIVE"

      },

    };

    this.http.post('https://dev.platformcommons.org/gateway/assessment-service/api/v1/questions', formData, headers
    ).subscribe(
      (response) => {
        console.log(response);
        this.fetchQuestions('post');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteQuestion(questionId: number) {
    const headers = this.userService.getRequestHeaders();

    this.http.delete(
      `https://dev.platformcommons.org/gateway/assessment-service/api/v1/questions/${questionId}`,
      headers
    ).subscribe(
      (response) => {
        console.log(`Question ${questionId} deleted`);
        this.fetchQuestions(questionId);
      },
      (error) => {
        console.error(error, 'DELETE ERROR');
      }
    );
  }
}
