// Necessary Imports (you will need to use this)
const { Student } = require('./Student');
const fs = require('fs/promises'); // Imported file system library

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  // TODO
  constructor() {
     this.head = null; // First node in the list
     this.tail = null; // Last node in the list
     this.length = 0; // Number of nodes
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  // TODO
  addStudent(newStudent) {
    const newNode = new Node(newStudent);
    if (this.length === 0) { // If list is empty, set both head and tail to newNode
      this.head = newNode; 
      this.tail = newNode;
    } else {  // If list is not empty
      this.tail.next = newNode; // Attach new node to the end
      this.tail = newNode; // Update tail to be the new node
    }
    this.length++; // Increase the list size by 1 to account for the new node added
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    if (!this.head) { // If there is no head = list is empty, do nothing
      return;
    } 

    while (this.head.data.getEmail() === email){ // Traverse list to see if student to be removed is at the head
      this.head = this.head.next; // If so, remove student and check next
      this.length--; // Decrease length of list each time a node is removed
      return;
    }
    
    let current = this.head;
    while (current.next !== null) { // While list is not empty, traverse list to find the student
      if (current.next.data.getEmail() === email){
        current.next = current.next.next; //Remove node and place pointer on next node
        if (current.next === null){ // If removing last node, update tail
          this.tail = current;
        }
        this.length-- ; // Decrease length for each while loop
        return;
      }
      current = current.next
    }// TODO
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    let current = this.head;
    while (current) { // While list is not empty/ list has a head
      if(current.data.getEmail() === email){ // If student email matches given email
        return current.data; // Return the found student object
      }
      current = current.next; // Head moves to next node
    }
    // TODO
    return -1 // If student emails do not match, student is not found. Return -1 as per instructions
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() { // Internal function only to prevent unintended loss of data
    this.head = null; // Set head to null
    this.tail = null; // Set tail to null 
    this.length = 0; // Set length to ero, effectively clearing entire list
    // TODO
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    let current = this.head; 
    let result = ""; // Create a variable as an empty string
    while (current){ // While a head exists
      result += current.data.getName(); // Add name of student to the empty string
      if (current.next) { // If a node exists after head
        result += ", " //Add a comma and a space to the string
      }
      current = current.next // Continue traversing the list by moving pointer to next node
    }
    return result;
  } // TODO

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    let students = []; // Create a varibale as an empty array
    let current = this.head;
    while (current){ // While head exists
      students.push(current.data); // Add students to the empty array
      current = current.next; // Move pointer to the next node to continue traversing the list
    }
    return students.sort((a, b) => (a.getName() > b.getName()? 1 : a.getName() < b.getName() ? -1 : 0)); //Return array of student objects sorted by name. Sort is a built in callback function, using a ternary operator here. 1 means a is greater than b so it goes after b, -1 means a is less than b so it comes before b.
  }
    // TODO
    
  

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students (student objects) matching the specialization, sorted alphabetically by student name
   
   */
  filterBySpecialization(specialization) {
    let students = []; // Create an empty array of student objects
    let current = this.head;
    while(current){ // While list exists = is not empty
      if(current.data.getSpecialization() === specialization){ // If student specialization (private) matches given specialization
        students.push(current.data); // Add student object to array
      }
      current = current.next; // Move pointer to next node
    }
    return students.sort ((a, b) => (a.getName() > b.getName() ? 1 : a.getName() < b.getName() ? -1 : 0)); // Returning the array of student already filtered by specialiation to an alphabetically sorted list where if a is greater than b, then a is move after b, if a is less than b, then it is moved before b, and if they are both equal, they are not moved.
    // TODO

  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students (student objects) who are at least minYear, sorted alphabetically by student name
  
   */
  filterByMinYear(minYear) {
    let students = []; // Create an empty array
    let current = this.head;

    while (current) { // While a head or list exists
      if (current.data.getYear === minYear){ // If student year matches given minYear
        students.push(current.data); // Add student object to empty array
      }
      current = current.next; // Move pointer to next node to continue traversing the list
    }
    return students.sort((a,b) => (a.getName() > b.getName()? 1 : a.getName() < b.getName()? -1 : 0)); // Sort minYear students alphabetically using ternary comparison operator
    // TODO
    
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
  */

  async saveToJson(fileName) {
    let students = []; // Create an empty array to collect student objects
    let current = this.head; // Set pointer to head 

    while (current){ // While head or list exists
      const studentData = { // Create an object to hold each student's properties
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      }
      students.push(studentData); // Add student objects to array
      current = current.next; // Move to the next node
    }

    await fs.writeFile(fileName, JSON.stringify(students, null, 2)); // Await ensures the promise-based method (fs.writeFile) that writes data to the specified file name (which will be created if it does not exist, or will be overwritten if it exists) waits for the file-writing operation to complete before proceeding; stringify converts student array into a JSON-formatted string; null inclues all properties of the student objects in the JSON string; 2 specifies that each level of nesting should be indented 2 spaces
    // TODO
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    this.clearStudents();
    const data = await fs.readFile(fileName, 'utf-8');
    const students = JSON.parse(data);

    for (const student of students){
      this.addStudent (new Student(student.name, student.year, student.email, student.specialization));
    }
  }

}

module.exports = { LinkedList }
