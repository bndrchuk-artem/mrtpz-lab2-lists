export class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Внутрішній клас Node
  #Node = class {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  };

  // Отримання довжини списку
  length() {
    return this.size;
  }

  // Додавання елементу в кінець списку
  append(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }

    const newNode = new this.#Node(element);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head; // Замикаємо кільце
    } else {
      this.tail.next = newNode;
      newNode.next = this.head;
      this.tail = newNode;
    }

    this.size++;
  }

  // Вставка елементу на позицію
  insert(element, index) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }

    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    const newNode = new this.#Node(element);

    if (index === 0) {
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        newNode.next = this.head;
      } else {
        newNode.next = this.head;
        this.head = newNode;
        this.tail.next = this.head;
      }
    } else if (index === this.size) {
      this.append(element);
      return;
    } else {
      let current = this.head;
      let previous = null;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      previous.next = newNode;
    }

    this.size++;
  }

  // Видалення елементу за позицією
  delete(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let removedData;
    if (this.size === 1) {
      removedData = this.head.data;
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      removedData = this.head.data;
      this.head = this.head.next;
      this.tail.next = this.head;
    } else {
      let current = this.head;
      let previous = null;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }

      removedData = current.data;
      previous.next = current.next;

      if (index === this.size - 1) {
        this.tail = previous;
      }
    }

    this.size--;
    return removedData;
  }

  // Видалення всіх елементів за значенням
  deleteAll(element) {
    if (typeof element !== 'string' || element.length !== 1) {
        throw new Error('Element must be a single character');
    }

    if (this.head === null) return;

    let current = this.head;
    let nodesToDelete = [];
    let index = 0;

    // Сначала находим все узлы для удаления
    do {
        if (current.data === element) {
            nodesToDelete.push(index);
        }
        current = current.next;
        index++;
    } while (current !== this.head && index < this.size);

    // Удаляем узлы с конца, чтобы индексы не сбивались
    for (let i = nodesToDelete.length - 1; i >= 0; i--) {
        this.delete(nodesToDelete[i]);
    }
}

  // Отримання елементу за позицією
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.data;
  }

  // Копіювання списку
  clone() {
    const newList = new CircularLinkedList();
    if (this.head === null) return newList;

    let current = this.head;
    do {
      newList.append(current.data);
      current = current.next;
    } while (current !== this.head);

    return newList;
  }

  // Обернення списку
  reverse() {
    if (this.head === null || this.head.next === this.head) return;

    let prev = this.tail;
    let current = this.head;
    let next = null;
    this.tail = this.head;

    do {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    } while (current !== this.head);

    this.head = prev;
  }

  // Пошук першого входження
  findFirst(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }

    if (this.head === null) return -1;

    let current = this.head;
    let index = 0;

    do {
      if (current.data === element) return index;
      current = current.next;
      index++;
    } while (current !== this.head);

    return -1;
  }

  // Пошук останнього входження
  findLast(element) {
    if (typeof element !== 'string' || element.length !== 1) {
      throw new Error('Element must be a single character');
    }
  
    if (!this.head) return -1;
  
    let lastIndex = -1;
    let current = this.head;
    let index = 0;
  
    do {
      if (current.data === element) {
        lastIndex = index;
      }
      current = current.next;
      index++;
    } while (current !== this.head);
  
    return lastIndex;
  }

  // Очищення списку
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Розширення списку
  extend(elements) {
    if (!(elements instanceof CircularLinkedList)) {
      throw new Error('Elements must be a CircularLinkedList');
    }

    if (elements.head === null) return;

    let current = elements.head;
    do {
      this.append(current.data);
      current = current.next;
    } while (current !== elements.head);
  }

  print() {
    if (!this.head) return 'Empty';

    let result = [];
    let current = this.head;
    do {
        result.push(current.data);
        current = current.next;
    } while (current !== this.head);

    return result.join(' > ') + ' > ' + this.head.data;
  }
}

/*
const list = new CircularLinkedList();
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

const otherList = new CircularLinkedList();
otherList.append('Y');
otherList.append('Z');
list.extend(otherList);
console.log('Після об\'єднання:', list.print()); // C > C > C > X > Y > Z > C

list.clear();
console.log('Після очищення:', list.print()); // Empty */