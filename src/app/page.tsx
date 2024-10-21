import { CodersService } from "@/services/coders.service";
import CodersTable from "./coders/CodersTable";

const useCoderService = new CodersService()

export default async function Home() {
  const data = await useCoderService.findAll()
  return <CodersTable data={data}/>
}
