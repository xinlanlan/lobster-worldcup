export interface Team {
  id: string
  name: string
  nameZh: string
  flag: string
  group: string
  primaryColor: string
  secondaryColor: string
}

export const TEAMS: Team[] = [
  {
    id: 'BRA',
    name: 'Brazil',
    nameZh: '巴西',
    flag: '🇧🇷',
    group: 'A',
    primaryColor: '#009C3B',
    secondaryColor: '#FFDF00',
  },
  {
    id: 'ARG',
    name: 'Argentina',
    nameZh: '阿根廷',
    flag: '🇦🇷',
    group: 'B',
    primaryColor: '#74ACDF',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'FRA',
    name: 'France',
    nameZh: '法国',
    flag: '🇫🇷',
    group: 'C',
    primaryColor: '#002395',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'ENG',
    name: 'England',
    nameZh: '英格兰',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    group: 'D',
    primaryColor: '#CF081F',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'ESP',
    name: 'Spain',
    nameZh: '西班牙',
    flag: '🇪🇸',
    group: 'E',
    primaryColor: '#AA151B',
    secondaryColor: '#F1BF00',
  },
  {
    id: 'PRT',
    name: 'Portugal',
    nameZh: '葡萄牙',
    flag: '🇵🇹',
    group: 'F',
    primaryColor: '#006600',
    secondaryColor: '#FF0000',
  },
  {
    id: 'GER',
    name: 'Germany',
    nameZh: '德国',
    flag: '🇩🇪',
    group: 'G',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'NED',
    name: 'Netherlands',
    nameZh: '荷兰',
    flag: '🇳🇱',
    group: 'H',
    primaryColor: '#FF6600',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'JPN',
    name: 'Japan',
    nameZh: '日本',
    flag: '🇯🇵',
    group: 'A',
    primaryColor: '#BC002D',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'KOR',
    name: 'South Korea',
    nameZh: '韩国',
    flag: '🇰🇷',
    group: 'B',
    primaryColor: '#003478',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'MAR',
    name: 'Morocco',
    nameZh: '摩洛哥',
    flag: '🇲🇦',
    group: 'C',
    primaryColor: '#006233',
    secondaryColor: '#C1272D',
  },
  {
    id: 'USA',
    name: 'USA',
    nameZh: '美国',
    flag: '🇺🇸',
    group: 'D',
    primaryColor: '#002868',
    secondaryColor: '#BF0A30',
  },
  {
    id: 'MEX',
    name: 'Mexico',
    nameZh: '墨西哥',
    flag: '🇲🇽',
    group: 'E',
    primaryColor: '#006847',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'CRO',
    name: 'Croatia',
    nameZh: '克罗地亚',
    flag: '🇭🇷',
    group: 'F',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'ITA',
    name: 'Italy',
    nameZh: '意大利',
    flag: '🇮🇹',
    group: 'G',
    primaryColor: '#003399',
    secondaryColor: '#FFFFFF',
  },
  {
    id: 'SEN',
    name: 'Senegal',
    nameZh: '塞内加尔',
    flag: '🇸🇳',
    group: 'H',
    primaryColor: '#00853F',
    secondaryColor: '#FDEF42',
  },
]

export function getTeamById(id: string): Team | undefined {
  return TEAMS.find(t => t.id === id)
}

export function getTeamsByGroup(group: string): Team[] {
  return TEAMS.filter(t => t.group === group)
}
