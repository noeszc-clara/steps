import type React from "react";

export interface StepChangeDetails {
  /** The step index that is now active */
  step: number;
}

export interface StepInvalidDetails {
  /** The step that failed validation */
  step: number;
  /** What triggered the validation */
  action: "next" | "set";
  /** The step the user tried to reach */
  targetStep?: number;
}

export interface StepRootProps {
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

export interface StepListProps {
  /** Additional CSS class for the list element */
  className?: string;
  children: React.ReactNode;
}

export interface StepItemProps {
  /** The index of the step */
  index: number;
  /** Additional CSS class for the item element */
  className?: string;
  children: React.ReactNode;
}

export interface StepTriggerProps {
  /** Additional CSS class for the trigger element */
  className?: string;
  children: React.ReactNode;
}

export interface StepIndicatorProps {
  /** Additional CSS class for the indicator element */
  className?: string;
  children: React.ReactNode;
}

export interface StepSeparatorProps {
  /** Additional CSS class for the separator element */
  className?: string;
}

export interface StepContentProps {
  /** The index of the step content panel */
  index: number;
  /** Additional CSS class for the content element */
  className?: string;
  children: React.ReactNode;
}

export interface StepCompletedContentProps {
  /** Additional CSS class for the completed content element */
  className?: string;
  children: React.ReactNode;
}

export interface StepNavigationTriggerProps {
  /** Additional CSS class for the navigation button */
  className?: string;
  children: React.ReactNode;
}
