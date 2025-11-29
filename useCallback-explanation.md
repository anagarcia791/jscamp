# Why `useCallback` Solves the Infinite Loop Issue

## The Problem

Before the change, `navigateTo` was declared as a regular function:
```jsx
function navigateTo(path) {
  navigate(path);
}
```

Every time `useRouter` runs (on every render), JavaScript creates a **new function object** with a **new memory reference**, even though the function body is identical. 

## The Chain Reaction

1. Component renders → `useRouter()` runs → creates **new** `navigateTo` function
2. `SearchPage` receives this new `navigateTo` reference
3. The `useEffect` with `navigateTo` in its dependency array sees a "different" function (different reference)
4. `useEffect` runs → calls `navigateTo(newUrl)` → updates browser URL
5. URL change triggers component re-render → back to step 1 ♻️ **INFINITE LOOP**

## The Solution - `useCallback`

```jsx
const navigateTo = useCallback((path) => {
  navigate(path);
}, [navigate]);
```

`useCallback` **memoizes** the function - it returns the **same function reference** across renders unless its dependencies (`[navigate]`) change. Since `navigate` from react-router is already stable, `navigateTo` now maintains the same reference forever.

## Result

- First render: `navigateTo` created
- Subsequent renders: Same `navigateTo` reference returned
- `useEffect` dependencies don't change → no unnecessary re-runs → no infinite loop ✅

## Key Concept

In React, when checking dependencies, it uses **referential equality** (`===`). Functions/objects are compared by reference, not by their content.
