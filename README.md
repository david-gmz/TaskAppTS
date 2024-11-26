# React TS Task Project <br> (TypeScript Journey Part II)

## Intro
The main purpose of this project based on one of the lessons in the course "React - The Complete Guide"[^1] *by Maximilian Schwarzmüller* is to practice TypeScript. In addition *Context API*, *useReducer* and *Redux*, three popular ways of state managment.

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
<details><summary>Using enum in action</summary>
 
##  Criteria of using enum
Using an enum for ActionType in reducers can make our code clearer and safer by:

1. **Providing a single source of truth:** The enum creates a set list of possible action types, making it easy to update action names in one place. It avoids typos that might happen if you used plain strings each time and provides TypeScript's auto-complete.

2. **Improving type safety:** When using enum with a union type (like Action), TypeScript can catch when an invalid action type is passed. Without an enum, you'd rely on string literals, which are more error-prone.

3. **Better readability:** enum values are descriptive, improving code readability when you use them in a switch statement or within the reducer. This makes it immediately clear what actions the reducer supports.

In this setup, ActionType is reusable if you expand the app, ensuring consistency in any part of the app that uses these actions.

</details>
<details><summary>Typing forwardRef in React</summary>
 
## Properly type our React.forwardRef function for Input
### handle the ref argument
So starting with this part of the Input component:
```ts
const Input = React.forwardRef(function Input({ isTextarea, label, props = {} }: InputProps, ref) {
    //code...
    <textarea ref={ref} className={classesInput} {...textareaProps} />
    //more code...
    <input ref={ref} className={classesInput} {...inputProps} />
    })
```
 To properly type our `React.forwardRef` function for `Input`, we need to handle the ref argument and its typing. Since ref will either point to a textarea or an input element based on the `isTextarea` prop, you'll need to define a generic type that accommodates both.

Here’s the updated and typed `React.forwardRef` implementation:
```ts
// models.read-the-docs
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

// Input.tsx
const Input = React.forwardRef<
    HTMLTextAreaElement | HTMLInputElement,
    InputProps
>(function Input({ isTextarea, label, props = {} }: InputProps, ref) {
  //code...
    <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={classesInput}
        {...textareaProps}
    />
    //more code...
    <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={classesInput}
        {...inputProps}
    />
    })
```
### Key Changes and Explanation:
1. **ForwardRef Type:**
   - The `React.forwardRef` generic type is defined as `<HTMLTextAreaElement | HTMLInputElement, InputProps>`.
   - This ensures the ref can point to either an HTMLTextAreaElement or an `HTMLInputElement`, based on `isTextarea`.
2. **Casting ref:**
   - Inside the conditional branches, the ref is cast to the appropriate type using `React.Ref<HTMLTextAreaElement>` or `React.Ref<HTMLInputElement>`.
3. **Fallback for props:**
   - The props property in InputProps is still optional and defaults to an empty object ({}).
### Usage:
When consuming the Input component with a ref, TypeScript will correctly infer the type based on the isTextarea prop:
```ts
// NewProject.tsx
import React from "react";
import Input from "./Input";

export default function NewProject() {

    const title = React.useRef<HTMLInputElement>(null);
    const description = React.useRef<HTMLTextAreaElement>(null);
    const dueDate = React.useRef<HTMLInputElement>(null);
     return (
      // code component
       <Input
                    ref={title}
                    isTextarea={false}
                    label="Title"
                    props={{ type: "text", placeholder: "Enter text" }}
                />
                <Input
                    ref={description}
                    label="Description"
                    props={{ placeholder: "Enter your description" }}
                    isTextarea
                />
                <Input
                    ref={dueDate}
                    isTextarea={false}
                    label="Due Date"
                    props={{ type: "date" }}
                />
      //more code...
     )
   }
 ```
</details>
<details><summary>specific type of the dialog ref </summary>
 
