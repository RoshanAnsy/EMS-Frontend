
import { getCookie} from 'cookies-next/server';
import { cookies } from 'next/headers';

import { GetAttendanceType } from "@/api/attendance"
import MarkAttendance from "@/components/attendances/MarkAttendance"

export default async function page() {
  
  const token = await getCookie('login-token', { cookies });
  const TypeResult= await GetAttendanceType(token as string);
  const type=TypeResult?.result ==null ? "PUNCHOUT":TypeResult?.result.Type
  const ID=TypeResult?.result ==null ? "":TypeResult?.result.id
  const punchInAt=TypeResult?.result ==null ? "":TypeResult?.result.PunchInAt
  const punchOutAt=TypeResult?.result ==null ? "":TypeResult?.result.PunchOutAt


  return (
    <main className="m-4">
      <MarkAttendance Type={type} ID={ID} punchInAt={punchInAt} punchOutAt={punchOutAt} />
    </main>
  )
}
