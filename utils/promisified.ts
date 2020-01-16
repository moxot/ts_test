import https from 'https';
import http from 'http';

export const asyncHttpRequest = function(reqOpts: http.RequestOptions | https.RequestOptions): Promise<string> {
    let method = reqOpts.protocol === 'http:' ? http 
                : reqOpts.protocol === 'https:' ? https
                : null;
    
    return new Promise((resolve, reject) => {
        if(method){
            let req = method.request(reqOpts, (res: http.IncomingMessage) => {
                let data = '';
                
                res.on('data', (chunk)=>{
                    data += chunk;
                });
                res.on('end', ()=>{
                    resolve(data);
                });
                res.on('error', (err)=>{
                    reject(err);
                });
            });
            req.end();
        }else{
            reject(new Error('Protocol is not supportd'));
        }
    });
}