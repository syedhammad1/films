const { Client } = require("@elastic/elasticsearch");
class ElasticSearch {
  private host: string;
  private port: number;
  private protocol: string;

  constructor() {
    this.host = process.env.HOST || "localhost";
    this.port = Number(process.env.EPORT) || 9200;
    this.protocol = "http";
  }

  getClient() {
    const client = new Client({
      node: `${this.protocol}://${this.host}:${this.port}`,
    });
    return client;
  }
}

const EClient = new ElasticSearch();

export default EClient;
