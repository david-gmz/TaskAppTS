# React TS Task Project <br> (TypeScript Journey Part II)

## Intro
The main purpose of this project based on one of the lessons in the course "React - The Complete Guide"[^1] *by Maximilian Schwarzmuller* is to practice TypeScript. In addition *Context API*, *useReducer* and *Redux*, three popular ways of state managment.

<details><summary>Define `{...props}` type</summary>
 
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

<details><summary>More on spread props</summary>
 
##  Using `onClick` in a `<button>`
```ts
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {label}
    </button>
  );
}
```
###  Explanation:
By extending `React.ButtonHTMLAttributes<HTMLButtonElement>`, the Button component automatically supports all valid attributes of a `<button>`, such as onClick, disabled, type, etc.
 
### TypeScript Validation
1. **TypeScript ensures that:**

   - `onClick` is properly typed as <br>
   `(event: React.MouseEvent<HTMLButtonElement>) => void.`
   - Other invalid attributes are caught. For example, passing an invalid attribute like rows to a `<button>` would result in an error:
```ts
<Button label="Invalid Button" rows={3} /> // ❌ Error: 'rows' does not exist on type 'ButtonHTMLAttributes<HTMLButtonElement>'
```
### Key Takeaways
   - onClick is an intrinsic attribute of `<button>`, and we don’t need to define it explicitly in our interface when extending `React.ButtonHTMLAttributes<HTMLButtonElement>`.
   - Using TypeScript’s intrinsic attributes for HTML elements ensures our props are aligned with the standard DOM attributes.

### Why Use label Instead of children?
1. **Semantic Clarity:**
   - label explicitly communicates that the string is the button's text content.
   - children is more generic and implies flexibility (e.g., the ability to nest other components).
2. **Consistency:**
   - If your component has other structured props (like icon, variant, etc.), using label keeps the API clear and avoids ambiguity:
```ts
<Button label="Click Me" icon={<Icon />} variant="primary" />;
```
3. **Flexibility for Other Features:**
   - If we later decide to allow additional customizations (like an optional icon or aria-label for accessibility), having a dedicated label makes it easier to manage:
```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // Text shown on the button
  icon?: React.ReactNode; // Optional icon to display
}

<Button label="Click Me" icon={<Icon />} />;
```
### Comparison
Using children:
```ts
<Button onClick={() => alert("Clicked!")}>Click Me</Button>;
```
Using label:
```ts
<Button onClick={() => alert("Clicked!")} label="Click Me" />;
```
Both work, but the second option (label) is more explicit for text-only buttons.
</details>
<details open><summary>Using enum in action</summary>
 
##  Criteria of using enum
Using an enum for ActionType in reducers can make our code clearer and safer by:

1. **Providing a single source of truth:** The enum creates a set list of possible action types, making it easy to update action names in one place. It avoids typos that might happen if you used plain strings each time and provides TypeScript's auto-complete.

2. **Improving type safety:** When using enum with a union type (like Action), TypeScript can catch when an invalid action type is passed. Without an enum, you'd rely on string literals, which are more error-prone.

3. **Better readability:** enum values are descriptive, improving code readability when you use them in a switch statement or within the reducer. This makes it immediately clear what actions the reducer supports.

In this setup, ActionType is reusable if you expand the app, ensuring consistency in any part of the app that uses these actions.

</details>
---

[^1]: This course can be found in Udemy website.