/**
 * Interface representing url parametrs
 * of request to the endpoint
 */
export interface Query {
  text?: string;
  tags?: string;
  lat?: number;
  lon?: number;
  page?: number;
}
