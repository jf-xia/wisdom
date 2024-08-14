import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import lunisolar from 'lunisolar'
import char8ex from 'lunisolar/plugins/char8ex'
import fetalGod from 'lunisolar/plugins/fetalGod'
import { getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const year = params.get('year')
  const month = params.get('month')
  const day = params.get('day')
  const hour = params.get('hour')

  lunisolar.extend(char8ex)
  lunisolar.extend(fetalGod)

  const d = lunisolar(`${year}/${month}/${day} ${hour}:00`)
  const branch = d.char8.year.branch
  const c8ex = d.char8ex(1)

  const result = {
    今天: new Date().toDateString(),
    說明: '八字, 十神, 纳音, 神煞, 空亡地支 都是按 {年 月 日 時} 格式排列, 多個通過,分隔',
    性別: c8ex.sex,
    生日: {
      阳历: d.format('YYYY年MM月DD日 HH时'),
      阴历: d.lunar.toString(),
      胎元: c8ex.embryo().toString(),
      命宮: c8ex.ownSign().toString(),
      身宮: c8ex.bodySign().toString(),
      神胎占方: {
        天干: d.fetalGodData.stemPlace,
        地支: d.fetalGodData.branchPlace,
        方向: d.fetalGodData.direction,
        描述: d.fetalGodData.description,
      },
    },
    八字: `${c8ex.year.toString()} ${c8ex.month.toString()} ${c8ex.day.toString()} ${c8ex.hour.toString()}`,
    天干十神: `${c8ex.year.stemTenGod.name} ${c8ex.month.stemTenGod.name} ${c8ex.day.stemTenGod.name} ${c8ex.hour.stemTenGod.name}`,
    地支十神: `${c8ex.year.branchTenGod.map(i => i.name)} ${c8ex.month.branchTenGod.map(i => i.name)} ${c8ex.day.branchTenGod.map(i => i.name)} ${c8ex.hour.branchTenGod.map(i => i.name)}`,
    纳音: `${c8ex.year.takeSound} ${c8ex.month.takeSound} ${c8ex.day.takeSound} ${c8ex.hour.takeSound}`,
    神煞: `${c8ex.year.gods.map(item => item.name)} ${c8ex.month.gods.map(item => item.name)} ${c8ex.day.gods.map(item => item.name)} ${c8ex.hour.gods.map(item => item.name)}`,
    空亡地支: `${c8ex.year.missing.map(i => i.name)} ${c8ex.month.missing.map(i => i.name)} ${c8ex.day.missing.map(i => i.name)} ${c8ex.hour.missing.map(i => i.name)}`,
  }

  // console.log(result,branch.name.toString()+'\n------索引------',branch.value.toString()+'\n------五行------',branch.e5.toString()+'\n------地支藏干------',branch.hiddenStems.toString()+'\n-----三合地支-------',branch.triad.toString()+'\n------三合地支五行------',branch.triadE5.toString()+'\n------六合地支------',branch.group6.toString()+'\n------六合地支五行------',branch.group6E5.toString()+'\n-----相刑-------',branch.punishing.toString()+'\n------------',branch.punishBy.toString()+'\n------相冲------',branch.conflict.toString()+'\n------相破------',branch.destroying.toString()+'\n------相害------',branch.harming.toString()+'\n------------',lunisolar.Branch.getNames());

  try {
    const data = result// await client.getApplicationParameters(user)
    return NextResponse.json(data as object, {
      headers: setSession(sessionId),
    })
  }
  catch (error) {
    return NextResponse.json([])
  }
}
