import express, { Request, Response, NextFunction } from 'express';
import { getDataURI } from './image';

const app = express();

app.get('/nft/:nft/:chainId/:tokenId', async (req: Request, res: Response, next: NextFunction) => {
    const resp = await getDataURI(req.params.nft, req.params.chainId, req.params.tokenId)
    res.send(resp)
});

app.listen('80', () => {
    console.log(`
  ################################################
  👩‍🎨  Picasso listening on port: port 80 👨‍🎨
  ################################################
`);
});