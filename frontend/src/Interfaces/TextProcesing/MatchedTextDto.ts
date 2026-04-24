import type { ActionType } from "../Rule/ActionType";

export interface MatchedTextDto{
    color:string | null;
    label: string | null;
    wordIndex:Number;
    action: ActionType
}