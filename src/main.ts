import { Rectangle, Mouse, Ball } from './types'
import config from './gameConfig'

const canvas: HTMLCanvasElement = document.getElementById(
    'main-canvas'
) as HTMLCanvasElement
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const mouse = new Mouse()

const balls: Ball[] = []

const platform = new Rectangle(
    ctx,
    canvas.width / 2 - config.platform.width,
    canvas.height - config.platform.y,
    config.platform.width,
    config.platform.height,
    config.platform.color
)

const init = (): void => {
    balls.push(
        new Ball(
            ctx,
            canvas.width / 2,
            canvas.height / 2,
            0,
            config.ball.initialSpeedY,
            config.ball.radius,
            config.ball.color
        )
    )
}

init()

const animate = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    platform.update(mouse.x - config.platform.width / 2)

    for (let i = 0; i < balls.length; i++) {
        balls[i].update()
    }

    requestAnimationFrame(animate)
}

animate()
