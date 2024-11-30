import { ProjectFields } from "../../types/project";
import { EntriesActionType } from "./localAction";

export function entriesReducer(
    state: ProjectFields,
    action: {
        type: EntriesActionType;
        field: keyof ProjectFields;
        payload: string;
    }
): ProjectFields {
    switch (action.type) {
        case EntriesActionType.UPDATE_ENTRIES:
            return {
                ...state,
                [action.field]: action.payload
            };

        default:
            return state;
    }
}
