# React TS Task Project <br> (TypeScript Journey Part II)

## Intro
The main purpose of this project based on one of the lessons in the course "React - The Complete Guide"[^1] *by Maximilian Schwarzmuller* is to practice TypeScript. In addition *Context API*, *useReducer* and *Redux*, three popular ways of state managment.

<details open><summary>Define `{...props}` type</summary>
 
## How to define the spread property in a component
### Narrowing came to the rescue
 
 I spent quite a lot of time trying to solve this doubt on how to type the spread property of a component what is shown in the next snippet:

---

 ```ts
interface InputProps { 
isTextarea: boolean, 
label: string, 
props: // Which type is this? 
} 

export default function input({ isTextarea, label, ...props }: InputProps)
{ 
  return ( 
    <p>
      <label htmlFor="">{label}</label> 
      {isTextarea ? <textarea {...props} /> : <input {...props} />} 
    </p> 
) 
}
 ```
For the props field in the InputProps interface, we want to account for the different props accepted by `<textarea>` and `<input>`. Since textarea and input elements share many props but also have unique ones, we can use TypeScript's built-in utility types. 

## Solution

We can use a discriminated union to conditionally handle the props depending on the isTextarea flag. Here's how:

```ts
import React from "react";

interface InputPropsBase {
  label: string;
}

interface InputPropsTextArea extends InputPropsBase {
  isTextarea: true;
  props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

interface InputPropsInput extends InputPropsBase {
  isTextarea: false;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

type InputProps = InputPropsTextArea | InputPropsInput;
```
## Explanation
1. **Base Properties:**<br>
   * The label property is common to both cases, so it's extracted into a base interface InputPropsBase.

2. **Conditional Props:**<br>
   * *InputPropsTextArea:* Includes isTextarea: true and allows `React.TextareaHTMLAttributes<HTMLTextAreaElement> as props`.
   * *InputPropsInput:* Includes isTextarea: false and allows `React.InputHTMLAttributes<HTMLInputElement> as props`.

3. **Discriminated Union:**<br>
   * Using `isTextarea` as the discriminator ensures that TypeScript will enforce the correct props type based on its value.

4. **Default Props:**<br>
   * Added `props = {}` to avoid undefined props when spreading.

However the spread operator `(...props)` does not automatically narrow the type of props to either `React.TextareaHTMLAttributes<HTMLTextAreaElement>` or `React.InputHTMLAttributes<HTMLInputElement>` based on `isTextarea`. Like:

```ts
export default function Input({ isTextarea, label, props = {} }: InputProps) {
  return (
    <p>
      <label htmlFor="">{label}</label>
      {isTextarea ? (
        <textarea {...props} /> //This going to cause a mismatch
      ) : (
        <input {...props} /> //This going to cause a mismatch
      )}
    </p>
  );
}

```
It's going to attempt to assign the full union of both types to each element, causing a mismatch for event handlers like `onChange`.

We need to narrow the type explicitly before spreading props. 

### Narrow Props Based on isTextarea

```ts
export default function Input({ isTextarea, label, props = {} }: InputProps) {
  if (isTextarea) {
    // Narrow to TextArea props
    const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    return (
      <p>
        <label htmlFor="">{label}</label>
        <textarea {...textareaProps} />
      </p>
    );
  } else {
    // Narrow to Input props
    const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <p>
        <label htmlFor="">{label}</label>
        <input {...inputProps} />
      </p>
    );
  }
}
```
## Explanation 
1. **Explicit Type Narrowing:**<br>
  Before spreading props, explicitly cast props to the correct type (`TextareaHTMLAttributes` or `InputHTMLAttributes`) using a `const` assignment.This ensures TypeScript knows the exact type of props when spreading into the respective element.

2. **Union Resolution:**<br>
  The conditional `if (isTextarea)` ensures TypeScript understands which branch is active, allowing us to safely narrow props.

3. **Safe Spreading:**<br>
  After narrowing, spreading `textareaProps` or `inputProps` will no longer throw type errors, as their types align perfectly with the attributes of `<textarea>` and `<input>` respectively.

***TypeScript's type narrowing** requires clear distinctions in code flow, and unions don’t automatically propagate to props when destructuring. By explicitly casting and separating the logic, we ensure correctness.*

</details>

---

[^1]: This course can be found in Udemy website.