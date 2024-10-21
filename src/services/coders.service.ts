import { HttpClient } from "../utils/client-http";
import { Icoder } from "../models/coders/coder.model";

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
  async post(coder: Icoder): Promise<Icoder> {
    try {
      const response = await this.httpClient.post<Icoder, Icoder>("coders",coder);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
