import config from './gameConfig'

export class Rectangle {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    width: number
    height: number
    color: string

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        this.ctx.strokeStyle = this.color
        this.ctx.beginPath()
        this.ctx.rect(this.x, this.y, this.width, this.height)
        this.ctx.stroke()
    }

    update(x: number = this.x, y: number = this.y) {
        this.x = x
        this.y = y
        this.draw()
    }
}

export class Block extends Rectangle {
    life: number

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        life: number
    ) {
        super(ctx, x, y, width, height, config.blocks.blockColors[life - 1])
        this.life = life
    }

    update() {
        this.color = config.blocks.blockColors[this.life - 1]

        this.draw()
    }
}

export class Ball {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    vX: number
    vY: number
    radius: number
    color: string

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        vX: number,
        vY: number,
        radius: number,
        color: string
    ) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.vX = vX
        this.vY = vY
        this.radius = radius
        this.color = color
    }

    draw() {
        this.ctx.strokeStyle = this.color
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.stroke()
    }

    update() {
        this.x += this.vX
        this.y += this.vY
        this.draw()
    }
}

export class Mouse {
    x: number
    y: number
    canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.x = 0
        this.y = 0

        canvas.addEventListener('mousemove', (e) => {
            this.x = e.x
            this.y = e.y
        })
    }
}
