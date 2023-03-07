// Grabbing elements from index.html and creating a couple variables
const rectangleLengthInput = document.getElementById("rectangleLengthInput");
const rectangleWidthInput = document.getElementById("rectangleWidthInput");
const insertRectangleButton = document.getElementById("insertRectangleButton");
const squareSideInput = document.getElementById("squareSideInput");
const insertSquareButton = document.getElementById("insertSquareButton");
const circleRadiusInput = document.getElementById("circleRadiusInput");
const insertCircleButton = document.getElementById("insertCircleButton");
const triangleHeightInput = document.getElementById("triangleHeightInput");
const insertTriangleButton = document.getElementById("insertTriangleButton");
const drawingBoard = document.getElementById("drawingBoard");
const shapeInformation = document.getElementById("shapeInformation");
const nameLabelSpan = document.getElementById("nameLabelSpan");
const nameValueSpan = document.getElementById("nameValueSpan");
const heightLabelSpan = document.getElementById("heightLabelSpan");
const heightValueSpan = document.getElementById("heightValueSpan");
const widthListItem = document.getElementById("widthListItem");
const widthLabelSpan = document.getElementById("widthLabelSpan");
const widthValueSpan = document.getElementById("widthValueSpan");
const areaLabelSpan = document.getElementById("areaLabelSpan");
const areaValueSpan = document.getElementById("areaValueSpan");
const perimeterLabelSpan = document.getElementById("perimeterLabelSpan");
const perimeterValueSpan = document.getElementById("perimeterValueSpan");
const resetButton = document.getElementById("resetButton");
const maximumPixels = 600;
// Created this instead of using a random color function for all colors to keep it a little more simple
const colors = ["#007bff", "#6c757d", "#28a745", "#dc3545", "#ffc107", "#17a2b8", "#343a40", "#f8f9fa", "#ffffff", "#6610f2", "#6f42c1", "#e83e8c", "#fd7e14", "#20c997"];
const shapes = [];

// Creates getRandomValue() Function, generates/returns a random Integer
const getRandomValue = (minimum, maximum) => {
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

// Creates shapeCount() Function
// If one (or more) shapes presently on page, <button> and if no shapes presently on page, <button disabled>
const shapeCount = () => {
    if (shapes.length > 0) {
        resetButton.removeAttribute("disabled");
    } else if (shapes.length === 0) {
        resetButton.setAttribute("disabled", "true");
    }
}

// Creates Shape Class
class Shape {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        //  Creates <div> HTML Element, adds "shape" HTML Class to <div>
        //  Adds <div> to drawingBoard Constant via appendChild() Method
        //  Adds Object to shapes[] Array via push() Method
        this.div = document.createElement("div");
        this.div.classList.add("shape");
        drawingBoard.appendChild(this.div);
        shapes.push(this);
    }

    // Creates getRandomColor() Method
    // Sets value of "background-color:" CSS Property
    getRandomColor() {
        this.div.style.backgroundColor = colors[getRandomValue(1, 14)];
    }

    // Creates getRandomLocation() Method
    // Sets values of "top:" and "left:" CSS Properties via String Substitution
    getRandomLocation() {
        this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
        this.div.style.left = `${getRandomValue(this.width, maximumPixels)}px`;
    }

    // Creates describeShape() Method
    // Modifies innerText of variables
    describeShape(id, height, width) {
        nameValueSpan.innerText = `${id}`;
        heightValueSpan.innerText = `${height} Pixels`;
        widthValueSpan.innerText = `${width} Pixels`;
    }

    // Creates removeShape() Method
    // Modifies innerText of variables
    // Removes <div> HTML Element from drawingBoard Constant via removeChild() Method
    // Removes Object from shapes[] Array via splice() Method
    removeShape() {
        nameLabelSpan.innerText = "Name: ";
        heightLabelSpan.innerText = "Height: ";
        widthLabelSpan.innerText = "Width: ";
        areaLabelSpan.innerText = "Area: ";
        perimeterLabelSpan.innerText = "Perimeter: ";
        nameValueSpan.innerText = "";
        heightValueSpan.innerText = "";
        widthValueSpan.innerText = "";
        areaValueSpan.innerText = "";
        perimeterValueSpan.innerText = "";
        drawingBoard.removeChild(this.div);
        shapes.splice(this, 1);
        shapeCount();
    }
}

// Creates Rectangle class extending Shape
class Rectangle extends Shape {
    constructor(height, width) {
        super(height, width);
        this.div.id = "Rectangle";
        this.div.style.height = `${height}px`;
        this.div.style.width = `${width}px`;
        this.getRandomColor();
        this.getRandomLocation();

        // Adds click eventlistener to grab shape and put info in Shape area
        this.div.addEventListener("click", () => {
            this.describeShape(this.div.id, this.height, this.width);
            areaLabelSpan.innerText = "Area: ";
            perimeterLabelSpan.innerText = "Perimeter: ";
            areaValueSpan.innerText = `${Math.floor(height * width)} Pixels`;
            perimeterValueSpan.innerText = `${Math.floor(2 * (height + width))} Pixels`;
        })

        // Adds dblclick eventlistener to remove shape
        this.div.addEventListener("dblclick", () => {
            this.removeShape();
        })
    }

