import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "primary-black";
  fullWidth?: boolean;
  element?: "button" | "span";
};

export function FigmaButton({ children, variant = "primary", fullWidth, element = "button" }: ButtonProps) {
  const className =
    variant === "secondary"
      ? "button-secondary"
      : variant === "primary-black"
        ? "button-primary-black"
        : "button-primary";
  const style = {
    width: fullWidth ? "100%" : "fit-content",
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "var(--font-family-base)",
  } as const;

  if (element === "span") {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <button type="button" className={className} style={style}>
      {children}
    </button>
  );
}

type PillProps = {
  children: ReactNode;
  active?: boolean;
};

export function FigmaPill({ children, active }: PillProps) {
  return (
    <span className="pill-nav" data-active={active ? "true" : "false"}>
      {children}
    </span>
  );
}
