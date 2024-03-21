---
marp: true
theme: gaia
---

<style>
p, pre {
   font-size: 0.9rem;
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