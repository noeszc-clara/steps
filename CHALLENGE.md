# Steps Challenge

Implement a multi-step wizard component in React **without any UI libraries**.

---

## Project structure

| File | Purpose |
|------|---------|
| `src/steps/step.types.ts` | Type contracts — 🚫 **do not modify** |
| `src/steps/steps.tsx` | ✏️ Your implementation goes here |
| `src/steps/index.ts` | ✏️ Re-exports — wire up your compound component here |
| `src/app.tsx` | Usage example — modify freely for testing |

---

## Anatomy

![Steps anatomy](./src/assets/anatomy.svg)

---

## Types

All type contracts live in [`src/steps/step.types.ts`](./src/steps/step.types.ts) — read them carefully before starting.

---

## Usage API

Your implementation must support this usage out of the box:

```tsx
import { Steps } from "./steps";

const items = [
  { title: "First", description: "Contact info" },
  { title: "Second", description: "Date & time" },
  { title: "Third", description: "Select rooms" },
];

// Uncontrolled — component manages its own step state
function Uncontrolled() {
  return (
    <Steps.Root count={items.length} defaultStep={0} onStepComplete={() => console.log("done!")}>
      <Steps.List>
        {items.map((item, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Trigger>
              <Steps.Indicator>{index + 1}</Steps.Indicator>
              <span>{item.title}</span>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {items.map((item, index) => (
        <Steps.Content key={index} index={index}>
          {item.title} — {item.description}
        </Steps.Content>
      ))}

      <Steps.CompletedContent>
        All done — thanks for filling out the form!
      </Steps.CompletedContent>

      <div>
        <Steps.PrevTrigger>Back</Steps.PrevTrigger>
        <Steps.NextTrigger>Next</Steps.NextTrigger>
      </div>
    </Steps.Root>
  );
}

// Controlled — parent owns the step state
function Controlled() {
  const [step, setStep] = React.useState(0);

  return (
    <Steps.Root
      count={items.length}
      step={step}
      onStepChange={({ step }) => setStep(step)}
    >
      {/* same children as above */}
    </Steps.Root>
  );
}
```

---

## Requirements

### Core behaviour
- `NextTrigger` and `PrevTrigger` must not navigate out of bounds
- `CompletedContent` only renders when all steps are done
- `onStepComplete` fires **once** when the last step is passed
- All subcomponents accept and apply a `className` prop

### 🎛️ Controlled vs Uncontrolled

`Root` must work in both modes — exactly like a native `<input value>` vs `<input defaultValue>`:

| Mode | Props | Behaviour |
|------|-------|-----------|
| **Uncontrolled** | `defaultStep` | Component manages step state internally. `defaultStep` sets the initial value only. |
| **Controlled** | `step` + `onStepChange` | Component holds **no** step state. It always renders `step` as-is and calls `onStepChange` when the user navigates. The parent is responsible for updating `step`. |

- `onStepInvalid` must fire whenever forward navigation is blocked by `isStepValid`, whether triggered by `NextTrigger` or a direct step jump via `Trigger`
- ⚠️ Do **not** accept both `step` and `defaultStep` simultaneously

---

## Bonus (optional — not required to pass)

- Elements expose `data-complete`, `data-current`, or `data-incomplete` based on their state
- Add a `Steps.Consumer` that exposes the full internal context via render prop
