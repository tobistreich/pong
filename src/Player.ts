export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    color: string;
    
    private canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
    private ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    public createPlayer(x: number) {
        return {
            x,
            y: this.canvas.height / 2 - 60,
            width: 20,
            height: 120,
            color: '#FFF',
            speed: 5,
        };
    }

}
