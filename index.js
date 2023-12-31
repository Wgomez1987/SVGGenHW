const inquirer = require('inquirer');
const { Triangle, Circle, Square } = require('./shapes');
const SVG = require('./lib/svg'); 

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo (Must not exceed more than 3 letters.)',
        validate: input => {
            if (input.length > 3) {
                return 'Text must not exceed 3 characters!';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'textColor',  
        message: 'Enter a text color.',
    },
    {        
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['Circle', 'Triangle', 'Square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color',
    }
];

inquirer.prompt(questions).then(answers => {
    
    
    const svg = new SVG();

    
    svg.setText(answers.text, answers.textColor);

    let shape;
    switch (answers.shape) {
        case 'Circle':
            shape = new Circle();
            break;
        case 'Triangle':
            shape = new Triangle();
            break;
        case 'Square':
            shape = new Square();
            break;
    }
    shape.setColor(answers.shapeColor);
    svg.setShape(shape);


    svg.saveToFile();

    console.log('Logo generation complete!');
});