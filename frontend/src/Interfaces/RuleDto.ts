import type { ActionType } from "./ActionType";
import type { MatchTypes } from "./MatchTypes";

export interface RuleDto{
    id: string;
    keyword: string;
    matchType: MatchTypes;
    action:ActionType;
    color:string;
}