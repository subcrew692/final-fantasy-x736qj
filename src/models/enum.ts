export enum NginxType {
  Forward = 'forward',
  Merchant = 'merchant',
  TcForward = 'tc-forward',
}

export interface IEnumToArray {
  id: number;
  name: string | number;
}

function EnumStringToArray(o: any): IEnumToArray[] {
  return Object.entries(o)
    .filter((x) => typeof x[1] === 'string')
    .map((value) => ({
      id: value[1] as number,
      name: value[0],
    }));
}

export const NginxTypeList: IEnumToArray[] = EnumStringToArray(NginxType);
