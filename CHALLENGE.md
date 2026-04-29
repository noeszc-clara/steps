# 🪜 Steps Challenge

Implement a multi-step wizard component in React **without any UI libraries**.

---

## 🗂️ Project structure

| File | Purpose |
|------|---------|
| `src/steps/types.ts` | Type contracts — **do not modify** |
| `src/steps/index.tsx` | ✏️ Your implementation goes here |
| `src/app.tsx` | Usage example — modify freely for testing |

---

## 🔬 Anatomy

![Steps anatomy](./src/assets/anatomy.svg)

---

## 📐 Types

These are the contracts your implementation must satisfy. **Do not modify `src/steps/types.ts`.**

```ts
interface StepChangeDetails {
  /** The step index that is now active */
  step: number;
}

interface StepInvalidDetails {
  /** The step that failed validation */
  step: number;
  /** What triggered the validation */
  action: "next" | "set";
  /** The step the user tried to reach */
  targetStep?: number;
}

interface StepRootProps {
  /** Total number of steps */
  count: number;
  /**
   * Initial active step — uncontrolled mode.
   * Do not combine with `step`.
   * @default 0
   */
  defaultStep?: number;
  /**
   * Active step index — controlled mode.
   * When provided, the component does not manage its own step state;
   * it renders whatever value you pass and fires `onStepChange` on navigation.
   * Do not combine with `defaultStep`.
   */
  step?: number;
  /** Called when the active step changes */
  onStepChange?: (details: StepChangeDetails) => void;
  /**
   * Called when navigation is blocked by `isStepValid`.
   * Fires on both Next button clicks and direct step jumps.
   */
  onStepInvalid?: (details: StepInvalidDetails) => void;
  /** Called once when every step has been completed */
  onStepComplete?: () => void;
  /**
   * Return `false` to block forward navigation from a given step.
   *
   * @example
   * isStepValid={(index) => index !== 1 || formRef.current?.checkValidity()}
   */
  isStepValid?: (index: number) => boolean;
  /** Additional CSS class for the root element */
  className?: string;
  children: React.ReactNode;
}

interface StepListProps {
  className?: string;
  children: React.ReactNode;
}

interface StepItemProps {
  /** The index of the step */
  index: number;
  className?: string;
  children: React.ReactNode;
}

interface StepTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface StepIndicatorProps {
  className?: string;
  children: React.ReactNode;
}

interface StepSeparatorProps {
  className?: string;
}

interface StepContentProps {
  /** The index of the step content panel */
  index: number;
  className?: string;
  children: React.ReactNode;
}

interface StepCompletedContentProps {
  className?: string;
  children: React.ReactNode;
}

interface StepNavigationTriggerProps {
  className?: string;
  children: React.ReactNode;
}
```

---

## 🧩 Usage API

Your implementation must support this usage out of the box:

```tsx
import { Steps } from "./steps";

const items = [
  { title: "First", description: "Contact info" },
  { title: "Second", description: "Date & time" },
  { title: "Third", description: "Select rooms" },
];

// Uncontrolled — component manages its own step state
function UncontrolledExample() {
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
function ControlledExample() {
  const [step, setStep] = React.useState(0);

  return (
    <Steps.Root
      count={items.length}
      step={step}
      onStepChange={({ step }) => setStep(step)}
      onStepInvalid={({ step, action }) => console.warn("blocked", step, action)}
      isStepValid={(index) => index !== 1 || someCondition}
    >
      {/* same children as above */}
    </Steps.Root>
  );
}
```

---

## ✅ Requirements

### Core behaviour
- `NextTrigger` and `PrevTrigger` must not navigate out of bounds
- `NextTrigger` is **disabled** when `isStepValid` returns `false` for the current step
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
- Do **not** accept both `step` and `defaultStep` simultaneously

---

## 🎁 Bonus (optional — not required to pass)

- Elements expose `data-complete`, `data-current`, or `data-incomplete` based on their state
- Add a `Steps.Consumer` that exposes the full internal context via render prop
