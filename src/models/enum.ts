export enum NginxType {
  Forward = 'forward',
  Merchant = 'merchant',
  TcForward = 'tc-forward',
}

export enum WebSocketPayloadType {
  MatchStatusChange,
  MatchPeriodScoreChange,
  MatchClockChange,
  MarketLineChange,
}

export enum MatchStatus {
  New = 0,
  Open = 1,
  Pause = 2,
  Close = 3,
  Hide = 4,
  Ended = 5,
}

export enum ScoreType {
  Goals = 0,
  Corners = 1,
  RedCards = 2,
  YellowCards = 3,
  YellowRedCards = 4,
  Cards = 5,
  Point = 6,
  Set = 7,
  Game = 8,
  GamePoint = 9,
  Proposition = 10,
  VolleyballSet = 10501,
  VolleyballPoint = 10502,
}

export enum Sports {
  Soccer = 1,
  Basketball,
  Tennis,
  TableTennis,
  Volleyball,
  BoxingFighting,
}

export interface IMatchStatusChange {
  matchId: number;
  tick: string;
  matchStatus?: MatchStatus;
  isLive?: boolean;
  liveCoverage?: boolean;
  neutralGround?: boolean;
  matchDate?: Date;
  matchStatusCode?: number;
  currentServer?: number;
}

export interface IEnumToArray {
  id: number;
  name: string | number;
}

export interface ISelectOption {
  value: number;
  label: string;
}

export interface IMatchPeriodScoreChange {
  tick: string;
  matchId: number;
  scoreType: number;
  periodId: number;
  homeScore: number;
  awayScore: number;
  sportId: number;
}

function EnumStringToArray(o: any): IEnumToArray[] {
  return Object.entries(o)
    .filter((x) => typeof x[1] === 'string')
    .map((value) => ({
      id: value[1] as number,
      name: value[0],
    }));
}

export function EnumToSelectOptions(o: any): ISelectOption[] {
  return Object.entries(o)
    .filter((x) => typeof x[1] === 'number')
    .map((a) => ({ value: a[1] as number, label: a[0] }));
}

export const NginxTypeList: IEnumToArray[] = EnumStringToArray(NginxType);
