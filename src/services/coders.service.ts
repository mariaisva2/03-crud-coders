import { HttpClient } from "../utils/client-http";
import { Icoder } from "../models/coders/coder.model";
import { error } from "console";

export class CodersService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async findAll() {
    try {
      const coders = await this.httpClient.get<Icoder[]>("coders");
      return coders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async destroy(id: string) {
    try {
      const coders = this.httpClient.delete<Icoder>(`coders/${id}`);
      return coders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(coder: Icoder): Promise<Icoder> {
    try {
      const codernew = await this.httpClient.post<Icoder, Icoder>("coders",coder);
      return codernew;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(id:string, coder:Icoder){
    try{
      const coderupdate = this.httpClient.put<Icoder, Icoder>(`coders/${id}`,coder);
      return coderupdate;
    }catch (error){

      console.log(error);
      throw error;
    }
  }
}
