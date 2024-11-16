enum ActionType {
    START_ADD_PROJECT = "START_ADD_PROJECT"
}

type Action = { type: ActionType.START_ADD_PROJECT };

export type { ActionType, Action };