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

export enum MarketLineStatus {
  Open = 0,
  Suspended = 1,
  Inactive = 2,
  Closed = 3,
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
  Baseball = 9,
}

export enum SoccerStatusCode {
  FirstHalf = 6,
  SecondHalf = 7,
  HalfTime = 31,
  BeforeExtraTimeKickOff = 32,
  ExtraTimeHalfTime = 33,
  BeforePenalty = 34,
  OverTimeFirstHalf = 41,
  OverTimeSecondHalf = 42,
  Penalty = 50,
  Interrupted = 80,
  Abandoned = 90,
}

export enum BasketballStatusCode {
  FirstHalf = 6,
  SecondHalf = 7,
  FirstQuarter = 13,
  SecondQuarter = 14,
  ThirdQuarter = 15,
  FourthQuarter = 16,
  HalfTime = 31,
  AwaitingExtraTime = 32,
  ExtraTime = 40,
  Interrupted = 80,
  Abandoned = 90,
  EndOfFirstQuarter = 301,
  EndOfSecondQuarter = 302,
  EndOfThirdQuarter = 303,
}

export enum TennisStatusCode {
  FirstSet = 8,
  SecondSet = 9,
  ThirdSet = 10,
  FourthSet = 11,
  FifthSet = 12,
  StartDelayed = 61,
  Interrupted = 80,
  Abandoned = 90,
}

export enum TableTennisStatusCode {
  FirstSet = 8,
  SecondSet = 9,
  ThirdSet = 10,
  FourthSet = 11,
  FifthSet = 12,
  Sixth = 441,
  Seventh = 442,
  StartDelayed = 61,
  Interrupted = 80,
  Abandoned = 90,
}

export enum VolleyballStatusCode {
  FirstSet = 8,
  SecondSet = 9,
  ThirdSet = 10,
  FourthSet = 11,
  FifthSet = 12,
  Sixth = 441,
  Seventh = 442,
  StartDelayed = 61,
  Interrupted = 80,
  Abandoned = 90,
}

export enum BoxingStatusCode {
  StartDelayed = 61,
  FirstBreak = 301,
  SecondBreak = 302,
  ThirdBreak = 303,
  FourthBreak = 304,
  FirstRound = 540,
  SecondRound = 541,
  ThirdRound = 542,
  FourthRound = 543,
  FifthRound = 544,
}

export enum BaseballStatusCode {
  FirstInningTop = 401,
  FirstInningBottom,
  SecondInningTop,
  SecondInningBottom,
  ThirdInningTop,
  ThirdInningBottom,
  FourthInningTop,
  FourthInningBottom,
  FifthInningTop,
  FifthInningBottom,
  SixthInningTop,
  SixthInningBottom,
  SeventhInningTop,
  SeventhInningBottom,
  EigththInningTop,
  EigththInningBottom,
  NinethInningTop,
  NinethInningBottom,
  ExtraInningTop,
  ExtraInningBottom,
  Break1Top,
  Break1Bottom,
  Break2Top,
  Break2Bottom,
  Break3Top,
  Break3Bottom,
  Break4Top,
  Break4Bottom,
  Break5Top,
  Break5Bottom,
  Break6Top,
  Break6Bottom,
  Break7Top,
  Break7Bottom,
  Break8Top,
  Break8Bottom,
  Break9Top,
  Break9Bottom,
  BreakExtra,
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
