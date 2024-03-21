---
marp: true
theme: gaia
---

<style>
p, pre {
   font-size: 0.8rem;
}

section {
    padding: 1rem;
}
</style>

<!-- _class: lead -->

# Intro to ReactJS

BHS Hackathon 2024
https://github.com/wg4568/bhs-hackathon-2024

---

# ReactJS is a **component based** framework for creating web applications.

---

# Traditional HTML Code

```html
<div>
    <img src="/jimmy.jpg" />
    <h1>Jimmy John</h1>
</div>

<div>
    <img src="/sarah.jpg" />
    <h1>Sarah Smith</h1>
</div>
```

What happens if we want to change how a profile is displayed?

Imagine if we had 150 employees! Is this DRY code?

---

# ReactJS To The Rescue

```jsx
function Profile(props) {
    return <div>
        <img src={props.photo} />
        <h1>{props.name}</h1>
    </div>
}

function MyApp() {
    return <div>
        <Profile name="Jimmy John" profile="/jimmy.jpg" />
        <Profile name="Sarah Smith" profile="/sarah.jpg" />
    </div>
}
```

Now we can reuse our `Profile` component across our project.

---

# ReactJS Weather App

![height:300px](images/weather-app.png)

How might you break down this "design" into components?

---

# Getting Started

![width:620px](images/create-repl.png)

Navigate to https://replit.com/ and create an account. Then start a new project using the **React Javascript** template.

---

# HTML, in Javascript?!

Otherwise known as JSX, or **Javascript XML**.

Needs to be compiled, or "bundled" into standard Javascript code by a tool such as Vite or Webpack.

![height:340px](images/bundler.png)

---

# Building Your Code

We are using [Vite](https://vitejs.dev/) as our bundler.

```json
    // From package.json
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
```

We can run `npm run build` in the console to build our code.

Take a look in the new folder called `dist/`, what files have been created?

---

# Passing Values

We can pass data into React components using **props**.

```jsx
function Nametag(props) {
    return <h1>Written by {props.name}</h1>
}

function MyApp() {
    return <div>
        <Nametag name="Matt" />
    </div>
}
```

If you'd like, you can also get the value directly using deconstruction.

```jsx
function Nametag({ name }) {
    return <h1>Written by {name}</h1>
}
```

---

# Why Doesn't This Work?

```jsx
function MyCounter() {
    var count = 0;

    function increaseCount() {
        count = count + 1;
    }

    return <div>
        <p>The total is {count}</p>
        <button onClick={increaseCount}>Increase!</button>
    </div>
}
```

The answer is to do with how ReactJS handles **state**.

State is how an application remembers stuff.

---

# Managing State

ReactJS components manage their own state using **hooks**.

```jsx
function MyCounter() {
    const [count, setCount] = useState(0);

    function increaseCount() {
        setCount(count + 1);
    }

    return <div>
        <p>The total is {count}</p>
        <button onClick={increaseCount}>Increase!</button>
    </div>
}
```

The `useState` hook creates an object (that can be anything) and a function to update it's value. The value provided to `useState` is the initial value.

---