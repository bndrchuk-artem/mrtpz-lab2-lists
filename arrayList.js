export class ArrayList {
  constructor() {
    this.elements = [];
  }

  // Отримання довжини списку
  length() {
    return this.elements.length;
  }

  // Додавання елементу в кінець списку
  append(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }
    this.elements.push(element);
  }

  // Вставка елементу на позицію
  insert(element, index) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }
    if (index < 0 || index > this.elements.length) {
      throw new Error('Index out of bounds');
    }
    this.elements.splice(index, 0, element);
  }

  // Видалення елементу за позицією
  delete(index) {
    if (index < 0 || index >= this.elements.length) {
      throw new Error('Index out of bounds');
    }
    return this.elements.splice(index, 1)[0];
  }

  // Видалення всіх елементів за значенням
  deleteAll(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }
    this.elements = this.elements.filter(item => item !== element);
  }

  // Отримання елементу за позицією
  get(index) {
    if (index < 0 || index >= this.elements.length) {
      throw new Error('Index out of bounds');
    }
    return this.elements[index];
  }

  // Копіювання списку
  clone() {
    const newList = new ArrayList();
    newList.elements = [...this.elements];
    return newList;
  }

  // Обернення списку
  reverse() {
    this.elements.reverse();
  }

  // Пошук першого входження
  findFirst(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }
    return this.elements.indexOf(element);
  }

  // Пошук останнього входження
  findLast(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }
    return this.elements.lastIndexOf(element);
  }

  // Очищення списку
  clear() {
    this.elements = [];
  }

  // Розширення списку
  extend(elements) {
    if (!(elements instanceof ArrayList)) {
      throw new Error('Elements must be an ArrayList');
    }
    this.elements.push(...elements.elements);
  }

  // Додатковий метод для візуалізації
  print() {
    if (this.length() === 0) return 'Empty';
    return this.elements.join(' > ') + ' > ' + this.elements[0];
  }
}

/*
const list = new ArrayList();
console.log(list.print());

list.append('A');
console.log(list.print())

list.append('B');
list.append('C');
console.log('Після додавання A,B,C:', list.print()); // A > B > C > A

list.insert('X', 1);
console.log('Після вставки X:', list.print()); // A > X > B > C > A

const deleted = list.delete(2);
console.log('Видалено:', deleted); // B
console.log('Після видалення:', list.print()); // A > X > C > A

list.append('C');
list.append('C');
console.log('Після додавання ще 2 C:', list.print());
console.log('Перший X на позиції:', list.findFirst('X')); // 1
console.log('Останній C на позиції:', list.findLast('C')); // 4

list.deleteAll('A');
console.log('Після видалення всіх A:', list.print()); // X > C > C > C > X

console.log('Елемент на позиції 1:', list.get(1)); // C

const copy = list.clone();
console.log('Копія списку:', copy.print()); // X > C > C > C > X

list.reverse();
console.log('Реверснутий список:', list.print()); // C > C > C > X > C

console.log('Довжина списку:', list.length()); // 4

const otherList = new ArrayList();
otherList.append('Y');
otherList.append('Z');
list.extend(otherList);
console.log('Після об\'єднання:', list.print()); // C > C > C > X > Y > Z > C

list.clear();
console.log('Після очищення:', list.print()); // Empty */