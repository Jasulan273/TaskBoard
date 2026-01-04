import type { BoardState } from "./types"

export const initialBoardState: BoardState = {
  projects: [
    {
      id: "p-intake",
      name: "Intake",
      description: "Scope and prioritize incoming work.",
      accent: "#f97316",
      tasks: [
        {
          id: "t-brief",
          title: "Collect requirements",
          description: "Confirm stakeholders and delivery date.",
          tag: "brief",
          createdAt: "2025-01-05T09:00:00.000Z",
        },
        {
          id: "t-metrics",
          title: "Define success metrics",
          description: "Agree on quality, speed, and impact.",
          tag: "planning",
          createdAt: "2025-01-06T10:30:00.000Z",
        },
      ],
    },
    {
      id: "p-build",
      name: "Build",
      description: "Design and implementation in progress.",
      accent: "#0ea5e9",
      tasks: [
        {
          id: "t-layout",
          title: "Create layout system",
          description: "Grid, cards, and spacing rules.",
          tag: "ui",
          createdAt: "2025-01-07T08:15:00.000Z",
        },
        {
          id: "t-state",
          title: "Connect state logic",
          description: "Wire Zustand store and actions.",
          tag: "state",
          createdAt: "2025-01-07T11:45:00.000Z",
        },
        {
          id: "t-review",
          title: "UX review session",
          description: "Walk through flows with the team.",
          tag: "review",
          createdAt: "2025-01-08T14:00:00.000Z",
        },
      ],
    },
    {
      id: "p-launch",
      name: "Launch",
      description: "Polish, test, and release.",
      accent: "#22c55e",
      tasks: [
        {
          id: "t-qa",
          title: "QA checklist",
          description: "Confirm flows and regression tests.",
          tag: "qa",
          createdAt: "2025-01-09T09:45:00.000Z",
        },
      ],
    },
  ],
}
