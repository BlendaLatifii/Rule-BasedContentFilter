import type { ActionType } from "./ActionType";
import type { MatchTypes } from "./MatchTypes";

export interface AddRuleDto{
    keyword: string;
    matchType: MatchTypes;
    action:ActionType;
    color:string;
}