## Defining type in Modal component 
```ts
//Modal.tsx
//code of the component
            open() {
                if (dialog.current !== undefined) dialog.current.showModal(); // ❌Error: Property 'showModal' does not exist on type 'never'.ts(2339) 
            }
//some more code..
            <dialog ref={dialog}>{children}</dialog>, // ❌Error:  Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLDialogElement> | undefined'. Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<HTMLDialogElement>'. Types of property 'current' are incompatible. Type 'undefined' is not assignable to type 'HTMLDialogElement | null'.ts(2322)
```
###  Solution
 By default, `React.useRef()` is initialized with undefined, leading TypeScript to infer the type as `MutableRefObject<undefined>`. Since we're working with an HTML `<dialog>` element, we should provide the correct type for the dialog `ref: HTMLDialogElement | null`.
Here's a corrected version of your Modal component:

```ts
// Ensure the modal root exists
const modalRoot = document.getElementById("modal-root");

const Modal = forwardRef(function Modal(
  { children }: ModalProps,
  ref: React.Ref<{ open: () => void }>
) {
  // Define the ref with the correct type
  const dialog = useRef<HTMLDialogElement | null>(null);

  // Use imperative handle to expose functions to the parent component
  useImperativeHandle(ref, () => ({
    open() {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
  }));

  // Render the dialog inside the modal root using portals
  if (modalRoot) {
    return createPortal(
      <dialog ref={dialog}>{children}</dialog>,
      modalRoot
    );
  }

  return null;
});
```
## Explanation of Fixes:
1. **Type for dialog Ref:**
   - Changed `const dialog = useRef();` to `const dialog = useRef<HTMLDialogElement | null>(null);` to specify that the dialog ref references an HTML `<dialog>` element.
2. **useImperativeHandle Type:**
   - Defined the type of `ref` as `React.Ref<{ open: () => void }>` to specify that the parent component can use the open function.
3. **Portal Check:**
   - Added a check for modalRoot to handle cases where modal-root is missing, ensuring a graceful fallback.
4. **createPortal Typing:**
   - Fixed dialog ref type mismatch by ensuring it matches the expected type `React.RefObject<HTMLDialogElement>`.
*This should eliminate the TypeScript errors and ensure proper type safety in your component.*

## Why ref as React.Ref<{ open: () => void }>?
1. **Default Behavior of ref:**
   - Normally, a ref in React points directly to an element (`HTMLDialogElement`, `HTMLDivElement`, etc.). However, when you use `forwardRef` with imperative handles, you're essentially customizing what the parent can "see" through that ref.

2. **Custom API for the Parent:**
   - Instead of exposing the raw DOM node (HTMLDialogElement), you're exposing an object with specific methods, like `{ open: () => void }`. TypeScript requires we to explicitly define the shape of that object.

3. **React's Ref Type:**<br>
The type `React.Ref<T>` represents a ref that can either:
   - Be a callback ref (function).
   - Be a `RefObject<T>` (created by useRef).
   - Or be null.

Since our component will expose the open() method, we declare the ref type as `React.Ref<{ open: () => void }>`, letting TypeScript know exactly what the parent will receive.
</details>

<details><summary>The Context API powerful tool for managing state</summary>
 
##  The Context API in ReactJS
 The Context API in ReactJS is a powerful tool for managing state and passing data through a component tree without prop drilling. When combined with TypeScript, it provides additional advantages, but it also introduces specific challenges. Below is a detailed breakdown:

## Advantages of Context API with TypeScript
1. **Avoids Prop Drilling**

   - Context simplifies the process of passing data deeply nested in a component tree. This is especially useful for global states like themes, authentication, or language preferences.
2. **Improved Type Safety**

   - TypeScript ensures that the context's shape is consistent across components. With well-defined types, developers are less prone to runtime errors caused by mismatched data structures.
3. **Better Developer Experience**

   - Intellisense in IDEs (e.g., VSCode) leverages TypeScript types, making it easier to use context values correctly and reducing the learning curve for new developers.
4. **Scalability for Small to Medium Apps**

   - Context API works well for apps with manageable state requirements, providing a simpler alternative to libraries like Redux for medium-sized projects.
5. **Integration with useReducer**

   - Combining Context with **useReducer** and **TypeScript** allows for fine-grained control over state and action types, enabling a structured state management approach.
6. **No Additional Dependencies**

   - Context API is built into React, eliminating the need for external libraries. TypeScript complements it seamlessly without requiring extra tools.

