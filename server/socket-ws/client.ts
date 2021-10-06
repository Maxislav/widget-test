import WebSocket from 'ws';
import Timer = NodeJS.Timer;
import { hash } from './hash';

export class MyClient {
    intervalId: Timer;
    constructor(public id: string, private wsClient: WebSocket) {
        const vehicleId =  hash(5);
        console.log('connected', id);
        wsClient.on('message', (data) => {
            console.log(JSON.parse(data.toString()))
        });
        this.intervalId = setInterval(() => {
            this.send(JSON.stringify({
                action: 'MESSAGE',
                data: {
                    name: 'vehicleMove',
                    data: {
                        vehicleId: vehicleId,
                        lngLat: [50, 30],
                    },
                },
            }));
        }, 10000)
    }

    async send(data: any) {
        return new Promise((resolve, reject) => {
            this.wsClient.send(data, (err) => {
                if(err){
                    resolve(false);
                } else {
                    resolve(true)
                }
            })
        })

    }
    close(){
        clearInterval(this.intervalId)
    }
}