    // Override Shape describeShape
    describeShape(id, height, width) {
        nameLabelSpan.innerText = "Name: ";
        heightLabelSpan.innerText = "Length: ";
        widthLabelSpan.innerText = "Width: ";
        nameValueSpan.innerText = `${id}`;
        heightValueSpan.innerText = `${height} Pixels`;
        widthValueSpan.innerText = `${width} Pixels`;
    }
}
// Creates Square class extending Shape
class Square extends Shape {
    constructor(height) {
        super(height);
        this.div.id = "Square";
        this.div.style.height = `${height}px`;
        this.div.style.width = `${height}px`;
        this.getRandomColor();
        this.getRandomLocation();

        // Adds click eventlistener to grab shape and put info in Shape area
        this.div.addEventListener("click", () => {
            this.describeShape(this.div.id, this.height, this.height);
            areaLabelSpan.innerText = "Area: ";
            perimeterLabelSpan.innerText = "Perimeter: ";
            areaValueSpan.innerText = `${Math.floor(height * height)} Pixels`;
            perimeterValueSpan.innerText = `${Math.floor(4 * height)} Pixels`;
        })

        // Adds dblclick eventlistener to remove shape
        this.div.addEventListener("dblclick", () => {
            this.removeShape();
        })
    }

    // Overrides Parent getRandomLocation
    getRandomLocation() {
        this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
        this.div.style.left = `${getRandomValue(this.height, maximumPixels)}px`;
    }

    // Overrides Parent describeShape
    describeShape(id, height) {
        nameLabelSpan.innerText = "Name: ";
        heightLabelSpan.innerText = "Side: ";
        widthLabelSpan.innerText = "Side: ";
        nameValueSpan.innerText = `${id}`;
        heightValueSpan.innerText = `${height} Pixels`;
        widthValueSpan.innerText = `${height} Pixels`;
    }
}

// Create Circle class extending Shape
class Circle extends Shape {
    constructor(height) {
        super(height);
        this.div.id = "Circle";
        this.div.style.height = `${height}px`;
        this.div.style.width = `${height}px`;
        this.getRandomColor();
        this.getRandomLocation();

        // Adds click eventlistener to grab shape and put info in Shape area
        this.div.addEventListener("click", () => {
            this.describeShape(this.div.id, this.height);
            widthLabelSpan.innerText = "Diameter: ";
            areaLabelSpan.innerText = "Area: ";
            perimeterLabelSpan.innerText = "Circumference: ";
            widthValueSpan.innerText = `${Math.floor(2 * height)} Pixels`;
            areaValueSpan.innerText = `${Math.floor(Math.PI * (height * height))} Pixels`;
            perimeterValueSpan.innerText = `${Math.floor(2 * Math.PI * height)} Pixels`;
        })

        // Adds dblclick eventlistener to remove shape
        this.div.addEventListener("dblclick", () => {
            this.removeShape();
        })
    }

    // Overrides Parent method
    getRandomLocation() {
        this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
        this.div.style.left = `${getRandomValue(this.height, maximumPixels)}px`;
    }

    // Overrides Parent Method
    describeShape(id, height) {
        nameLabelSpan.innerText = "Name: ";
        heightLabelSpan.innerText = "Radius: ";
        nameValueSpan.innerText = `${id}`;
        heightValueSpan.innerText = `${height} Pixels`;
    }
}

// Create Triangle class extending Shape
class Triangle extends Shape {
    constructor(height) {
        super(height);
        this.div.id = "Triangle";
        this.div.style.borderBottomWidth = `${height}px`;
        this.div.style.borderRightWidth = `${height}px`;
        this.getRandomColor();
        this.getRandomLocation();

        // Adds "click" Event Listener to Triangle Class
        this.div.addEventListener("click", () => {
            this.describeShape(this.div.id, this.height);
            areaLabelSpan.innerText = "Area: ";
            perimeterLabelSpan.innerText = "Circumference: ";
            areaValueSpan.innerText = `${Math.floor(0.5 * height * height)} Pixels`;
            perimeterValueSpan.innerText = `${Math.floor(2 * (height * height) + Math.sqrt(2) * height)} Pixels`;
        })

        // Adds dblclick eventlistener to remove shape
        this.div.addEventListener("dblclick", () => {
            this.removeShape();
        })
    }

    // Overrides Parent Method
    getRandomColor() {
        this.div.style.borderBottomColor = colors[getRandomValue(1, 14)];
    }

    // Overrides Parent Method
    getRandomLocation() {
        this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
        this.div.style.left = `${getRandomValue(this.height, maximumPixels)}px`;
    }

