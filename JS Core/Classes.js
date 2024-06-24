// Создайте класс «Сотрудник» со свойствами имени и зарплаты. Включите метод расчета годовой зарплаты. Создайте подкласс под
// названием «Менеджер», который наследуется от класса «Сотрудник» и добавляет дополнительное свойство для
// отдела. Переопределить метод расчета годовой зарплаты, чтобы включить бонусы
// для менеджеров. Создайте два экземпляра класса «Менеджер» и рассчитайте их годовую  зарплату.

class Employee {
    constructor(name, salary){
        this.name = name;
        this.salary = salary;
    }

    getAnnualSalary() {
        return this.salary * 12;
    }
}

class Manager extends Employee {
    constructor(name, salary, department){
        super(name, salary);
        this.department = department;
    }

    getAnnualSalary() {
        return super.getAnnualSalary() + 200;
    }
}

const manager1 = new Manager('Polina', 333, 'Marketing');
const manager2 = new Manager('Vova', 444, 'Marketing');

console.log(`Годовая зарплата ${manager1.name}: ${manager1.getAnnualSalary()}$`);
console.log(`Годовая зарплата ${manager2.name}: ${manager2.getAnnualSalary()}$`);