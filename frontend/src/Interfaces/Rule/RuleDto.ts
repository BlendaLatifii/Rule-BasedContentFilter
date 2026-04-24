import type { ActionType } from "./ActionType";
import type { MatchTypes } from "./MatchTypes";
import type { RulePriority } from "./RulePriority";

export interface RuleDto{
    id: string;
    keyword: string;
    matchType: MatchTypes;
    action:ActionType;
    color:string | null;
    label:string | null;
    isEnable: boolean;
    priority:RulePriority;
}