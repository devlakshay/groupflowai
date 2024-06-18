import {QdrantClient, model} from '@qdrant/js-client-rest';
import { pipeline } from '@xenova/transformers';

// const client = new QdrantClient({
//     url: 'https://1bfd6e70-7b34-4d4f-9a49-48caf38af0a2.us-east4-0.gcp.cloud.qdrant.io',
//     apiKey: 'ikLKJDZ2Bpv7kD9E6MtyTxwqJ0ChSlyCtpBLMQYZ9r9FUwLcf5kCgQ',
// });

// const client = new QdrantClient({
//     url: 'https://71f17288-a57d-4c3c-91d8-18c2a98f913d.europe-west3-0.gcp.cloud.qdrant.io:6333',
//     apiKey: '4rbzTFpMszvULZNaUBMXo89FHDoqZdnxy2dNeypwF_YQPI7npgg1aA',
// });


const client = new QdrantClient({ host: "localhost", port: 6333 });

let pipe = await pipeline('sentiment-analysis');

// const data = {
//     projectDeatils: 
// }

try {
    // const result = await client.createCollection('FLOW GROUP AI');
    // console.log(result);

    const res = await client.getCollections();
    console.log(res)

} catch (err) {
    console.error(err);
}