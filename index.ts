import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";

class student {
  static counter = 1000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 1000;
  }
  enroll_course(course: string) {
    this.courses.push(course);
  }

  view_balance() {
    console.log(`balance for ${this.name} is $${this.balance}!`);
  }
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`$ ${amount} fees successfully paid for ${this.name}!`);
  }

  view_status() {
    console.log(`name :${this.name}`);
    console.log(`id :${this.id}`);
    console.log(`courses :${this.courses}`);
    console.log(`balance :${this.balance}`);
  }
}

class studentManager {
  students: student[];
  constructor() {
    this.students = [];
  }

  add_student(name: string) {
    let Student = new student(name);
    this.students.push(Student);
    console.log(`${name} added successfully id :${Student.id}!`);
  }

  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_course(course);
      console.log(`${student.name} enrolled in ${course} sucessfully!`);
    }
  }

  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log("student not found...");
    }
  }

  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log("student not found...");
    }
  }

  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_status();
    } else {
      console.log("student not found...");
    }
  }

  find_student(student_id: number) {
    return this.students.find((std) => std.id === student_id);
  }
}

async function main() {
  console.log("welcome to Amna Student_management_system");
  console.log("_".repeat(50));

  let student_manager = new studentManager();

  while (true) {
    const { Choices } = await inquirer.prompt([
      {
        name: "Choices",
        type: "list",
        message: "what do you want to do?",
        choices: [
          "add student",
          "enroll student",
          "view student balance",
          "pay student fees",
          "view student status",
          "exit",
        ],
      },
    ]);

    switch (Choices) {
      case "add student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter student name:",
          },
        ]);
        student_manager.add_student(name_input.name);
        break;

      case "enroll student":
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter student id:",
          },
          {
            name: "course",
            type: "input",
            message: "Enter course name:",
          },
        ]);
        student_manager.enroll_student(
          course_input.student_id,
          course_input.course
        );
        break;

      case "view student balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter student id:",
          },
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

      case "pay student fees":
        let fees_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter student id:",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter amount:",
          },
        ]);
        student_manager.pay_student_fees(
          fees_input.student_id,
          fees_input.amount
        );
        break;
      case "view student status":
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter student id:",
          },
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;
      case "exit":
        console.log("Thank you for using our system......");
        process.exit();
        break;
    }
  }
}
main();