    // Overrides Parent Method
    describeShape(id, height) {
        nameLabelSpan.innerText = "Name: ";
        heightLabelSpan.innerText = "Height: ";
        widthLabelSpan.innerText = "Base: ";
        nameValueSpan.innerText = `${id}`;
        heightValueSpan.innerText = `${height} Pixels`;
        widthValueSpan.innerText = `${height} Pixels`;
    }
}

// Adds "keyup" Event Listeners to rectangleLengthInput, rectangleWidthInput, squareSideInput, circleRadiusInput and triangleHeightInput Constants
// If the <input type="text"> HTML Element(s) meet condition(s), the "disabled" Attribute is removed from the associated <input type="submit"> HTML Element
rectangleLengthInput.addEventListener("keyup", function () {
    let rectangleLengthInputValue = document.getElementById("rectangleLengthInput").value;
    let rectangleWidthInputValue = document.getElementById("rectangleWidthInput").value;
    if (rectangleLengthInputValue !== "" && rectangleWidthInputValue !== "") {
        insertRectangleButton.removeAttribute("disabled");
    }
})

rectangleWidthInput.addEventListener("keyup", function () {
    let rectangleWidthInputValue = document.getElementById("rectangleWidthInput").value;
    let rectangleLengthInputValue = document.getElementById("rectangleLengthInput").value;
    if (rectangleWidthInputValue !== "" && rectangleLengthInputValue !== "") {
        insertRectangleButton.removeAttribute("disabled");
    }
})

squareSideInput.addEventListener("keyup", function () {
    let squareSideInputValue = document.getElementById("squareSideInput").value;
    if (squareSideInputValue !== "") {
        insertSquareButton.removeAttribute("disabled");
    }
})

circleRadiusInput.addEventListener("keyup", function () {
    let circleRadiusInputValue = document.getElementById("circleRadiusInput").value;
    if (circleRadiusInputValue !== "") {
        insertCircleButton.removeAttribute("disabled");
    }
})

triangleHeightInput.addEventListener("keyup", function () {
    let triangleHeightInputValue = document.getElementById("triangleHeightInput").value;
    if (triangleHeightInputValue !== "") {
        insertTriangleButton.removeAttribute("disabled");
    }
})

// Adds "click" Event Listeners to insertRectangleButton, insertSquareButton, insertCircleButton and insertTriangleButton  Constants
// If the <input type="text"> HTML Element(s) meet condition(s), a new Object is created via Instantiation and assigned to  a Variable
// The content of the <input type="text"> HTML Element(s) are assigned a value of ""
insertRectangleButton.addEventListener("click", function () {
    let rectangleLengthInputValue = document.getElementById("rectangleLengthInput").value;
    let rectangleWidthInputValue = document.getElementById("rectangleWidthInput").value;
    if (rectangleLengthInputValue > maximumPixels - 1 && rectangleWidthInputValue > maximumPixels - 1) {
        alert("Try again! Enter a number less than 600 for the Length and Width!");
    } else if (rectangleLengthInputValue > maximumPixels - 1) {
        alert(`I already told you this, try again! ${rectangleLengthInputValue} is too high! Enter a number less than ${maximumPixels} for the Length!`);
    } else if (rectangleWidthInputValue > maximumPixels - 1) {
        alert(`You are just doing this on purpose, try again! ${rectangleWidthInputValue} is too high! Enter a number less than ${maximumPixels} for the Width!`);
    } else {
        let newRectangle = new Rectangle(rectangleLengthInputValue, rectangleWidthInputValue);
    }
    document.getElementById("rectangleLengthInput").value = "";
    document.getElementById("rectangleWidthInput").value = "";
    shapeCount();
})

insertSquareButton.addEventListener("click", function () {
    let squareSideInputValue = document.getElementById("squareSideInput").value;
    if (squareSideInputValue > maximumPixels - 1) {
        alert(`Try again! ${squareSideInputValue} is too high! Enter a number less than ${maximumPixels} for the Side!`);
    } else {
        let newSquare = new Square(squareSideInputValue);
    }
    document.getElementById("squareSideInput").value = "";
    shapeCount();
})

insertCircleButton.addEventListener("click", function () {
    let circleRadiusInputValue = document.getElementById("circleRadiusInput").value;
    if (circleRadiusInputValue > maximumPixels - 1) {
        alert(`Try again! ${circleRadiusInputValue} is too high! Enter a number less than ${maximumPixels} for the Radius!`);
    } else {
        let newCircle = new Circle(circleRadiusInputValue);
    }
    document.getElementById("circleRadiusInput").value = "";
    shapeCount();
})

insertTriangleButton.addEventListener("click", function () {
    let triangleHeightInputValue = document.getElementById("triangleHeightInput").value;
    if (triangleHeightInputValue > maximumPixels - 1) {
        alert(`Try again! ${triangleHeightInputValue} is too high! Enter a number less than ${maximumPixels} for the Height!`);
    } else {
        let newTriangle = new Triangle(triangleHeightInputValue);
    }
    document.getElementById("triangleHeightInput").value = "";
    shapeCount();
})

// Makes clicking the resetButton reload the page
resetButton.addEventListener("click", function () {
    location.reload();
})