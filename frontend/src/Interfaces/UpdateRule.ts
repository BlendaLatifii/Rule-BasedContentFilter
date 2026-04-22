import type { ActionType } from "./ActionType";
import type { MatchTypes } from "./MatchTypes";

export interface UpdateRuleDto{
    keyword: string | null;
    matchType: MatchTypes | null;
    action:ActionType | null;
    color:string | null;
}