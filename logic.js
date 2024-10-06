// -------------------------------- Testimonial Slider -----------------------------------

const review = [

    ` " BetterMind Therapy made finding the right therapist so easy. I’ve seen significant improvement in my anxiety, and the convenience of online sessions is a game changer. " `,

   ` " As someone with a busy schedule, the flexibility of online therapy was exactly what I needed. My therapist is incredible, and I love how accessible it is. " `,

   ` " Therapy from the comfort of my own home has made such a difference. I’ve been able to stay consistent with my sessions because of this platform. " `,

   ` " The care and attention I’ve received through BetterMind are unmatched. It’s so much easier to make time for therapy now that it’s online. " `,
];


const name = [

    "-Rachel M.",

    "-Michael T.",

    "-Chris G.",

    "-Lisa J."

];


let count = 0;

const rv = document.querySelector(".r1");

const person = document.querySelector(".reviewer");

const right = document.querySelector(".arrow-right");

const left = document.querySelector(".arrow-left");

// Function to update the testimonial content
function updateTestimonial() {
    rv.textContent = review[count];
    person.textContent = name[count];
}

// Initially set the content
updateTestimonial();

// Right arrow click event (Next)
right.addEventListener("click", () => {
    count++;
    if (count >= review.length) {
        count = 0;  // Wrap around to the first review
    }
    updateTestimonial();
});

// Left arrow click event (Previous)
left.addEventListener("click", () => {
    count--;
    if (count < 0) {
        count = review.length - 1; 
    }
    updateTestimonial();
});


// -------------------------------- Accordion -----------------------------------

// Select the question boxes
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    // Get the expand icon and answer div within the current accordion
    const expandIcon = accordion.querySelector('.expand');
    const answer = accordion.querySelector('.answer');

    // Add a click event listener to the expand icon
    expandIcon.addEventListener('click', () => {
        // Toggle the 'hide' class on the answer div
        answer.classList.toggle('hide');
    
        expandIcon.classList.toggle('cross');
    

    });
});



// ------------------------------   Matter JS  ---------------------------------

window.onload = function() {
    // Alias Matter.js modules
    const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Composite } = Matter;

    // Create the engine and world
    const engine = Engine.create();
    const world = engine.world;

    // Create the renderer
    const render = Render.create({
        canvas: document.getElementById('matter-canvas'),
        engine: engine,
        options: {
            width: 500,
            height: 500,
            wireframes: false,
            background: '#293BFF', // blue background color for the container
            linewidth: 0
        }
    });

    // Run the renderer
    Render.run(render);

    // Create a runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Create boundaries (walls) for the container
    const walls = [
        Bodies.rectangle(250, 0, 500, 10, { isStatic: true, render: { visible: false }}), // Top wall
        Bodies.rectangle(250, 500, 500, 10, { isStatic: true, render: { visible: false } }), // Bottom wall
        Bodies.rectangle(0, 250, 10, 500, { isStatic: true, render: { visible: false } }), // Left wall
        Bodies.rectangle(500, 250, 10, 500, { isStatic: true, render: { visible: false } }) // Right wall
    ];
    World.add(world, walls);

    // Create 9-10 balls with unique text inside
    const balls = [];
    const texts = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen"];
    
    for (let i = 0; i < texts.length; i++) {
        let ball = Bodies.circle(250, 100, 40, {
            restitution: 0.4,  // Lower bounce for less shaking
            friction: 0.001,   // Lower friction for smooth sliding
            frictionAir: 0.02, // Reduce air resistance
            density: 0.02,     // Add more mass for stability
            render: {
                fillStyle: '#ffffff', // White color for the ball
                text: {
                    content: texts[i], // Unique text inside the ball
                    color: '#293BFF', // Blue color for the text
                    size: 14, // Text size
                    fontFamily: 'Arial' // Set font family
                }
            }
        });
        balls.push(ball);
        World.add(world, ball);
    }

    // Mouse interaction for dragging balls
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    World.add(world, mouseConstraint);

    // Fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 500, y: 500 }
    });

    // Keep the canvas responsive
    window.addEventListener('resize', function() {
        render.canvas.width = 500;
        render.canvas.height = 500;
    });
};