## Disadvantages of Context API with TypeScript
1. **Verbose Type Definitions**

   - Defining types for the context, provider, and consumer can be tedious, especially for complex contexts. <br> Example:
```ts
interface ContextProps {
    selectedProjectId: undefined | null | ProjectProps["id"];
    projects: ProjectProps[];
    onStartAddProject(): void;
    onCancelProject: () => void;
    onSelectedProject: (id: ProjectProps["id"]) => void;
    onAddProject: (projectData: ProjectFieldsProps) => void;
    onDeleteProject: () => void;
    project: ProjectProps | undefined;
    highlightSelectedID: ProjectProps["id"];
}
```

2. **Performance Overhead**

   - Context updates can trigger re-renders of all components consuming the context, even if they don't need the updated value. Managing performance with memoization and optimization becomes crucial.
3. **Boilerplate Code**

   - Creating the context, provider, and consumer involves repetitive patterns. With TypeScript, this can feel even more cumbersome due to the explicit type annotations.
4. **Scaling Issues**

   - For larger applications, using multiple contexts or deeply nested providers can lead to "provider hell." Managing multiple contexts with TypeScript requires meticulous type organization.
5. **Debugging Challenges**

   - Debugging context value propagation and unintended re-renders can be challenging. The TypeScript layer may make issues harder to trace due to the abstraction of types.
6. **Limited Suitability for Complex State Management**

   - For highly complex or frequently changing states, Context API becomes less efficient. Libraries like Redux or Zustand, which integrate well with TypeScript, may be better alternatives.
## When to Use Context API with TypeScript
- Small to medium-sized projects with straightforward global state requirements.
- Apps where type safety and structured data passing are critical.
- When avoiding external state management libraries like Redux or Zustand.
## When to Avoid or Limit Context API
- Large-scale projects with extensive state or complex interdependencies.
- Scenarios requiring frequent updates across unrelated components (better handled with ***Redux, Zustand***, or similar).

</details>
<details><summary>Refactoring improvements</summary>
 
## Organization & Avoiding Performance Overhead
1. **Better Type Organization:**

   - Separated types into dedicated files for better organization
   - Used more specific naming conventions
   - Added type aliases for commonly used types
   - Removed redundant interfaces and consolidated types


2. **Performance Optimizations:**

    - Split the context into separate state and dispatch contexts to prevent unnecessary rerenders
    - Added useCallback and useMemo hooks for memoization
    - Created custom hooks to encapsulate logic and provide better reusability
    - Moved complex computations into hooks


3. **Code Structure Improvements:**

   - Separated concerns into different files (types, actions, reducer, hooks)
   - Created a custom useProjects hook to encapsulate all project-related logic
   - Improved naming conventions for better clarity
   - Added better error handling in context hooks


5. **State Management Improvements:**

    - Simplified the state structure
    - Made the reducer more predictable with better type safety
    - Added proper null checks in the reducer
    - Improved action type naming for better debugging


6. **Additional Safety Features:**

    - Added runtime checks for context usage
    - Improved type safety throughout the application
    - Added proper undefined checks
    - Made the initial state more explicit


7. **Developer Experience Improvements:**

    - Better file organization
    - More consistent naming conventions
    - Improved type exports
    - Better separation of concerns
 

</details>
<details open><summary>Improve type safety and state management</summary>
 
##  Making the states even more explicit and type-safe
1. **Type-Safe View States:**

    - Used discriminated unions to make states explicit and type-safe
    - Each state carries its own relevant data
    - Impossible to access invalid state combinations
    - TypeScript can infer the correct types in each state


2. Simplified State Checks:

    - No more null/undefined checks needed
    - Pattern matching in switch statements is type-safe
    - Helper methods in useProjects for state checking


3. Better Type Safety:

    - The reducer can't accidentally return invalid states
    - Components get proper type inference
    - State transitions are more explicit and safer


4. Improved Developer Experience:

    - Better IDE support with type hints
    - Easier to understand state flow
    - Less prone to runtime errors
    - More maintainable code


5. Performance Benefits:

    - Cleaner memoization
    - More efficient state updates
    - Better state organization
 

</details>


---

[^1]: This course can be found in Udemy website.