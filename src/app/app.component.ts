import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title: FormControl;
  // amount: FormControl;
  expenses: FormGroup;
  // expense: FormGroup;
  expensesArray: FormArray;
  allExpenses = [
    {'title': 'first Expense', 'description': 'this is the desc', 'amount': 1000},
    {'title': 'second Expense', 'description': 'this is the desc', 'amount': 2000},
    {'title': 'third Expense', 'description': 'this is the desc', 'amount': 3000}
  ];

  constructor() {
    this.setupForm();
  }

  private setupForm() {
    this.expensesArray = new FormArray([]);
    this.setupExpensesArray();
    this.expenses = new FormGroup({
      'expensesArray': this.expensesArray
    });
  }


  private setupExpensesArray() {
    if (this.allExpenses.length === 0) {
      this.addAnExpense();
    } else {
      for (const prevExpense of this.allExpenses) {
        this.addAnExpense(prevExpense);
      }
      // this.addAnExpense();
    }
  }

  addAnExpense(prevExpense?: any) {
    const titleValue = prevExpense ? prevExpense['title'] : null;
    const descriptionValue = prevExpense ? prevExpense['description'] : null;
    const amountValue = prevExpense ? prevExpense['amount'] : null;

    const title = new FormControl(titleValue, [Validators.required]);
    const description = new FormControl(descriptionValue, [Validators.required]);
    const amount = new FormControl(amountValue, [Validators.required]);

    const expense = new FormGroup({
      'title': title,
      'description': description,
      'amount': amount
    });
    (<FormArray>this.expensesArray).push(expense);
  }

  deleteAnExpense(index: number) {
    (<FormArray>this.expensesArray).removeAt(index);
  }

  onSubmit() {
    this.allExpenses = [];
    console.log('Form', this.expenses);

    for (const expense of (<FormArray>this.expenses.get('expensesArray')).controls) {
      const expObj = {
        'title': expense.value.title,
        'description': expense.value.description,
        'amount': expense.value.amount
      };
      this.allExpenses.push(expObj);
    }
    console.log(this.allExpenses);
  }
}
