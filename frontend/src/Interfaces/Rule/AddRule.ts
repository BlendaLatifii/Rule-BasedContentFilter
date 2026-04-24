import type { ActionType } from "./ActionType";
import type { MatchTypes } from "./MatchTypes";
import type { RulePriority } from "./RulePriority";

export interface AddRuleDto{
    keyword: string;
    matchType: MatchTypes;
    action:ActionType;
    color:string | null;
    label: string | null;
    isEnable : boolean;
    priority:RulePriority;
}