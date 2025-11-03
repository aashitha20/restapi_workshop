# restapi_workshop
> Ctrl+/   To comment lines
> 

## 1. Introduction

React is a single page application that uses component based architecture for its rendering

The main advantage of components are these are reusable

---

## 2. Initialization

```bash
npx create-react-app project-name
```

This will create a react project file and 

## 3. Basic Concepts

### 3.1 React Components

React Components are nothing but functions that return JSX components

Under Index.js is the starting point of the code 

```jsx
<App />
```

- is responsible for page  to appear
- It is the entry point of the react app

```jsx
function Hello(){
   return(
     <div>
       <h2>hey! this is Aashitha</h2>
       <h3>I'm a Computer Science Engineer</h3>
     </div>
   );
 }
```

```jsx
const Hello = () => {
  return(
    <div>
  <h2>hey! this is Aashitha</h2>
  <h3>I'm a Computer Science Engineer</h3>
    </div>
  );
}
```

![image.png](attachment:f034856b-19df-4075-99b2-2421242466f0:image.png)

---

![image.png](attachment:42d048df-22ee-42dc-9a5b-cb7f5b9d193a:image.png)

---

```jsx
import React, { useState} from "react";
const Hey = ({ message }) => {
  const [name, setName]= useState(" ");
  const [email, setEmail]= useState(" ");
  const [isButtonClicked, setisButtonClicked] = useState(false);
  return(
    <div>
      <center>
       <input 
          type="text" 
          placeholder= "Enter your name" 
          value = {name}
          onChange={(e) => {
            setisButtonClicked(false);
            setName(e.target.value);
          }}
        /> 
        
        <input 
          type="email" 
          placeholder= "Enter your email"
          value = {email}
          onChange={(e) => {
            setisButtonClicked(false);
            setEmail(e.target.value);
          }}
        />
        <button onClick ={()=> setisButtonClicked(true) } >Submit</button>

        <button onClick = {()=> setisButtonClicked(false)}>reset</button>
        {isButtonClicked ? (<h3>Name: {name}<br/> Email: {email}</h3>):null}
      </center>
    </div>
  );
}
 
export default Hey;

```

![image.png](attachment:c4a2ee78-8dcc-4b6d-815d-d54e4731dc68:image.png)
